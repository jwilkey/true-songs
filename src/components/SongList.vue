<template>
  <div class="song-list flex-column vfull">
    <div class="songs flex-one substance pad">
      <song-item v-for="(song, i) in songs" :song="song" @click="playSong(song.key)" :key="i"></song-item>
    </div>

    <playback-bar></playback-bar>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import PlaybackBar from './playback/PlaybackBar'
import SongItem from './SongItem'
import server from '../services/true-songs-service'

export default {
  name: 'SongList',
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters(['songs', 'currentSong'])
  },
  components: { SongItem, PlaybackBar },
  methods: {
    ...mapActions(['setSongs', 'playSong', 'configureTitlebar']),
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
}
</style>
