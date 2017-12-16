<template>
  <div class="flex-row align-center theme-mid song">
    <div @click="playSong" class="song-art theme-back">
      <p class="song-label cover">{{bookLabel}}</p>
      <div v-if="isLoading" class="spinner cover fa-spin"></div>
      <div v-if="isPlayingSong" class="cover"><div class="playing-indicator"></div></div>
      <div v-if="isPlayingSong" class="cover"><div class="playing-indicator-left"></div></div>
    </div>
    <div @click="playSong" class="flex-one">
      <p>{{readablePassage}} <span class="version-label callout alt font-small">{{song.bible_version.versionCode}}</span></p>
      <p class="muted">{{song.artist}} </p>
    </div>
    <div>
      <button class="muted alt" @click="toggleOptions"><i class="fas fa-ellipsis-v"></i></button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import bibleParser from '../helpers/bible-parser'
import playbackMixin from '../mixins/playback-mixin'
import SongDetail from './SongDetail'

export default {
  name: 'SongItem',
  data () {
    return {
    }
  },
  props: ['song'],
  computed: {
    ...mapGetters(['currentSong', 'isLoadingSong', 'isPlaying', 'user']),
    readablePassage () {
      return bibleParser.normalize(this.song.passage)
    },
    bookLabel () {
      return this.readablePassage.replace(/\s/g, '').substring(0, 2)
    },
    isLoading () {
      return this.currentSong === this.song.key && this.isLoadingSong
    },
    isCurrentSong () {
      return this.currentSong === this.song.key
    },
    isPlayingSong () {
      return this.isCurrentSong && this.isPlaying
    }
  },
  mixins: [playbackMixin],
  methods: {
    ...mapActions(['setCurrentSong']),
    playSong () {
      this.setCurrentSong(this.song.key)
      this.play()
    },
    toggleOptions () {
      this.showRightView(SongDetail, {song: this.song})
    }
  }
}
</script>

<style lang="less" scoped>
.song {
  padding: 3px 10px;
  margin-bottom: 2px;
  border-top-left-radius: 30px;
  border-bottom-left-radius: 30px;
  & > * {
    padding: 5px;
  }
  .version-label {
    margin-left: 6px;
  }
  .song-art {
    position: relative;
    height: 31px;
    width: 31px;
    text-align: center;
    border-radius: 50px;
    margin-right: 8px;
    margin-bottom: 1px;
    overflow: hidden;
    -webkit-mask-image: -webkit-radial-gradient(circle, white, black);
    .song-label {
      margin: 0;
      z-index: 10;
      padding-top: 10px;
    }
    .playing-indicator {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 200%;
      background-image: url('../../static/images/waves.png');
      background-size: contain;
      opacity: 0.1;
      z-index: 1;
      transform-style: flat;
      animation-name: rotate;
      animation-duration: 1.2s;
      animation-iteration-count: infinite;
      animation-timing-function: linear;
    }
    .playing-indicator-left {
      .playing-indicator;
      animation-direction: reverse;
    }
  }
}
.song-details {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
}
@keyframes rotate {
  0% {
    transform: translateX(-50%);
  }
  100% {
    transform: translateX(0%);
  }
}
</style>
