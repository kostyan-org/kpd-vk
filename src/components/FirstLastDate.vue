<template>
    <div v-if="$store.getters.countPosts" class="container">
      <div class="first">
        Первый:<br>{{$store.getters.firstPost?.post.time}}
      </div>
      <div class="last">
        Последний:<br>{{$store.getters.lastPost?.post.time}}
      </div>
    </div>
</template>

<script>
export default {
  name: 'FirstLastDate'
}
</script>
<style scoped>
.container {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  border: #444 1px solid;
  border-radius: 5px;
}
.first, .last {
  display: flex;
  flex-grow: 1;
  justify-content: center;
  padding: .5rem .2rem;
  margin-left: .1rem;
  margin-right: .1rem;
  margin-top: 0;
  margin-bottom: .2rem;
}
</style>
