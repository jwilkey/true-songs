<template>
  <div id="app" class="flex-column">
    <titlebar class="shadow"></titlebar>
    <router-view class="flex-one"/>
    <div class="background theme-back"></div>
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
.background {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: -100;
  &::after {
    content: '';
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-image: url('../static/images/snow.jpeg');
    background-size: cover;
    background-position: center;
    filter: grayscale(1);
    opacity: 0.2;
  }
}
</style>
