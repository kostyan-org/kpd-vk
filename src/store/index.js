import { createStore } from 'vuex'

export default createStore({
  state: {
    posts: new Map(),
    tab: 0,
    tabActive: 0,
    settings: {}
  },
  getters: {
    postsByUser (state) {
      const out = new Map()
      state.posts.get(state.tabActive)?.forEach(
        function (element) {
          let arr = []
          if (out.has(element.author.link)) {
            arr = out.get(element.author.link).data
          }
          const count = arr.length + 1
          const obj = {}
          obj.data = arr
          obj.count = count
          obj.author = element.author
          obj.data.push(element)
          out.set(element.author.link, obj)
        })
      return out
    },
    postsUser (state) {
      // const self = this
      return function (link) {
        const out = []
        state.posts.get(state.tabActive).forEach(
          function (element) {
            if (element.author.link === link) {
              out.push(element)
            }
          })
        return out
      }
    },
    getPosts (state) {
      return state.posts.get(state.tabActive)
    },
    firstPost (state) {
      return state.posts.get(state.tabActive)[0]
    },
    lastPost (state) {
      return state.posts.get(state.tabActive)[state.posts.get(state.tabActive).length - 1]
    },
    countPosts (state) {
      const posts = state.posts.get(state.tabActive)
      if (posts === undefined) return 0
      return posts.length
    },
    tabId (state) {
      return state.tab
    },
    tabActiveId (state) {
      return state.tabActive
    },
    getSettings (state) {
      return state.settings
    },
    getUserFromPosts (state, getters) {
      return function (link) {
        if (getters.postsUser(link).length) {
          return getters.postsUser(link)[0].author
        }
        return null
      }
    }
  },
  mutations: {
    savePosts (state, data) {
      state.posts.set(state.tab, data)
    },
    saveTab (state, data) {
      state.tab = data
    },
    saveTabActive (state, data) {
      state.tabActive = data
    },
    removePosts (state, data) {
      state.posts.delete(data)
    },
    saveSettings (state, data) {
      state.settings = data
    }
  },
  actions: {},
  modules: {}
})
