<template>
  <div id="app" :class="{noscroll: revealRightView}">
    <div class="main-content z1 flex-column vfull" :class="{blur: isLoading || alertConfig}">
      <titlebar :title="titlebarTitle" :leftItems="titlebarLeftItems" :rightItems="titlebarRightItems"></titlebar>

      <div class="flex-one scrolly flex-row hfull">
        <div class="flex-one">
          <router-view class="router"/>
        </div>
        <div v-if="revealRightView" class="right-view z3 slide-from-right" :class="{blur: isLoading || alertConfig}">
          <div class="theme-mid shadow vfull">
            <div class="right-view-close pad nopad-bottom">
              <button class="muted alt hfull" @click="hideRightView"><span class="muted-more">CLOSE</span></button>
            </div>
            <div :is="rightView" v-bind="rightViewProps" class="vfull"></div>
          </div>
        </div>
      </div>

      <playback-bar ref="playback"></playback-bar>

      <div class="background z-1 theme-back"></div>
    </div>

    <loading v-if="isLoading"></loading>
    <alert v-if="alertConfig" :content="alertConfig.content" :actions="alertConfig.actions"></alert>

  </div>
</template>

<script>
import '@/configuration/google-analytics'
import { mapGetters, mapActions } from 'vuex'
import Titlebar from '@/components/Titlebar'
import PlaybackBar from '@/components/playback/PlaybackBar'
import Loading from '@/components/modals/Loading'
import Alert from '@/components/modals/Alert'
import Menu from '@/components/Menu'

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
    ...mapGetters(['titlebarTitle', 'titlebarLeftItems', 'titlebarRightItems']),
    revealRightView () {
      return this.rightView !== undefined
    }
  },
  components: { Titlebar, PlaybackBar, Loading, Alert },
  methods: {
    ...mapActions(['setPlatform'])
  },
  mounted () {
    if (this.$route.query.platform) {
      this.setPlatform(this.$route.query.platform)
    }
  }
}
</script>

<style lang="less">
@import './assets/less/common';

html, body, #app {
  height: 100%;
  margin: 0;
  padding: 0;
}
</style>

<style lang="less" scoped>
.main-content {
  position: relative;
  box-shadow: 3px 0px 10px rgba(0, 0, 0, 0.7);
  transition: transform 0.7s;
  transform-origin: right top;
}
.right-view {
  width: 300px;
  min-width: 220px;
  max-width: 90%;
  padding-left: 10px;
  & > .theme-mid {
    border-top-left-radius: 8px;
  }
}
@media screen and (max-width: 700px) {
  .right-view {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
  }
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
    background-image: url('./assets/images/curves.jpg');
    background-position: center;
    background-size: cover;
    filter: grayscale(1);
    opacity: 0.1;
  }
}
</style>
