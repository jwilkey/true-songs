<template>
  <div class="controls-wrapper theme-mid shadow-top" :style="{'max-height': height}">
    <div class="progress back-green" :style="{width: `${currentTime/duration * 100}%`}"></div>
    <div class="flex-row align-center controls">
      <div v-if="isPlaying" @click="pause"><img src="../../../static/images/pause.svg" /></div>
      <div v-if="!isPlaying" @click="play"><img src="../../../static/images/play.svg" /></div>
      <div @click="nextSong"><i class="fas fa-forward"></i></div>

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
import { mapGetters, mapActions } from 'vuex'
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
    ...mapGetters(['currentSong', 'songs']),
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
      this.setIsPlaying(this.isPlaying)

      this.isPlaying
      ? this.startInterval()
      : clearInterval(this.updateInterval)
    }
  },
  methods: {
    ...mapActions(['isLoadingSong', 'setIsPlaying', 'setCurrentSong']),
    playCurrentSong () {
      this.audio.src = ''
      this.audio.play()

      this.isLoadingSong(true)

      const self = this
      server.streamSong(this.currentSong)
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
    time (n) {
      const seconds = parseInt(n % 60)
      return `${parseInt(n / 60)}:${seconds < 10 ? '0' : ''}${seconds}`
    },
    nextSong () {
      const self = this
      const index = this.songs.findIndex(song => song.key === self.currentSong)
      const nextSong = this.songs.length === index + 1 ? this.songs[0] : this.songs[index + 1]
      this.setCurrentSong(nextSong.key)
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
