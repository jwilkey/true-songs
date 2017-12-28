<template>
  <div class="controls-wrapper z2 shadow-top" :style="{'max-height': height}">
    <transition name="fade">
      <div v-if="!showDetailView" class="theme-mid">
        <div class="progress back-green" :style="{width: `${currentTime/duration * 100}%`}"></div>
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
    </transition>

    <transition name="fade">
      <div v-if="showDetailView" class="controls-detail theme-mid flex-column">
        <div @click="toggleDetailView" class="detail-toggle hi-bottom rounded text-center small-pad"><i class="fas fa-chevron-down"></i></div>

        <div class="flex-one">
          <p class="font-large text-center">{{readablePassage}}</p>
          <p v-if="currentSong.title" class="muted text-center marginb">{{currentSong.title}}</p>
          <p class="text-center">{{currentSong.artist}}</p>
        </div>

        <div class="callout-border rounded marginl marginr">
          <div class="progress theme-back" :style="{width: `${currentTime/duration * 100}%`}"></div>
        </div>
        <div class="flex-row align-center marginb pad">
          <a @click="rewindAudio" class="tracking"><img src="../../../static/images/track-minus-10.png" /></a>
          <div class="flex-one flex-row align-center flex-center">
            <div @click="previousSong"><i class="fas fa-backward"></i></div>
            <div v-if="isPlaying" @click="pause" class="main-btn pause muted-border"></div>
            <div v-if="!isPlaying" @click="play" class="main-btn play muted-border"></div>
            <div @click="nextSong"><i class="fas fa-forward"></i></div>
          </div>
          <a @click="forwardAudio" class="tracking"><img src="../../../static/images/track-plus-10.png" /></a>
        </div>

        <div class="muted text-center pad">{{timeLabel}}</div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import server from '@/services/true-songs-service'
import bibleParser from '@/helpers/bible-parser'

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
    previousSong () {
      const self = this
      const index = this.songs.findIndex(song => song.key === self.currentSong.key)
      const nextSong = index === 0 ? this.songs[this.songs.length - 1] : this.songs[index - 1]
      this.setCurrentSong(nextSong)
    },
    nextSong () {
      const self = this
      const index = this.songs.findIndex(song => song.key === self.currentSong.key)
      const nextSong = this.songs.length === index + 1 ? this.songs[0] : this.songs[index + 1]
      this.setCurrentSong(nextSong)
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
.controls-detail {
  height: 90vh;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  overflow: hidden;
}
.detail-toggle {
  margin: 15px;
  margin-top: 0px;
}
.tracking {
  img {
    height: 30px;
    width: 30px;
  }
}
.play {
  background-image: url("../../../static/images/play.svg");
  background-size: 27px;
  background-repeat: no-repeat;
  background-position: center;
}
.pause {
  background-image: url("../../../static/images/pause.svg");
  background-size: 27px;
  background-repeat: no-repeat;
  background-position: center;
}
.main-btn {
  margin: 15px 10px;
  height: 50px;
  width: 50px;
  border-radius: 100%;
  img {
    background-color: blue;
  }
}
</style>
