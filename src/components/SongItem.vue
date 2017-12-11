<template>
  <div class="flex-row align-center theme-mid song">
    <div class="flex-one">
      <p>{{readablePassage}}</p>
      <p class="muted">{{song.artist}} <span v-for="label in song.labels" class="song-label blue rounded">{{label}}</span></p>
    </div>
    <p class="back-blue">{{song.bible_version.versionCode}}</p>
  </div>
</template>

<script>
import bibleParser from '../helpers/bible-parser'

export default {
  name: 'SongItem',
  props: ['song'],
  computed: {
    readablePassage () {
      return bibleParser ? bibleParser.normalize(this.song.passage) : ''
    }
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
  .song-label {
    margin: 0 3px;
  }
}
</style>
