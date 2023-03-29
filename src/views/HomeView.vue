<template>
  <div v-if="isTrueTab">
    <NavigatorHeader />
    <SubMenu>
      <router-link :to="{ name: 'posts'}" :class="{danger:$store.getters.countPosts === 0}">
        <font-awesome-icon icon="fa-solid fa-list-ol"/> Список всех постов ({{$store.getters.countPosts}})
      </router-link>
      <a href="#" @click="scrollDown">
        <font-awesome-icon icon="fa-solid fa-angles-down" /> Прокрутить вниз
      </a>
    </SubMenu>
    <h1>Главная страница</h1>
    <FirstLastDate />
    <h2>Юзеры с повторами:</h2>
    <UsersViewComponent :users="postsByUser" />
    <h2>Посты из БС:</h2>
    <PostsViewComponent :posts="postsWhite" />
  </div>
  <div v-else>
    <p>Работает только в сообществах на сайте <a href="https://vk.com" target="_blank">https://vk.com</a></p>
  </div>
</template>

<script>
import NavigatorHeader from '@/components/NavigatorHeader.vue'
import FirstLastDate from '@/components/FirstLastDate.vue'
import * as Settings from '@/js/Settings'
import * as Background from '@/js/Background'
import SubMenu from '@/components/SubMenu.vue'
import PostsViewComponent from '@/components/PostsViewComponent.vue'
import UsersViewComponent from '@/components/UsersViewComponent.vue'

let interval = null

export default {
  components: { FirstLastDate, NavigatorHeader, SubMenu, PostsViewComponent, UsersViewComponent },
  name: 'HomeView',
  data () {
    return {
      isTrueTab: false,
      empty: true,
      settings: {
        repeatCounter: 1,
        dataUpdate: 5,
        limitBlackWhite: 3,
        hideMenu: false,
        hideInfoBlock: false,
        hideWidgets: false,
        hideFixed: false,
        backgroundWork: true,
        gomez: false,
        white: JSON.stringify([]),
        black: JSON.stringify([])
      }
    }
  },
  computed: {
    postsByUser () {
      const out = []
      if (this.$store.getters.postsByUser.size === 0) return out

      for (const post of this.$store.getters.postsByUser.values()) {
        if (this.isRepeat(post)) {
          out.push(post)
        }
      }
      return out
    },
    postsWhite () {
      const out = []
      if (this.$store.getters.countPosts === 0) return out

      for (const post of this.$store.getters.getPosts) {
        if (Settings.hasInWhite(post.author.link)) {
          out.push(post)
        }
      }
      return out
    }
  },
  methods: {
    isRepeat (postsUser) {
      return postsUser.count >= this.$store.getters.getSettings.repeatCounter
    },
    scrollDown () {
      this.sendQuery(this.scrollDownQuery)
      this.sendQuery(this.postsQuery)
    },
    sendQuery (queryFunc) {
      const self = this
      chrome.tabs.query({
        active: true,
        currentWindow: true
      },
      function (tabs) {
        if (tabs.length < 1) return
        if (!('url' in tabs[0])) return
        self.isTrueTab = true
        self.$store.commit('saveTabActive', tabs[0].id)

        queryFunc(tabs[0])
      })
    },
    scrollDownQuery (tab) {
      chrome.tabs.sendMessage(
        tab.id,
        { msg: 'scrollDown' },
        null,
        function () {
          if (!chrome.runtime.lastError) {
            // console.log(response)
          }
        })
    },
    postsQuery (tab) {
      const self = this
      chrome.tabs.sendMessage(
        tab.id,
        {
          msg: 'posts',
          hideMenu: self.$store.getters.getSettings.hideMenu,
          hideInfoBlock: self.$store.getters.getSettings.hideInfoBlock,
          hideWidgets: self.$store.getters.getSettings.hideWidgets,
          hideFixed: self.$store.getters.getSettings.hideFixed,
          gomez: self.$store.getters.getSettings.gomez,
          black: self.$store.getters.getSettings.black,
          white: self.$store.getters.getSettings.white
        },
        null,
        function (response) {
          if (!chrome.runtime.lastError) {
            if (response.err) return
            self.$store.commit('saveTab', tab.id)
            self.$store.commit('savePosts', response.data)
          }
        })
    },
    async dataUpdate () {
      clearInterval(interval)
      interval = setInterval(() => {
        this.sendQuery(this.postsQuery)
      }, this.$store.getters.getSettings.dataUpdate * 1000)
    }
  },
  async mounted () {
    await Settings.sync(this.settings)
    await Background.stop()
    chrome.runtime.connect({ name: 'popup' })
    this.sendQuery(this.postsQuery)
    await this.dataUpdate()
  }
}
</script>
