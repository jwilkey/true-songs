<template>
  <div @click="playSong(song.key)" class="flex-row align-center theme-mid song">
    <div class="song-art theme-back">
      <p class="song-label cover">{{bookLabel}}</p>
      <div v-if="isLoading" class="spinner cover fa-spin"></div>
      <div v-if="isPlayingSong" class="playing-indicator"></div>
    </div>
    <div class="flex-one">
      <p>{{readablePassage}}</p>
      <p class="muted">{{song.artist}} <span v-for="label in song.labels" class="song-label blue rounded">{{label}}</span></p>
    </div>
    <p class="back-blue">{{song.bible_version.versionCode}}</p>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import bibleParser from '../helpers/bible-parser'

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
  methods: {
    ...mapActions(['playSong'])
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
  .song-art {
    position: relative;
    height: 31px;
    width: 31px;
    text-align: center;
    border-radius: 50px;
    margin-right: 8px;
    overflow: hidden;
    .song-label {
      margin: 0;
      z-index: 10;
      padding-top: 10px;
    }
    .playing-indicator {
      position: absolute;
      top: 40%;
      left: -50%;
      background-image: url('../../static/images/blob.png');
      background-size: contain;
      opacity: 0.2;
      height: 200%;
      width: 200%;
      z-index: 1;
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
  from {
    transform: rotateZ(0deg);
  }
  to {
    transform: rotateZ(360deg);
  }
}
</style>
