<template>
  <div class="add-song pad vfull flex-column">
    <transition name="fade">
      <div v-if="showInput" class="super-input z5 flex-column pad nopad-top">
        <artist-picker v-if="field === 'artist'" class="flex-one substance" :input="input" :on-select="artistSelected"></artist-picker>
        <passage-picker v-if="field === 'passage'" class="flex-one substance" :input="input" :on-select="passageSelected" :on-change="passageChanged"></passage-picker>
        <version-picker v-if="field === 'version'" class="flex-one substance" :input="input" :on-select="versionSelected"></version-picker>
      </div>
    </transition>

    <div class="distance flex-one small-pad scrolly" :class="{apply: showInput}">
      <div class="theme-mid pad marginb shadow bullet">
        <h3>Publish songs</h3>
    </div>

      <div class="file-container theme-mid rounded marginb">
        <vue-dropzone  ref="dropzone" id="song-file"
        :options="dropzoneOptions"
        v-on:vdropzone-file-added="fileChanged"
        :class="{'has-file': songUploads.length}"
        class="theme-mid pad text-center shadow-inset callout alt rounded"></vue-dropzone>
      </div>

	  <div class="text-center pad">
        <p class="theme-back-text margint">Please confirm that your uploads conform to our <a @click="showGuidelines">guidelines</a>.</p>
      </div>

      <form v-for="(upload, i) in songUploads">
        <div class="theme-mid pad shadow marginb rounded">
          <div class="marginb small-pad rounded flex-row align-center" :class="uploadHeaderClass(upload)">
            <p class="flex-one">{{upload.file.name}}</p>
            <div @click="removeSong(upload, i)" class="small-pad pointer"><i class="fas fa-times"></i></div>
          </div>

          <div v-if="!upload.isUploaded" class="row-large">
            <div>
              <p class="subtitle small-pad">REQUIRED</p>
              <div class="conditional-row align-center marginb">
                <div class="flex-row align-center">
                  <p class="flex-one input simple" @click="startInput('artist', upload.artist, upload)">
                    {{upload.artist}}<span v-if="!upload.artist" class="muted i">Artist name</span>
                  </p>
                  <div v-if="manyUploads && upload.artist" @click="setAllArtist(upload.artist)" class="marginl">
                    <i class="fas fa-copy green"></i>
                  </div>
                </div>
                <div>
                  <p class="input simple" @click="startInput('passage', upload.passage, upload)">
                    {{normalizedPassage(upload.passage)}}<span v-if="!upload.passage" class="muted i">Bible passage</span>
                  </p>
                </div>
                <div class="flex-row align-center">
                  <p class="flex-one input simple" @click="startInput('version', upload.version, upload)">
                    {{versionLabel(upload)}}<span v-if="!upload.version" class="muted i">Bible version</span>
                  </p>
                  <div v-if="manyUploads && upload.version" @click="setAllVersions(upload.version)" class="marginl">
                    <i class="fas fa-copy green"></i>
                  </div>
                </div>
              </div>
            </div>

            <div class="hi-left">
              <p class="subtitle small-pad">OPTIONAL</p>
              <div class="conditional-row">
                <div class="flex-column marginb">
                  <div class="flex-row align-center">
                    <input
                    @keydown.prevent.comma="labelsChanged(upload)"
                    @keydown.prevent.semicolon="labelsChanged(upload)"
                    @keydown.prevent.enter="labelsChanged(upload)"
                    v-model="upload.labelInput" class="input simple" placeholder="labels" />
                    <div v-if="manyUploads && upload.labels.length" @click="setAllLabels(upload.labels)" class="marginl">
                      <i class="fas fa-copy green"></i>
                    </div>
                  </div>
                  <div v-if="upload.labels.length" class="labels marginb">
                    <p v-for="label in upload.labels" @click="deleteLabel(label, upload)" class="song-label back-red shadow"><i class="fas fa-times"></i> {{label}}</p>
                  </div>
                </div>
                <div class="marginb">
                  <input v-model="upload.title" class="input simple" placeholder="song title" />
                </div>
                <div class="flex-row align-center">
                  <datepicker format="MMM.dd.yyyy" v-model="upload.releaseDate" input-class="input simple" placeholder="release date"></datepicker>
                </div>
                 <div>
                  <div class="flex-row align-center">
                    <input v-model="upload.featuredArtists" class="input simple" placeholder="featured artists" />
                    <div v-if="manyUploads && upload.featuredArtists" @click="setAllFeaturedArtists(upload.featuredArtists)" class="marginl">
                      <i class="fas fa-copy green"></i>
                    </div>
                  </div>
                </div>
               </div>
            </div>
          </div>

          <p v-if="upload.errorMessage" class="red text-center"><i class="fas fa-exclamation-circle"></i> {{upload.errorMessage}}</p>
        </div>
      </form>

      <div v-if="songUploads.length" class="text-center pad">
        <button @click="uploadSongs" :disabled="publishDisabled" class="marginb float-btn">Publish Song{{manyUploads ? 's' : ''}}</button>
        <p class="theme-back-text margint">By publishing songs you agree to the service <a @click="showTerms">terms</a>.</p>
      </div>
    </div>

    <div class="text-center user-info margint theme-back-text flex-row align-center flex-center distance" :class="{apply: showInput}">
      <img :src="user.image" class="circle shadow" /> <span>{{user.name}}</span>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import ArtistPicker from '@/components/pickers/ArtistPicker'
