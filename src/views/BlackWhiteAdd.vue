<template>
    <NavigatorHeader />
    <SubMenu>
      <a v-if="link && list" @click.stop.prevent="add()" href="" class="info">
        <font-awesome-icon icon="fa-solid fa-user-plus" />Добавить
      </a>
      <a @click.stop.prevent="this.$router.back()" href="">
        <font-awesome-icon icon="fa-solid fa-rotate-left" />Назад
      </a>
    </SubMenu>
    <h1>Добавление в ЧБ списки</h1>
    <div class="preview">
      <div class="row" v-if="link">
        <div class="text">Вы указали URL:</div>
        <div class="link">{{link}}</div>
      </div>
      <div class="row">
        <div class="text" v-if="list">Вы выбрали список:</div>
        <div class="list">
          <span v-if="list === 'white'"><font-awesome-icon icon="fa-solid fa-heart" /></span>
          <span v-if="list === 'black'"><font-awesome-icon icon="fa-solid fa-ban" /></span>
        </div>
      </div>
    </div>
    <div class="form">
      <label for="link">URL пользователя:</label>
      <input v-model="link" type="text" id="link" name="link" placeholder="https://vk.com/test" required autocomplete="off"/>
      <div class="radio">
        <input v-model="list" :disabled="isBlackFull" type="radio" id="black" name="list" value="black">
        <label for="black"><font-awesome-icon icon="fa-solid fa-ban" />Черный (Доступно мест: {{availableBlack}})</label>
      </div>
      <div class="radio">
        <input v-model="list" :disabled="isWhiteFull" type="radio" id="white" name="list" value="white">
        <label for="white"><font-awesome-icon icon="fa-solid fa-heart" />Белый (Доступно мест: {{availableWhite}})</label>
      </div>
    </div>
  </template>
<script>
import NavigatorHeader from '@/components/NavigatorHeader.vue'
import * as Settings from '@/js/Settings'
import SubMenu from '@/components/SubMenu.vue'

export default {
  name: 'BlackWhiteAdd',
  components: { NavigatorHeader, SubMenu },
  data () {
    return {
      link: '',
      list: ''
    }
  },
  computed: {
    getWhiteList () {
      return JSON.parse(this.$store.getters.getSettings.white)
    },
    getBlackList () {
      return JSON.parse(this.$store.getters.getSettings.black)
    },
    isEmpty () {
      return Settings.countBlack() === 0 && Settings.countWhite() === 0
    },
    isWhiteFull () {
      return JSON.parse(this.$store.getters.getSettings.white).length >= this.$store.getters.getSettings.limitBlackWhite
    },
    isBlackFull () {
      return JSON.parse(this.$store.getters.getSettings.black).length >= this.$store.getters.getSettings.limitBlackWhite
    },
    availableWhite () {
      const difference = this.$store.getters.getSettings.limitBlackWhite - JSON.parse(this.$store.getters.getSettings.white).length
      return difference > 0 ? difference : 0
    },
    availableBlack () {
      const difference = this.$store.getters.getSettings.limitBlackWhite - JSON.parse(this.$store.getters.getSettings.black).length
      return difference > 0 ? difference : 0
    }
  },
  methods: {
    add () {
      if (this.list === 'white') {
        if (this.isWhiteFull) {
          return
        }
        Settings.addWhite(this.link)
      }

      if (this.list === 'black') {
        if (this.isBlackFull) {
          return
        }
        Settings.addBlack(this.link)
      }
      this.$router.back()
    },
    inBlack (link) {
      Settings.addBlack(link)
    },
    inWhite (link) {
      Settings.addWhite(link)
    }
  },
  created () {
  }
}
</script>
<style scoped>
.preview {
  display: flex;
  flex-direction: column;
  margin-top: 0.3rem;
  margin-bottom: 1rem;
}
.row {
  display: flex;
  flex-direction: row;
  margin-bottom: .3rem;
  margin-top: .3rem;
}
.text, .link, .list {
  display: flex;
  flex-grow: 1;
}
.text {
  justify-content: start;
}
.link, .list {
  font-family: 'Roboto-Bold',sans-serif;
  justify-content: end;
}
.form {
  display: flex;
  flex-direction: column;
}
.form input[type=text] {
  margin-bottom: 1rem;
  background: #111;
  border: 1px solid #444;
  border-radius: 5px;
  padding: 0.2rem;
  color: inherit;
}
.form input[type=text]:focus {
  outline: 0;
  border: 1px solid #9f9c00;
}
.radio {
  display: flex;
  flex-direction: row;
}
.radio input[type=radio] {
  background: #111;
  border: 1px solid #444;
  border-radius: 5px;
  padding: 0.2rem;
  color: inherit;
  margin-bottom: 1rem;
  margin-top: 0;
  margin-right: 0.5rem;
  margin-left: 0;
}
</style>
