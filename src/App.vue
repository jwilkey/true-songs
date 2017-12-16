<template>
  <div id="app">
    <div class="main-content flex-column vfull" :class="{blur: isLoading || alertConfig, shiftr: revealRightView}">
      <titlebar class="shadow"></titlebar>
      <router-view class=" router flex-one"/>
      <playback-bar ref="playback"></playback-bar>
      <div class="background theme-back"></div>
    </div>

    <loading v-if="isLoading"></loading>
    <alert v-if="alertConfig" :content="alertConfig.content" :actions="alertConfig.actions"></alert>

    <div v-if="revealRightView" class="right-view theme-under pad appear" :class="{blur: isLoading || alertConfig}">
      <div :is="rightView" v-bind="rightViewProps" class="vfull"></div>
    </div>
  </div>
</template>

<script>
import Titlebar from '@/components/Titlebar'
import PlaybackBar from '@/components/playback/PlaybackBar'
import Loading from '@/components/modals/Loading'
import Alert from '@/components/modals/Alert'

export default {
  name: 'app',
  data () {
    return {
      isLoading: false,
      showAlert: true,
      alertConfig: undefined,
      rightView: undefined,
      rightViewProps: undefined
    }
  },
  computed: {
    revealRightView () {
      return this.rightView !== undefined
    }
  },
  components: { Titlebar, PlaybackBar, Loading, Alert }
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
.loading {
  z-index: 500;
}
</style>
