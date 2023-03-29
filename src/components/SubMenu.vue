<template>
    <div class="submenu">
        <slot></slot>
    </div>
</template>
<script>
export default {
  name: 'SubMenu'
}
</script>
<style>
.submenu {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
}
.submenu a {
  display: flex;
  flex-grow: 1;
  justify-content: center;
  padding: .3rem .1rem;
  margin-left: .1rem;
  margin-right: .1rem;
  margin-top: 0;
  margin-bottom: .1rem;
  border-radius: .2rem;
}
.submenu a:hover {
  background: #222222;
  border-radius: .2rem;
}
.submenu a:active {
  background: #d6d57e;
  color: #111111;
  border-radius: .3rem;
}
.submenu .info {
  background: #2a2900
}
.submenu .danger {
  background: #330000
}
</style>
