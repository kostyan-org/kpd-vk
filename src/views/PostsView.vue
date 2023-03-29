<template>
  <NavigatorHeader />
  <SubMenu>
    <a @click.stop.prevent="this.$router.back()" href="">
      <font-awesome-icon icon="fa-solid fa-rotate-left" />Назад
    </a>
  </SubMenu>
  <h1>Список всех постов</h1>
  <FirstLastDate />
  <PostsViewComponent :posts="$store.getters.getPosts" />
</template>
<script>
import FirstLastDate from '@/components/FirstLastDate.vue'
import NavigatorHeader from '@/components/NavigatorHeader.vue'
import SubMenu from '@/components/SubMenu.vue'
import PostsViewComponent from '@/components/PostsViewComponent.vue'

export default {
  name: 'PostsView',
  components: { FirstLastDate, NavigatorHeader, SubMenu, PostsViewComponent }
}
</script>
