<template>
  <div class="song-list flex-column vfull">
    <div class="flex-one substance pad">
      <div v-for="song in songs" @click="setSong(song.key)" class="flex-row theme-mid song shadow">
        <p>{{readable(song.passage)}}</p>
        <p class="blue">{{song.artist}}</p>
      </div>
    </div>
    <div v-if="showControls" class="controls-wrapper theme-mid shadow-top">
      <div class="progress callout-light" :style="{width: `${currentTime/duration * 100}%`}"></div>
      <div class="flex-row controls pad">
        <div v-if="isPlaying" @click="audio.pause()"><i class="fa fa-pause"></i></div>
        <div v-if="!isPlaying" @click="audio.play()"><i class="fa fa-play"></i></div>
        <div class="flex-one"></div>
        <div class="muted">
          {{timeLabel}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import server from '../services/true-songs-service'
import bibleParser from '../helpers/bible-parser'

export default {
  name: 'SongList',
  data () {
    return {
      audio: undefined,
      currentSong: undefined,
      isPlaying: false,
      duration: undefined,
      currentTime: undefined
    }
  },
  computed: {
    ...mapGetters(['songs']),
    showControls () {
      return this.currentTime && this.duration
    },
    timeLabel () {
      return this.currentTime && this.duration
      ? `${this.time(this.currentTime)} / ${this.time(this.duration)}`
      : ''
    }
  },
  methods: {
    ...mapActions(['setSongs']),
    readable (passage) {
      return bibleParser.normalize(passage)
    },
    setSong (key) {
      initiateAudio(this.audio)

      const self = this
      this.currentSong = key
      if (this.audio) {
        this.audio.pause()
      }
      server.streamSong(key)
      .then(response => {
        self.audio.src = response
        self.audio.play()
        self.audio.addEventListener('timeupdate', () => {
          self.duration = self.audio.duration
          self.currentTime = self.audio.currentTime
        })
        self.audio.addEventListener('pause', () => { self.isPlaying = false })
        self.audio.addEventListener('play', () => { self.isPlaying = true })
        window.a = self.audio
      })
    },
    time (n) {
      const seconds = parseInt(n % 60)
      return `${parseInt(n / 60)}:${seconds < 10 ? '0' : ''}${seconds}`
    }
  },
  mounted () {
    this.audio = new Audio()
    const self = this
    server.fetchSongs()
    .then(songs => {
      self.setSongs(songs)
    })
  }
}

function initiateAudio (audio) {
  audio.src = ''
  audio.play()
  audio.pause()
}
</script>

<style lang="less" scoped>
.song-list {
  .song {
    padding: 10px;
    margin-bottom: 8px;
    & > * {
      padding: 5px;
    }
  }
  .controls-wrapper {
    .progress {
      height: 5px;
      transition: width 1.5s;
    }
  }
}
</style>
