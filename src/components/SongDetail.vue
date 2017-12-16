<template>
  <div class="song-details flex-column">
    <div class="flex-one">
      <div @click="close" class="swoop marginb flex-row align-center pad">
        <i class="fas fa-chevron-left muted small-pad"></i>
      </div>

      <p class="text-center font-large pad">{{readablePassage}}</p>

      <div v-if="song.labels.length" class="pad">
        <span class="muted">Labels</span> <span v-for="label in song.labels" class="song-label back-blue">{{label}}</span>
      </div>
    </div>

    <div v-if="isMySong" class="pad text-center">
      <p v-if="errorMessage" class="red text-center"><i class="fas fa-star"></i> {{errorMessage}}</p>
      <a @click="deletePressed" class="nowrap red"><i class="fas fa-trash-alt red"></i> delete song</a>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import bibleParser from '../helpers/bible-parser'
import server from '../services/true-songs-service'

export default {
  name: 'SongDetail',
  data () {
    return {
      errorMessage: undefined
    }
  },
  computed: {
    ...mapGetters(['user']),
    readablePassage () {
      return bibleParser.normalize(this.song.passage)
    },
    isMySong () {
      return this.song.user === this.user.id
    }
  },
  props: ['song'],
  methods: {
    ...mapActions(['removeSong']),
    close () {
      this.hideRightView()
    },
    deletePressed () {
      const self = this
      this.alert('Delete this song?', {
        'Yes': self.deleteSong,
        'No': self.dismissalert
      })
    },
    deleteSong () {
      this.dismissalert()
      this.showLoading()
      const self = this
      server.deleteSong(this.song)
      .then(response => {
        self.hideLoading()
        self.errorMessage = undefined
        self.removeSong(this.song)
        self.hideRightView()
      })
      .catch(e => {
        self.isDeleting = false
        self.errorMessage = 'Failed to delete song'
      })
    }
  }
}
</script>

<style lang="less" scoped>
.song-label {
  margin: 0 3px;
  padding: 3px 5px;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
}
</style>
