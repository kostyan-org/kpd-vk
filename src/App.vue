<template>
  <router-view />
</template>
<script>
export default {
  computed: {
    firstPost () {
      return this.$store.getters.firstPost
    },
    lastPost () {
      return this.$store.getters.lastPost
    }
  },
  methods: {
    setterPosts (request, sender) {
      if (request.msg === 'posts') {
        this.$store.commit('saveTab', sender.tab.id)
        this.$store.commit('savePosts', request.data)
      }
    },
    removerPosts (tabId) {
      this.$store.commit('removePosts', tabId)
    }
  },
  mounted () {
    chrome.runtime.onMessage.addListener(this.setterPosts)
    chrome.tabs.onRemoved.addListener(this.removerPosts)
  }
}
</script>
<style>
@font-face {
  font-family: 'Roboto';
  src: url('@/assets/Roboto/Roboto-Regular.ttf');
}
@font-face {
  font-family: 'Roboto-Bold';
  src: url('@/assets/Roboto/Roboto-Bold.ttf');
}
body {
  min-width: 300px;
  font-family: 'Roboto',sans-serif;
  font-size: 12px;
  color: #ff4500 ;
  background: #111111;
  padding: 0.5rem 1rem;
  margin:auto;
}
svg {
  margin-right: .2rem;
  margin-left: .2rem;
}
a {
     color: #9f9c00;
     text-decoration: none;
}
a:hover {
     color: #d4d000;
     text-decoration: none;
}
a:active {
     color: #d6d57e;
     text-decoration: none;
}
h1, h2, h3 {
  font-family: 'Roboto-Bold',sans-serif;
  margin: .1rem 0;
}
*::-webkit-scrollbar {
  width: 5px;
}
*::-webkit-scrollbar-track {
  border-radius: 5px;
  background-color: #222222;
}

*::-webkit-scrollbar-track:hover {
  background-color: #444444;
}

*::-webkit-scrollbar-track:active {
  background-color: #222222;
}

*::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background-color: #444444;
}

*::-webkit-scrollbar-thumb:hover {
  background-color: #ff4500;
}

*::-webkit-scrollbar-thumb:active {
  background-color: #ff4500;
}
</style>
