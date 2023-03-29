<template>
  <NavigatorHeader />
  <SubMenu>
    <a href="#" @click.stop.prevent="reset">
      <font-awesome-icon icon="fa-solid fa-trash-arrow-up" />Сбросить настройки
    </a>
    <a @click.stop.prevent="this.$router.back()" href="">
      <font-awesome-icon icon="fa-solid fa-rotate-left" />Назад
    </a>
  </SubMenu>
  <h1>Настройки</h1>
  <div class="settings">
    <div class="range">
      <div class="row">
        <label for="repeatCounter">Количество постов на автора {{repeatCounter}} шт.</label>
        <input v-model="repeatCounter" type="range" min="1" max="10" step="1" id="repeatCounter">
      </div>
      <div class="row">
        <label for="repeatCounter">Обновление данных через каждые {{dataUpdate}} сек.</label>
        <input v-model="dataUpdate" type="range" min="1" max="10" step="1" id="dataUpdate">
      </div>
      <div class="row">
        <label for="limitBlackWhite">Лимит ЧБ списков {{limitBlackWhite}} шт.</label>
        <input v-model="limitBlackWhite" type="range" min="1" max="10" step="1" id="limitBlackWhite">
      </div>
    </div>
    <div class="checkbox">
      <div class="row">
        <label for="hideMenu">Скрыть меню сообщества</label>
        <input v-model="hideMenu" type="checkbox" id="hideMenu">
      </div>
      <div class="row">
        <label for="hideInfoBlock">Скрыть инфоблок сообщества</label>
        <input v-model="hideInfoBlock" type="checkbox" id="hideInfoBlock">
      </div>
      <div class="row">
        <label for="hideWidgets">Скрыть виджеты сообщества</label>
        <input v-model="hideWidgets" type="checkbox" id="hideWidgets">
      </div>
      <div class="row">
        <label for="hideFixed">Скрыть закреплённую запись</label>
        <input v-model="hideFixed" type="checkbox" id="hideFixed">
      </div>
      <div class="row">
        <label for="gomez">Gomez</label>
        <input v-model="gomez" type="checkbox" id="gomez">
      </div>
      <div class="row">
        <label for="backgroundWork">Работать в фоне</label>
        <input v-model="backgroundWork" type="checkbox" id="backgroundWork">
      </div>
    </div>
  </div>
</template>
<script>
import NavigatorHeader from '@/components/NavigatorHeader.vue'
import * as Settings from '@/js/Settings'
import * as Background from '@/js/Background'
import SubMenu from '@/components/SubMenu.vue'

export default {
  name: 'SettingsView',
  components: { NavigatorHeader, SubMenu },
  data () {
    return {
      repeatCounter: this.$store.getters.getSettings.repeatCounter,
      dataUpdate: this.$store.getters.getSettings.dataUpdate,
      limitBlackWhite: this.$store.getters.getSettings.limitBlackWhite,
      hideMenu: this.$store.getters.getSettings.hideMenu,
      hideInfoBlock: this.$store.getters.getSettings.hideInfoBlock,
      hideWidgets: this.$store.getters.getSettings.hideWidgets,
      hideFixed: this.$store.getters.getSettings.hideFixed,
      backgroundWork: this.$store.getters.getSettings.backgroundWork,
      gomez: this.$store.getters.getSettings.gomez
    }
  },
  computed: {
  },
  methods: {
    async reset () {
      if (!window.confirm('Вы уверенны? ЧБ списки будут очищены, а настройки станут по умолчанию')) return

      await Settings.save({})
      this.$router.back()
    }
  },
  created () {
  },
  watch: {
    async repeatCounter (val) {
      const settings = await Settings.get()
      settings.repeatCounter = val
      await Settings.save(settings)
    },
    async limitBlackWhite (val) {
      const settings = await Settings.get()
      settings.limitBlackWhite = val
      await Settings.save(settings)
    },
    async dataUpdate (val) {
      const settings = await Settings.get()
      settings.dataUpdate = val
      await Settings.save(settings)
    },
    async hideMenu (val) {
      const settings = await Settings.get()
      settings.hideMenu = val
      await Settings.save(settings)
    },
    async hideInfoBlock (val) {
      const settings = await Settings.get()
      settings.hideInfoBlock = val
      await Settings.save(settings)
    },
    async hideWidgets (val) {
      const settings = await Settings.get()
      settings.hideWidgets = val
      await Settings.save(settings)
    },
    async hideFixed (val) {
      const settings = await Settings.get()
      settings.hideFixed = val
      await Settings.save(settings)
    },
    async backgroundWork (val) {
      const settings = await Settings.get()
      settings.backgroundWork = val
      await Settings.save(settings)
      await Background.stop()
      await Background.start()
    },
    async gomez (val) {
      const settings = await Settings.get()
      settings.gomez = val
      await Settings.save(settings)
    }
  }
}
</script>
<style scoped>
.settings {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
}
.range {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  margin-bottom: 1rem;
  padding: .5rem .2rem;
}
.range .row {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  margin-bottom: .5rem;
}
.checkbox {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  margin-bottom: 1rem;
  padding: .5rem .2rem;
}
.checkbox .row {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: .5rem;
}
input[type=range] {
  -webkit-appearance: none;
  background: #111111;
  margin-top: .3rem;
  margin-bottom: .3rem;
}
input[type=range]:focus {
  outline: none;
}
input[type=range]::-webkit-slider-runnable-track {
  width: 100%;
  height: .3rem;
  cursor: pointer;
  background: #50555C;
  border-radius: 8px;
}
input[type=range]::-webkit-slider-thumb {
  height: 10px;
  width: 20px;
  border-radius: 5px;
  background: #9f9c00;
  cursor: pointer;
  -webkit-appearance: none;
  margin-top: -.1rem;
}
input[type=range]:focus::-webkit-slider-runnable-track {
  background: #50555C;
}
</style>