import VersionPicker from '@/components/pickers/VersionPicker'
import PassagePicker from '@/components/pickers/PassagePicker'
import server from '../services/true-songs-service'
import bibleParser from '../helpers/bible-parser'
import vue2Dropzone from 'vue2-dropzone'
import Terms from '@/components/views/Terms'
import Guidelines from '@/components/views/Guidelines'
import Datepicker from 'vuejs-datepicker'

function SongUpload (file, passage) {
  this.input = ''
  this.artist = undefined
  this.passage = passage
  this.version = undefined
  this.file = file
  this.labelInput = undefined
  this.labels = []
  this.title = undefined
  this.featuredArtists = undefined
  this.releaseDate = undefined
  this.errorMessage = undefined
  this.isUploaded = false
}

export default {
  name: 'AddSong',
  data () {
    return {
      songUploads: [],
      showInput: false,
      field: undefined,
      input: undefined,
      editingUpload: undefined,
      dropzoneOptions: {
        url: 'https://truewordsapp.com',
        thumbnailWidth: 150,
        maxFilesize: 20,
        autoProcessQueue: false,
        dictDefaultMessage: '<i class="fas fa-cloud-upload-alt"></i> &nbsp;Add song files'
      }
    }
  },
  computed: {
    ...mapGetters(['user']),
    manyUploads () {
      return this.songUploads.length > 1
    },
    publishDisabled () {
      return !this.songUploads.length || !this.songUploads.find(su => !su.isUploaded) || this.songUploads.find(su => su.isUploading)
    }
  },
  components: { ArtistPicker, VersionPicker, PassagePicker, vueDropzone: vue2Dropzone, Datepicker },
  methods: {
    ...mapActions(['setTitlebarRightItems']),
    uploadHeaderClass (upload) {
      return upload.isUploaded
      ? ['back-green']
      : upload.isUploading
      ? ['callout', 'pulse']
      : ['callout']
    },
    normalizedPassage (passage) {
      return bibleParser.normalize(passage)
    },
    versionLabel (upload) {
      return upload.version ? upload.version.versionCode : undefined
    },
    passageChanged (passage) {
      this.input = passage
    },
    versionSelected (version) {
      this.editingUpload.version = version
      this.startInput(undefined)
    },
    passageSelected (passage) {
      this.editingUpload.passage = passage
      this.startInput(undefined)
    },
    artistSelected (artist) {
      this.editingUpload.artist = artist
      this.startInput(undefined)
    },
    setAllArtist (artist) {
      this.songUploads.forEach(su => { su.artist = artist })
    },
    setAllVersions (version) {
      this.songUploads.forEach(su => { su.version = version })
    },
    setAllLabels (labels) {
      this.songUploads.forEach(su => { su.labels = [...labels] })
    },
    setAllFeaturedArtists (artists) {
      this.songUploads.forEach(su => { su.featuredArtists = artists })
    },
    startInput (field, input, upload) {
      this.field = field
      this.input = input
      this.editingUpload = upload
      this.showInput = field !== undefined
      if (!this.field) {
        this.input = ''
      }
    },
    fileChanged (file) {
      this.songUploads.push(new SongUpload(file, bibleParser.osis(file.name.replace('_', ' '))))
    },
    labelsChanged (songUpload) {
      var lbls = songUpload.labelInput.split(',').map(l => l.trim())
      lbls.forEach(l => {
        if (!songUpload.labels.includes(l)) {
          songUpload.labels.push(l)
        }
      })
      songUpload.labelInput = ''
    },
    deleteLabel (label, upload) {
      upload.labels.splice(upload.labels.indexOf(label), 1)
    },
    removeSong (songUpload, index) {
      this.$refs.dropzone.removeFile(songUpload.file)
      this.songUploads.splice(index, 1)
    },
    validate (upload) {
      upload.errorMessage = undefined
      var errs = []
      if (!upload.artist) errs.push('artist name')
      if (!upload.passage) errs.push('bible passage')
      if (!upload.version) errs.push('bible version')
      if (!upload.file) errs.push('song file')
      if (errs.length) {
        upload.errorMessage = `You must provide: ${errs.join(', ')}`
        return false
      }
      upload.errorMessage = undefined
      return true
    },
    uploadSongs () {
      var upload = this.songUploads.find(su => !su.isUploaded && !su.isUploading && this.validate(su))
      if (!upload) {
        return
      }

      var data = new FormData()
      data.append('artist', upload.artist)
      data.append('user', this.user.id)
      data.append('passage', upload.passage)
      data.append('version', JSON.stringify(upload.version))
      data.append('labels', JSON.stringify(upload.labels))
      if (upload.releaseDate) { data.append('releaseDate', this.formatDate(upload.releaseDate)) }
      if (upload.title) { data.append('title', upload.title) }
      if (upload.featuredArtists) { data.append('featuredArtists', upload.featuredArtists) }
      data.append('songData', upload.file)

      const self = this
      this.$set(upload, 'isUploading', true)
      server.createSong(data, upload.artist)
      .then(response => {
        self.$set(upload, 'isUploading', false)
        upload.isUploaded = true
        upload.errorMessage = undefined
        self.uploadSongs()
      })
      .catch(err => {
        upload.isUploading = false
        upload.errorMessage = `Error uploading song: ${err}`
      })
    },
    showTerms () {
      this.alert(Terms, {close: this.dismissAlert})
    },
    showGuidelines () {
      this.alert(Guidelines, {close: this.dismissAlert})
    },
    cancelAddSong () {
      this.$router.replace('/')
    },
    formatDate (date) {
      let strDate = date.toDateString()
      let parts = strDate.split(' ')
      return parts[1] + '.' + parts[2] + '.' + parts[3]
    }
  },
  mounted () {
    this.setTitlebarRightItems([{template: 'DONE', action: this.cancelAddSong}])
  }
}
</script>

<style lang="less">
.dz-file-preview {
  border: dashed 1px #999;
  padding: 5px;
  border-radius: 5px;
  display: inline-block;
  margin: 8px;
}
#song-file {
  .dz-success-mark, .dz-error-mark {
    display: none;
  }
  &.has-file {
    .dz-message {
      display: none;
    }
    .dz-image {
      height: 20px;
      width: 20px;
      background-image: url('../assets/images/meter.png');
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
      margin-left: auto;
      margin-right: auto;
      margin-bottom: 3px;
    }
  }
}
</style>
<style lang="less">
.super-input {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  input {
    margin-right: 15px;
    margin-bottom: 0;
  }
  button {
    margin-bottom: 5px;
  }
  .substance {
    padding-bottom: 10px;
  }
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
.file-container {
}
#song-file {
}
.add-song {
  position: relative;
  h3 {
    margin: 0;
  }
  .progress {
    height: 20px;
  }
}
.bullet {
  border-top-right-radius: 30px;
}
.conditional-row > * {
  margin: 0 8px;
}
.user-info {
  img {
    height: 20px;
    margin-right: 10px;
  }
}
</style>
