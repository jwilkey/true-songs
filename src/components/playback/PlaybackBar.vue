<template>
  <div class="controls-wrapper theme-mid shadow-top" :style="{'max-height': height}">
    <div class="progress back-green" :style="{width: `${currentTime/duration * 100}%`}"></div>
    <div class="flex-row align-center controls pad">
      <div v-if="isPlaying" @click="pause"><img src="../../../static/images/pause.svg" /></div>
      <div v-if="!isPlaying" @click="play"><img src="../../../static/images/play.svg" /></div>
      <div>
        <button @click="rewindAudio">-10s</button>
        <button @click="forwardAudio">+10s</button>
      </div>

      <div class="flex-one"></div>
      <div class="muted">{{timeLabel}}</div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import server from '../../services/true-songs-service'

export default {
  name: 'PlaybackBar',
  data () {
    return {
      audio: new Audio(),
      updateInterval: undefined,
      duration: undefined,
      currentTime: undefined,
      isPlaying: false
    }
  },
  computed: {
    ...mapGetters(['currentSong']),
    height () {
      return this.currentSong ? '200px' : '0px'
    },
    timeLabel () {
      return this.currentTime && this.duration
      ? `${this.time(this.currentTime)} / ${this.time(this.duration)}`
      : ''
    }
  },
  watch: {
    currentSong () {
      if (this.currentSong) {
        this.playCurrentSong()
      }
    },
    isPlaying () {
      this.isPlaying
      ? this.startInterval()
      : clearInterval(this.updateInterval)
    }
  },
  methods: {
    playCurrentSong () {
      this.audio.src = ''
      this.audio.play()
      this.audio.pause()

      const self = this
      server.streamSong(this.currentSong)
      .then(response => {
        self.audio.src = response
        self.audio.play()
        self.audio.addEventListener('pause', () => { self.isPlaying = false })
        self.audio.addEventListener('play', () => { self.isPlaying = true })
      })
    },
    play () {
      this.audio.play()
    },
    pause () {
      this.audio.pause()
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
    time (n) {
      const seconds = parseInt(n % 60)
      return `${parseInt(n / 60)}:${seconds < 10 ? '0' : ''}${seconds}`
    },
    rewindAudio () {
      this.audio.currentTime -= 10
    },
    forwardAudio () {
      this.audio.currentTime += 10
    }
  }
}
</script>

<style lang="less" scoped>
.controls-wrapper {
  overflow: hidden;
  transition: max-height 0.5s;
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
