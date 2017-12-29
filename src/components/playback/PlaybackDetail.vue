<template>
  <div class="playback-detail theme-mid flex-column">
    <div @click="delegate.toggleDetailView" class="detail-toggle hi-bottom rounded text-center small-pad"></div>

    <div class="flex-one scrolly hi-bottom">
      <p class="font-large text-center">{{readablePassage}}</p>
      <p v-if="song.title" class="muted text-center marginb">{{song.title}}</p>
      <p class="text-center">{{song.artist}}</p>
      <div class="pad">
        <div v-if="isLoadingText" class="text-center pad"><div class="spinner inline fa-spin"></div></div>
        <div v-if="!showReadExternally" v-html="bibleText"></div>
        <div v-if="showReadExternally" class="text-center">
          <a @click="readPassageExternally" class="callout alt">Read this passage...</a>
        </div>
      </div>
    </div>

    <div class="shadow progress-wrapper">
      <div class="progress theme-back" :style="{width: `${progress * 100}%`}"></div>
    </div>
    <div class="flex-row align-center pad">
      <a @click="delegate.rewindAudio" class="tracking"><img src="../../../static/images/track-minus-10.png" /></a>
      <div class="flex-one flex-row align-center flex-center">
        <div @click="previousSong"><i class="fas fa-backward"></i></div>
        <div v-if="delegate.isPlaying" @click="delegate.pause" class="main-btn pause muted-border"></div>
        <div v-if="!delegate.isPlaying" @click="delegate.play" class="main-btn play muted-border"></div>
        <div @click="nextSong"><i class="fas fa-forward"></i></div>
      </div>
      <a @click="delegate.forwardAudio" class="tracking"><img src="../../../static/images/track-plus-10.png" /></a>
    </div>

    <div class="muted text-center pad">{{timeLabel}}</div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import server from '@/services/true-songs-service'

export default {
  name: 'playback-detail',
  data () {
    return {
      isLoadingText: false,
      bibleText: undefined
    }
  },
  props: ['delegate', 'song', 'readablePassage', 'progress'],
  computed: {
    ...mapGetters(['songs']),
    timeLabel () {
      return this.delegate.currentTime && this.delegate.duration
      ? `${this.time(this.delegate.currentTime)} / ${this.time(this.delegate.duration)}`
      : ''
    },
    showReadExternally () {
      return ['niv', 'nkjv'].includes(this.song.bible_version.versionCode.toLowerCase())
    }
  },
  methods: {
    ...mapActions(['setCurrentSong']),
    time (n) {
      const seconds = parseInt(n % 60)
      return `${parseInt(n / 60)}:${seconds < 10 ? '0' : ''}${seconds}`
    },
    readPassageExternally () {
      const version = this.song.bible_version.versionCode
      this.$router.push(`/bible?passage=${this.song.passage}&version=${version}`)
      this.delegate.toggleDetailView()
    },
    previousSong () {
      const self = this
      const index = this.songs.findIndex(song => song.key === self.song.key)
      const nextSong = index === 0 ? this.songs[this.songs.length - 1] : this.songs[index - 1]
      this.setCurrentSong(nextSong)
    },
    nextSong () {
      const self = this
      const index = this.songs.findIndex(song => song.key === self.song.key)
      const nextSong = this.songs.length === index + 1 ? this.songs[0] : this.songs[index + 1]
      this.setCurrentSong(nextSong)
    }
  },
  mounted () {
    const self = this
    server.fetchBibleText(this.song)
    .then(response => {
      self.isLoadingText = false
      self.bibleText = response.text
    })
    .catch(e => {
      self.isLoadingText = false
    })
  }
}
</script>

<style lang="less" scoped>
.playback-detail {
  height: 90vh;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
.playback {
  height: 90vh;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  overflow: hidden;
}
.detail-toggle {
  margin: 15px;
  margin-top: 0px;
  background-image: url('../../../static/images/collapse.svg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: 50px;
  height: 25px;
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
.progress-wrapper {
  margin: 30px 20px 10px 20px;
  border-radius: 10px;
  overflow: hidden;
}
.progress {
  height: 5px;
  transition: width 0.3s;
}
</style>
