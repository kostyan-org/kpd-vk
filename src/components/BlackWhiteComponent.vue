<template>
    <div class="blackwhitelist">
    <ol v-if="list === 'white'">
      <li v-if="users.length" v-for="link in users" :key="link">
        <div class="container">
          <div class="link">
            <a :href="link" target="_blank">{{link}}</a>
          </div>
          <div class="action">
            <a @click.stop.prevent="inBlack(link)" href="">
              <font-awesome-icon icon="fa-solid fa-ban" />
            </a>
            <a @click.stop.prevent="removeWhite(link)" href="">
              <font-awesome-icon icon="fa-solid fa-trash" />
            </a>
          </div>
        </div>
      </li>
      <li v-else>
        Пусто
      </li>
    </ol>
    <ol v-if="list === 'black'">
      <li v-if="users.length" v-for="link in users" :key="link">
        <div class="container">
          <div class="link">
            <a :href="link" target="_blank">{{link}}</a>
          </div>
          <div class="action">
            <a @click.stop.prevent="inWhite(link)" href="">
              <font-awesome-icon icon="fa-solid fa-heart" />
            </a>
            <a @click.stop.prevent="removeBlack(link)" href="">
              <font-awesome-icon icon="fa-solid fa-trash" />
            </a>
          </div>
        </div>
      </li>
      <li v-else>
        Пусто
      </li>
    </ol>
  </div>
</template>

<script>
import * as Settings from '@/js/Settings'
export default {
  name: 'BlackWhiteComponent',
  props: ['users', 'list'],
  methods: {
    inBlack (link) {
      Settings.addBlack(link)
    },
    inWhite (link) {
      Settings.addWhite(link)
    },
    removeBlack (link) {
      Settings.removeBlack(link)
    },
    removeWhite (link) {
      Settings.removeWhite(link)
    }
  }
}
</script>
<style scoped>
.container {
  display: flex;
  flex-direction: column;
}
.action, .link {
  display: flex;
  flex-direction: row;
}
.action a {
  display: flex;
  justify-content: center;
  padding: .3rem .3rem;
}
.action a:hover {
  background: #222222;
  border-radius: .2rem;
}
.action a:active {
  background: #ff4500;
  color: #111111;
  border-radius: .3rem;
}
ol {
  list-style-type: none;
  counter-reset: num;
  margin: 0 0 1rem 3rem;
  padding: 1rem 0 .5rem 0;
  position: relative;
}
ol li {
  position: relative;
  margin: 0 0 .2rem 0;
  padding: 0;
}
ol li:before {
  content: counter(num);
  counter-increment: num;
  display: inline-block;
  position: absolute;
  top: 0;
  left: -3rem;
  min-width: 2rem;
  height: 1.5rem;
  background: #222;
  color: #ff4500;
  text-align: center;
  font-size: 1.1rem;
  border-radius: 10%;
  border: 1px solid #ff4500;
}
/* Вертикальная линия */
ol:before {
  content: '';
  position: absolute;
  top: 1rem;
  bottom: 1rem;
  left: -.5rem;
  width: 1px;
  border-left: 1px solid #222222;
}
</style>
