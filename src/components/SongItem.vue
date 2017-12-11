<template>
  <div @click="playSong(song.key)" class="flex-row align-center theme-mid song">
    <div class="song-art theme-back">
      {{bookLabel}}
      <div v-if="isLoading" class="spinner cover fa-spin"></div>
    </div>
    <div class="flex-one">
      <p>{{readablePassage}}</p>
      <p class="muted">{{song.artist}} <span v-for="label in song.labels" class="song-label blue rounded">{{label}}</span></p>
    </div>
    <p class="back-blue">{{song.bible_version.versionCode}}</p>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import bibleParser from '../helpers/bible-parser'

export default {
  name: 'SongItem',
  props: ['song'],
  computed: {
    ...mapGetters(['currentSong', 'isLoadingSong']),
    readablePassage () {
      return bibleParser.normalize(this.song.passage)
    },
    bookLabel () {
      return this.readablePassage.replace(/\s/g, '').substring(0, 2)
    },
    isLoading () {
      return this.currentSong === this.song.key && this.isLoadingSong
    }
  },
  methods: {
    ...mapActions(['playSong'])
  }
}
</script>

<style lang="less" scoped>
.song {
  padding: 3px 10px;
  margin-bottom: 2px;
  & > * {
    padding: 5px;
  }
  .song-art {
    position: relative;
    height: 20px;
    width: 20px;
    text-align: center;
    border-radius: 50px;
    padding: 10px;
    margin-right: 8px;
  }
  .song-label {
    margin: 0 3px;
  }
}
</style>
