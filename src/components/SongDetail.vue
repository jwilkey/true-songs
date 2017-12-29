<template>
  <div class="song-details flex-column">
    <div class="flex-one scrolly pad">
      <button @click="close" class="hfull text-left marginb"><i class="fas fa-chevron-left"></i> CLOSE</button>

      <p class="text-center font-large small-pad">{{readablePassage}}</p>
      <p v-if="song.title" class="text-center muted marginb">{{song.title}}</p>

      <p class="small-pad"><span class="muted">Artist</span> {{song.artist}} <span v-if="song.featuredArtists">(feat. {{song.featuredArtists}})</span></p>
      <p v-if="song.labels.length" class="small-pad"><span class="muted">Labels</span> {{joinedLabels}}</p>

      <p class="muted margint small-pad">Bible text ({{song.bible_version.versionCode}})</p>
      <div v-if="isLoadingText" class="spinner fa-spin"></div>
      <div v-if="!showReadExternally" class="bible-text small-pad" v-html="bibleText"></div>
      <button v-if="showReadExternally" @click="readPassageExternally">Read this passage <i class="fas fa-arrow-right"></i></button>
    </div>

    <div v-if="isMySong" class="pad text-center">
      <p v-if="errorMessage" class="red text-center marginb"><i class="fas fa-star"></i> {{errorMessage}}</p>
      <a @click="editPressed" class="nowrap green marginr"><i class="fas fa-edit green"></i> edit song</a>
      <a @click="deletePressed" class="nowrap red"><i class="fas fa-trash-alt red"></i> delete song</a>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import bibleParser from '../helpers/bible-parser'
import server from '../services/true-songs-service'
import EditSong from '@/components/views/EditSong'

export default {
  name: 'SongDetail',
  data () {
    return {
      bibleText: undefined,
      errorMessage: undefined,
      isLoadingText: true
    }
  },
  computed: {
    ...mapGetters(['user']),
    readablePassage () {
      return bibleParser.normalize(this.song.passage)
    },
    joinedLabels () {
      return this.song.labels.length ? this.song.labels.join(', ') : ''
    },
    showReadExternally () {
      return ['niv', 'nkjv'].includes(this.song.bible_version.versionCode.toLowerCase())
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
    editPressed () {
      this.showRightView(EditSong, {song: this.song})
    },
    deletePressed () {
      const self = this
      this.alert('Delete this song?', {
        'Yes': self.deleteSong,
        'No': self.dismissAlert
      })
    },
    deleteSong () {
      this.dismissAlert()
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
        self.hideLoading()
        self.isDeleting = false
        self.errorMessage = 'Failed to delete song'
      })
    },
    readPassageExternally () {
      this.showRightView(undefined)
      const version = this.song.bible_version.versionCode
      this.$router.push(`/bible?passage=${this.song.passage}&version=${version}`)
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
.song-details {
  .spinner {
    display: inline-block;
    margin: 10px;
  }
}
.song-label {
  margin: 0 3px;
  padding: 3px 5px;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
}
.bible-text {
  line-height: 1.5;
}
</style>
