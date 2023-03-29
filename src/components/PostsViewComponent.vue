<template>
  <div class="posts">
    <ol>
      <li v-if="posts.length" v-for="post in posts" :key="post.post.link">
        <div class="container">
          <div class="ava">
            <router-link :to="{ name: 'showposts', params: { author: post.author.link }}">
              <img :src="post.author.ava" :alt="post.author.name">
            </router-link>
          </div>
          <div class="info">
            <div class="time">
              {{post.post.time}}
            </div>
            <div class="name">
              <router-link :to="{ name: 'showposts', params: { author: post.author.link }}">
                {{post.author.name}}
              </router-link>
            </div>
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
export default {
  name: 'PostsViewComponent',
  props: ['posts']
}
</script>
<style scoped>
.container {
  display: flex;
  flex-direction: row;
}
.ava img {
  border-radius: 10%;
  padding: 0.2rem;
  width: 30px;
  height: 30px;
  background: #444;
}
.ava img:hover {
  background: #d4d000;
}
.info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: .5rem;
}
.name {
  font-family: 'Roboto-Bold',sans-serif;
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
