<template>
  <div class="controls-wrapper z4 shadow-top" :style="{'max-height': height}">
    <div v-if="!showDetailView" class="theme-mid">
      <div class="progress back-green" :style="{width: `${progress * 100}%`}"></div>
      <div class="flex-row align-center controls">
        <div v-if="isPlaying" @click="pause"><img src="../../../static/images/pause.svg" /></div>
        <div v-if="!isPlaying" @click="play"><img src="../../../static/images/play.svg" /></div>
        <div v-if="currentSong" @click="toggleDetailView" class="flex-one">
          <p>{{readablePassage}}</p>
          <p class="muted font-small">{{currentSong.artist}}</p>
        </div>
        <div @click="toggleDetailView">
          <i class="fas fa-chevron-up muted-more"></i>
        </div>
      </div>
    </div>

    <playback-detail v-if="showDetailView" :delegate="this" :song="currentSong" :readable-passage="readablePassage" :progress="progress"></playback-detail>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import server from '@/services/true-songs-service'
import bibleParser from '@/helpers/bible-parser'
import PlaybackDetail from '@/components/playback/PlaybackDetail'

export default {
  name: 'PlaybackBar',
  data () {
    return {
      audio: new Audio(),
      showDetailView: false,
      updateInterval: undefined,
      duration: undefined,
      currentTime: undefined,
      isPlaying: false
    }
  },
  computed: {
    ...mapGetters(['currentSong', 'songs']),
    readablePassage () {
      return this.currentSong ? bibleParser.normalize(this.currentSong.passage) : ''
    },
    height () {
      return !this.currentSong
      ? '0px'
      : this.showDetailView
      ? '100%'
      : '200px'
    },
    progress () {
      return this.currentTime / this.duration
    }
  },
  watch: {
    currentSong () {
      if (this.currentSong) {
        this.playCurrentSong()
      }
    },
    isPlaying () {
      this.setIsPlaying(this.isPlaying)

      this.isPlaying
      ? this.startInterval()
      : clearInterval(this.updateInterval)
    }
  },
  components: { PlaybackDetail },
  methods: {
    ...mapActions(['isLoadingSong', 'setIsPlaying', 'setCurrentSong']),
    toggleDetailView () {
      this.showDetailView = !this.showDetailView
    },
    playCurrentSong () {
      this.audio.src = ''
      this.audio.play()

      this.isLoadingSong(true)

      const self = this
      server.streamSong(this.currentSong.key)
      .then(response => {
        this.isLoadingSong(false)
        self.audio.src = response
        self.audio.play()
        self.audio.addEventListener('pause', () => { self.isPlaying = false })
        self.audio.addEventListener('play', () => { self.isPlaying = true })
        self.audio.addEventListener('ended', this.songEnded)
      })
    },
    play () {
      this.audio.play()
    },
    pause () {
      this.audio.pause()
    },
    setProgress (percentage) {
      this.audio.currentTime = this.audio.duration * percentage
      this.currentTime = this.audio.currentTime
    },
    songEnded () {
      this.isPlaying = false
      this.nextSong()
    },
    startInterval () {
      if (this.audio) {
        const self = this
        this.updateInterval = setInterval(() => {
          self.duration = self.audio.duration
          self.currentTime = self.audio.currentTime
        }, 100)
      }
    },
    rewindAudio () {
      this.audio.currentTime -= 10
      this.currentTime = this.audio.currentTime
    },
    forwardAudio () {
      this.audio.currentTime += 10
      this.currentTime = this.audio.currentTime
    }
  }
}
</script>

<style lang="less" scoped>
.controls-wrapper {
  transition: max-height 0.5s;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  .controls {
    padding: 5px 15px;
    & > * {
      margin-right: 10px;
    }
  }
  img {
    height: 25px;
    width: 25px;
  }
  .progress {
    height: 5px;
    transition: width 0.3s;
  }
}
</style>
