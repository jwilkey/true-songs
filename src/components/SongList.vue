<template>
  <div class="song-list flex-column vfull">
    <div class="songs flex-one substance pad">
      <div v-for="song in songs" @click="playSong(song.key)" class="flex-row align-center theme-mid song">
        <div class="flex-one">
          <p>{{readable(song.passage)}}</p>
          <p class="muted">{{song.artist}} <span v-for="label in song.labels" class="song-label blue rounded">{{label}}</span></p>
        </div>
        <p class="back-blue">{{song.bible_version.versionCode}}</p>
      </div>
    </div>

    <playback-bar></playback-bar>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import PlaybackBar from './playback/PlaybackBar'
import server from '../services/true-songs-service'
import bibleParser from '../helpers/bible-parser'

export default {
  name: 'SongList',
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters(['songs', 'currentSong'])
  },
  components: { PlaybackBar },
  methods: {
    ...mapActions(['setSongs', 'playSong', 'configureTitlebar']),
    readable (passage) {
      return bibleParser.normalize(passage)
    },
    addSong () {
      this.$router.push('/add_song')
    }
  },
  mounted () {
    this.configureTitlebar({'<i class="fa fa-plus"></i>': this.addSong})

    const self = this
    server.fetchSongs()
    .then(songs => {
      self.setSongs(songs)
    })
  }
}
</script>

<style lang="less" scoped>
.song-list {
  .songs {
    padding-right: 5px;
    padding-left: 5px;
  }
  .song {
    padding: 5px 10px;
    margin-bottom: 4px;
    & > * {
      padding: 5px;
    }
    .song-label {
      margin: 0 3px;
    }
  }
}
</style>
