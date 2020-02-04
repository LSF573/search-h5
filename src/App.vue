<template>
  <div id="app">
    <!-- 缓存组件跳转的页面 -->
    <keep-alive> 
    　<router-view v-if="$route.meta.keepAlive" transition-mode="out-in"></router-view>
    </keep-alive>
    <!-- 非缓存组件跳转页面 -->
    <router-view v-if="!$route.meta.keepAlive" transition-mode="out-in"></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  width: 100%;
  height: 100%;
}
</style>
