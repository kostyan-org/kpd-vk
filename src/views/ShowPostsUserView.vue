<template>
  <NavigatorHeader />
  <SubMenu>
    <a v-if="hasWhite($route.params.author) || (!hasBlack($route.params.author) && !hasWhite($route.params.author))"
      href="#" @click.stop.prevent="inBlack($route.params.author)" class="danger">
      <font-awesome-icon icon="fa-solid fa-ban" />В ЧС
    </a>
    <a v-if="hasBlack($route.params.author) || (!hasBlack($route.params.author) && !hasWhite($route.params.author))"
      href="#" @click.stop.prevent="inWhite($route.params.author)" class="info">
      <font-awesome-icon icon="fa-solid fa-heart" />В БС
    </a>
    <a v-if="hasBlack($route.params.author) || hasWhite($route.params.author)" href="#"
      @click.stop.prevent="removeBlackWhite($route.params.author)">
      <font-awesome-icon icon="fa-solid fa-trash-arrow-up" />Из ЧС и БС
    </a>
    <a @click.stop.prevent="this.$router.back()" href="">
      <font-awesome-icon icon="fa-solid fa-rotate-left" />Назад
    </a>
  </SubMenu>
  <h1>Посты пользователя</h1>
  <div class="author">
    <img :src="$store.getters.getUserFromPosts($route.params.author).ava"
      :alt="$store.getters.getUserFromPosts($route.params.author).name">
    <a :href="$store.getters.getUserFromPosts($route.params.author).link" target="_blank">
      {{$store.getters.getUserFromPosts($route.params.author).name}}
    </a>
  </div>
  <FirstLastDate />
  <PostsViewCompactComponent :posts="postsUser($route.params.author)" />
</template>
<script>
import FirstLastDate from '@/components/FirstLastDate.vue'
import NavigatorHeader from '@/components/NavigatorHeader.vue'
import * as Settings from '@/js/Settings'
import SubMenu from '@/components/SubMenu.vue'
import PostsViewCompactComponent from '@/components/PostsViewCompactComponent.vue'

export default {
  name: 'ShowPostsUserView',
  components: { FirstLastDate, NavigatorHeader, SubMenu, PostsViewCompactComponent },
  computed: {
    postsUser () {
      const self = this
      return function (link) {
        return self.$store.getters.postsUser(link)
      }
    },
    hasBlack () {
      return id => {
        return Settings.hasInBlack(id)
      }
    },
    hasWhite () {
      return id => {
        return Settings.hasInWhite(id)
      }
    }
  },
  methods: {
    inBlack (id) {
      Settings.addBlack(id)
    },
    inWhite (id) {
      Settings.addWhite(id)
    },
    async removeBlackWhite (id) {
      await Settings.removeBlack(id)
      Settings.removeWhite(id)
    }
  }
}
</script>
<style scoped>
.author {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 0;
  margin-bottom: .5rem;
}
.author img {
  display: flex;
  border-radius: 10%;
  padding: 0.2rem;
  width: 60px;
  height: 60px;
  background: #444;
}
.author a {
  display: flex;
  justify-content: center;
  flex-grow: 1;
  padding: .3rem .1rem;
  margin-left: .1rem;
  margin-right: .1rem;
  margin-top: 0;
  margin-bottom: .1rem;
  font-family: 'Roboto-Bold',sans-serif;
  font-size: 1rem;
}
</style>
