<template>
  <div @click="playSong" class="flex-row align-center theme-mid song">
    <div class="song-art theme-back">
      <p class="song-label cover">{{bookLabel}}</p>
      <div v-if="isLoading" class="spinner cover fa-spin"></div>
      <div v-if="isPlayingSong" class="cover"><div class="playing-indicator callout"></div></div>
    </div>
    <div class="flex-one">
      <p>{{readablePassage}} <span class="version-label blue font-small">{{song.bible_version.versionCode}}</span></p>
      <p class="muted">{{song.artist}} <span v-for="label in song.labels" class="song-label blue rounded">{{label}}</span></p>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import bibleParser from '../helpers/bible-parser'
import playbackMixin from '../mixins/playback-mixin'

export default {
  name: 'SongItem',
  props: ['song'],
  computed: {
    ...mapGetters(['currentSong', 'isLoadingSong', 'isPlaying']),
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
    overflow: hidden;
    -webkit-mask-image: -webkit-radial-gradient(circle, white, black);
    .song-label {
      margin: 0;
      z-index: 10;
      padding-top: 10px;
    }
    .playing-indicator {
      position: absolute;
      top: 10%;
      left: 10%;
      height: 80%;
      width: 80%;
      border-radius: 50px;
      opacity: 0.3;
      z-index: 1;
      transform-style: flat;
      animation-name: rotate;
      animation-duration: 4s;
      animation-iteration-count: infinite;
      animation-timing-function: linear;
    }
  }
  .song-label {
    margin: 0 3px;
  }
}
@keyframes rotate {
  0% {
    transform: rotateY(0deg) scale(1.0);
  }
  50% {
    transform: rotateY(180deg) scale(0.3);
  }
  100% {
    transform: rotateY(360deg) scale(1.0);
  }
}
</style>
