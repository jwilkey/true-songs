<template>
  <div id="app">
    <div class="main-content flex-column vfull" :class="{shiftr: revealRightView}">
      <titlebar class="shadow"></titlebar>
      <router-view class=" router flex-one"/>
      <div class="background theme-back"></div>
    </div>

    <div v-if="revealRightView" class="right-view theme-under pad appear">
      <div :is="rightView" v-bind="rightViewProps" class="vfull"></div>
    </div>

    <playback-bar ref="playback"></playback-bar>

  </div>
</template>

<script>
import Titlebar from '@/components/Titlebar'
import PlaybackBar from '@/components/playback/PlaybackBar'

export default {
  name: 'app',
  data () {
    return {
      rightView: undefined,
      rightViewProps: undefined
    }
  },
  computed: {
    revealRightView () {
      return this.rightView !== undefined
    }
  },
  components: { Titlebar, PlaybackBar }
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

<style lang="less" scoped>
@right-view-width: 80%;

.main-content {
  position: relative;
  box-shadow: 3px 0px 10px rgba(0, 0, 0, 0.7);
  transition: transform 0.7s;
  transform-origin: right top;
  z-index: 1;
  .titlebar, .router {
    transition: opacity 0.7s;
  }
}
.shiftr {
  .titlebar, .router {
    opacity: 0.3;
  }
  transform: translateX(-@right-view-width) scale(1.2);
}
.right-view {
  position: fixed;
  top: 0;
  right: 0;
  left: calc(100% - @right-view-width);
  bottom: 0;
  z-index: 0;
}
.background {
  position: absolute;
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
    background-image: url('../static/images/triangles.jpg');
    background-position: center;
    filter: grayscale(1);
    opacity: 0.08;
  }
}
.appear {
  animation-name: appear;
  animation-fill-mode: forwards;
  animation-duration: 0.7s;
}
@keyframes appear {
  from {
    opacity: 0.2;
    transform: scale(0.2);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
