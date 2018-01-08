<template>
  <div class="songs-by-artist small-pad">
    <div v-for="artist in songsByArtist" @click="artistSelected(artist[0])" class="flex-row align-center theme-mid phaser">
      <div class="emblem theme-back">
        <p class="emblem-label z2 cover">{{ artist[1] }}</p>
      </div>
      <p class="flex-one">{{ artist[0] }}</p>
      <p class="muted alt font-small">{{ artist[1] }} songs</p>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'songs-by-artist',
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters(['allSongs']),
    songsByArtist () {
      var artists = {}
      this.allSongs.forEach(s => {
        artists[s.artist] = (artists[s.artist] || 0) + 1
      })
      return Object.entries(artists)
    }
  },
  methods: {
    ...mapActions(['setFilter']),
    artistSelected (artist) {
      this.setFilter({key: 'artist', value: artist})
    }
  }
}
</script>

<style lang="less" scoped>
.songs-by-artist {
  .phaser {
    padding: 3px 10px;
    margin-bottom: 2px;
    border-top-left-radius: 30px;
    border-bottom-left-radius: 30px;
    min-height: 44px;
    .emblem {
      position: relative;
      height: 31px;
      width: 31px;
      text-align: center;
      border-radius: 50px;
      margin-right: 8px;
      margin-bottom: 1px;
      .emblem-label {
        margin: 0;
        padding-top: 5px;
      }
    }
  }
}
</style>
