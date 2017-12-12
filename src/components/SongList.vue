<template>
  <div class="song-list flex-column vfull">
    <div class="songs flex-one substance pad">
      <song-item v-for="(song, i) in songs" :song="song" :key="i"></song-item>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
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
  components: { SongItem },
  methods: {
    ...mapActions(['setSongs', 'configureTitlebar']),
    addSong () {
      this.$router.push('/add_song')
    }
  },
  mounted () {
    window.r = this.$root
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
