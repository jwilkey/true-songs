<template>
  <div id="app" :class="{noscroll: revealRightView}">
    <div class="main-content z1 flex-column vfull" :class="{blur: isLoading || alertConfig, shiftr: revealRightView}">
      <titlebar class=""></titlebar>
      <router-view class="router flex-one"/>
      <playback-bar ref="playback"></playback-bar>
      <div class="background z-1 theme-back"></div>
      <div v-if="revealRightView" @click="rightView = undefined" class="cover z5"></div>
    </div>

    <loading v-if="isLoading"></loading>
    <alert v-if="alertConfig" :content="alertConfig.content" :actions="alertConfig.actions"></alert>

    <div v-if="revealRightView" class="right-view z0 theme-under appear" :class="{blur: isLoading || alertConfig}">
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
@right-view-width: 320px;

.main-content {
  position: relative;
  box-shadow: 3px 0px 10px rgba(0, 0, 0, 0.7);
  transition: transform 0.7s;
  transform-origin: right top;
  .titlebar, .router {
    transition: opacity 0.7s;
  }
}
.shiftr {
  .titlebar, .router {
    opacity: 0.3;
  }
  transform: translateX(-@right-view-width) scale(1.2);
  overflow: hidden;
}
@media screen and (max-width: 355px) {
  .shiftr {
    transform: translateX(-90%) scale(1.2);
  }
}
.right-view {
  position: fixed;
  top: 0;
  right: 0;
  width: @right-view-width;
  max-width: 90%;
  bottom: 0;
}
.background {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  &::after {
    content: '';
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-image: url('../static/images/curves.jpg');
    // background-image: url('https://graf1x.com/wp-content/uploads/2014/09/diagonal-lines.jpg');
    background-position: center;
    background-size: cover;
    filter: grayscale(1);
    // opacity: 0.08;
    opacity: 0.2;
  }
}
</style>
