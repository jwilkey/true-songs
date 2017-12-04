<template>
  <div id="app" class="theme-back flex-column">
    <titlebar class="shadow"></titlebar>
    <router-view class="flex-one"/>
  </div>
</template>

<script>
import Titlebar from '@/components/Titlebar'

export default {
  name: 'app',
  components: { Titlebar }
}
</script>

<style lang="less">
@import '../static/less/common';

html, body, #app {
  height: 100%;
  margin: 0;
  padding: 0;
}
</style>
