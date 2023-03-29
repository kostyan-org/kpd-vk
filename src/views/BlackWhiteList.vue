<template>
  <NavigatorHeader />
  <SubMenu>
    <a v-if="!isEmpty" @click.stop.prevent="reset()" href="">
      <font-awesome-icon icon="fa-solid fa-trash" />Очистить
    </a>
    <router-link :to="{ name: 'blackwhiteadd'}">
      <font-awesome-icon icon="fa-solid fa-hand" />Добавить
    </router-link>
    <a @click.stop.prevent="this.$router.back()" href="">
      <font-awesome-icon icon="fa-solid fa-rotate-left" />Назад
    </a>
  </SubMenu>
  <h1>ЧБ списки</h1>
  <h2>Белый список</h2>
  <BlackWhiteComponent list="white" :users="getWhiteList" />
  <h2>Черный список</h2>
  <BlackWhiteComponent list="black" :users="getBlackList" />
</template>
<script>
import NavigatorHeader from '@/components/NavigatorHeader.vue'
import * as Settings from '@/js/Settings'
import SubMenu from '@/components/SubMenu.vue'
import BlackWhiteComponent from '@/components/BlackWhiteComponent.vue'

export default {
  name: 'BlackWhiteList',
  components: { NavigatorHeader, SubMenu, BlackWhiteComponent },
  computed: {
    getWhiteList () {
      return JSON.parse(this.$store.getters.getSettings.white)
    },
    getBlackList () {
      return JSON.parse(this.$store.getters.getSettings.black)
    },
    isEmpty () {
      return Settings.countBlack() === 0 && Settings.countWhite() === 0
    }
  },
  methods: {
    async reset () {
      if (!window.confirm('Вы уверенны?')) return
      await Settings.resetWhite()
      Settings.resetBlack()
    }
  }
}
</script>
