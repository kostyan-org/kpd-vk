import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/showposts/author-:author',
    name: 'showposts',
    component: () => import(/* webpackChunkName: "showposts" */ '../views/ShowPostsUserView.vue')
  },
  {
    path: '/posts',
    name: 'posts',
    component: () => import(/* webpackChunkName: "showposts" */ '../views/PostsView.vue')
  },
  {
    path: '/settings',
    name: 'settings',
    component: () => import(/* webpackChunkName: "settings" */ '../views/SettingsView.vue')
  },
  {
    path: '/blackwhite',
    name: 'blackwhite',
    component: () => import(/* webpackChunkName: "blackwhite" */ '../views/BlackWhite.vue'),
    children: [
      {
        path: 'list',
        name: 'blackwhitelist',
        component: () => import(/* webpackChunkName: "blackwhite" */ '../views/BlackWhiteList.vue')
      },
      {
        path: 'add',
        name: 'blackwhiteadd',
        component: () => import(/* webpackChunkName: "blackwhite" */ '../views/BlackWhiteAdd.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
