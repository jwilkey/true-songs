<template>
  <div class="edit-song pad">
    <div class="distance" :class="{apply: field}">
      <h2>Edit song</h2>
      <div @click="editPassage" class="input simple pointer">{{normalizedPassage}}</div>
      <div @click="editVersion" class="input simple pointer">{{versionLabel}}</div>
      <input class="simple pointer" v-model="title" placeholder="song title" />
      <input class="simple pointer" v-model="artist"  placeholder="artist"/>
      <input class="simple pointer" v-model="featuredArtists"  placeholder="featured artists"/>
      <datepicker v-model="releaseDate" format="MMM.dd.yyyy" input-class="simple pointer" calendar-class="red text" placeholder="release date"></datepicker>

      <div class="flex-column marginb margint">
        <div class="flex-row align-center">
          <input
          @keydown.prevent.comma="labelsChanged()"
          @keydown.prevent.semicolon="labelsChanged()"
          @keydown.prevent.enter="labelsChanged()"
          v-model="labelInput" class="input simple pointer" placeholder="labels" />
        </div>
        <div v-if="labels.length" class="labels marginb">
          <p v-for="label in labels" @click="deleteLabel(label)" class="song-label back-red shadow"><i class="fas fa-times"></i> {{label}}</p>
        </div>
      </div>

      <p class="marginb red">{{errorMessage}}</p>
      <div class="flex-row">
        <button @click="showRightView(undefined)" class="flex-one clear red">cancel</button>
        <button @click="save" :disabled="noChanges" class="flex-two marginl">Save</button>
      </div>
    </div>

    <transition name="fade">
      <div v-if="field" class="cover z5 flex-column">
        <passage-picker v-if="field === 'passage'" class="flex-one small-pad" :on-select="passageSelected"></passage-picker>
        <version-picker v-if="field === 'version'" class="flex-one substance" :on-select="versionSelected"></version-picker>
      </div>
    </transition>
  </div>
</template>

<script>
import PassagePicker from '@/components/pickers/PassagePicker'
import VersionPicker from '@/components/pickers/VersionPicker'
import SongDetail from '@/components/SongDetail'
import bibleParser from '@/helpers/bible-parser'
import server from '@/services/true-songs-service'
import { mapActions } from 'vuex'
import Datepicker from 'vuejs-datepicker'

export default {
  name: 'edit-song',
  data () {
    return {
      passage: undefined,
      version: undefined,
      title: undefined,
      artist: undefined,
      featuredArtists: undefined,
      releaseDate: undefined,
      labels: [],
      labelInput: undefined,
      field: undefined,
      errorMessage: undefined
    }
  },
  props: ['song'],
  components: { PassagePicker, VersionPicker, Datepicker },
  computed: {
    versionLabel () {
      return this.version ? this.version.versionCode : ''
    },
    normalizedPassage () {
      return bibleParser.normalize(this.passage)
    },
    noChanges () {
      return this.passage === this.song.passage &&
      this.title === this.song.title &&
      this.artist === this.song.artist &&
      this.featuredArtists === this.song.featuredArtists &&
      JSON.stringify(this.version) === JSON.stringify(this.song.bible_version) &&
      JSON.stringify(this.labels) === JSON.stringify(this.song.labels)
    }
  },
  methods: {
    ...mapActions(['updateSong']),
    editPassage () {
      this.field = 'passage'
    },
    editVersion () {
      this.field = 'version'
    },
    passageSelected (passage) {
      if (passage) {
        this.passage = passage
      }
      this.field = undefined
    },
    versionSelected (version) {
      if (version) {
        this.version = version
      }
      this.field = undefined
    },
    labelsChanged () {
      var lbls = this.labelInput.split(',').map(l => l.trim())
      lbls.forEach(l => {
        if (!this.labels.includes(l)) {
          this.labels.push(l)
        }
      })
      this.labelInput = ''
    },
    deleteLabel (label) {
      this.labels.splice(this.labels.indexOf(label), 1)
    },
    validate () {
      this.errorMessage = undefined
      var errs = []
      if (!this.artist) errs.push('artist name')
      if (!this.passage) errs.push('bible passage')
      if (!this.version) errs.push('bible version')
      if (errs.length) {
        this.errorMessage = `You must provide: ${errs.join(', ')}`
        return false
      }
      this.errorMessage = undefined
      return true
    },
    save () {
      if (this.validate()) {
        const self = this
        const updated = {
          passage: this.passage,
          version: this.version,
          title: this.title,
          artist: this.artist,
          featuredArtists: this.featuredArtists || '',
          releaseDate: this.releaseDate,
          labels: this.labels
        }
        this.showLoading()
        server.updateSong(this.song, updated)
        .then(response => {
          self.hideLoading()
          self.updateSong(response)
          .then(updateSong => {
            self.showRightView(SongDetail, {song: updateSong})
          })
          .catch(e => {
            self.showRightView(undefined)
          })
        })
        .catch(e => {
          self.hideLoading()
        })
      }
    }
  },
  mounted () {
    this.passage = this.song.passage
    this.version = {...this.song.bible_version}
    this.title = this.song.title
    this.artist = this.song.artist
    this.featuredArtists = this.song.featuredArtists
    this.releaseDate = this.song.releaseDate
    this.labels = [...this.song.labels]
  }
}
</script>

<style lang="less" scoped>
.edit-song {
}
.labels {
  padding: 0 10px;
  .song-label {
    margin: 3px;
    display: inline-block;
    padding: 3px 5px;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    svg {
      margin-right: 3px;
    }
  }
}
</style>
