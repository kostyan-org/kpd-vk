<template>
    <nav>
      <router-link :to="{ name: 'home'}">
        <font-awesome-icon icon="fa-solid fa-house" />KPD VK
      </router-link>
      <router-link :to="{ name: 'settings'}">
        <font-awesome-icon icon="fa-solid fa-gear" />Настройки
      </router-link>
      <router-link :to="{ name: 'blackwhitelist'}">
        <font-awesome-icon icon="fa-solid fa-ban" />ЧБ списки
      </router-link>
    </nav>
</template>

<script>
export default {
  name: 'NavigatorHeader'
}
</script>
<style scoped>
nav {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
}
nav a {
  display: flex;
  flex-grow: 1;
  justify-content: center;
  padding: .5rem .2rem;
  margin-left: .1rem;
  margin-right: .1rem;
  margin-top: 0;
  margin-bottom: .1rem;
}
nav a:hover {
  background: #222222;
  border-radius: .2rem;
}
nav a:active {
  background: #d6d57e;
  color: #111111;
  border-radius: .3rem;
}
</style>
