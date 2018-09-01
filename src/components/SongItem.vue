<template>
  <div class="flex-row align-center theme-mid song">
    <div @click="playSong" class="song-art theme-back">
      <p class="song-label z2 cover">{{bookLabel}}</p>
      <div v-if="isLoading" class="spinner cover fa-spin"></div>
      <div v-if="isPlayingSong" class="cover z1"><div class="playing-indicator"></div></div>
      <div v-if="isPlayingSong" class="cover"><div class="playing-indicator-left"></div></div>
    </div>
    <div @click="playSong" class="flex-one min-width">
      <div class="flex-row align-center">
        <p class="nowrap">{{readablePassage}}</p>
        <p class="nowrap version-label callout alt font-small">{{song.bible_version.versionCode}}</p>
      </div>
      <p class="muted font-small">{{song.artist}}{{featuredArtistLabel}}</p>
    </div>
    <div @click="toggleOptions" class="options-button">
      <button class="muted alt"><i class="fas fa-ellipsis-v"></i></button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import bibleParser from '@/helpers/bible-parser'
import playbackMixin from '@/mixins/playback-mixin'
import SongDetail from './SongDetail'
import bookNames from '@/bible/book-names'

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
      return bookNames[this.song.book].short
    },
    featuredArtistLabel () {
      return this.song.featuredArtists ? ` (feat. ${this.song.featuredArtists})` : ''
    },
    isLoading () {
      return this.currentSong && this.currentSong.key === this.song.key && this.isLoadingSong
    },
    isCurrentSong () {
      return this.currentSong && this.currentSong.key === this.song.key
    },
    isPlayingSong () {
      return this.isCurrentSong && this.isPlaying
    }
  },
  mixins: [playbackMixin],
  methods: {
    ...mapActions(['setCurrentSong']),
    playSong () {
      this.setCurrentSong(this.song)
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
  padding: 3px 7px;
  margin-bottom: 2px;
  border-top-left-radius: 30px;
  border-bottom-left-radius: 30px;
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
  & > * {
    padding: 5px;
  }
  .version-label {
    margin: 0 6px;
  }
  .min-width {
    min-width: 0;
  }
  .title-line {
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .song-art {
    position: relative;
    height: 31px;
    width: 31px;
    text-align: center;
    border-radius: 50px;
    margin-right: 4px;
    margin-bottom: 1px;
    overflow: hidden;
    -webkit-mask-image: -webkit-radial-gradient(circle, white, black);
    .song-label {
      margin: 0;
      padding-top: 10px;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
    }
    .playing-indicator {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 200%;
      background-image: url('../assets/images/waves.png');
      background-size: contain;
      opacity: 0.1;
      transform-style: flat;
      animation-name: pan;
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
.options-button {
  padding: 8px 15px;
}
@keyframes pan {
  0% {
    transform: translateX(-50%);
  }
  100% {
    transform: translateX(0%);
  }
}
</style>
