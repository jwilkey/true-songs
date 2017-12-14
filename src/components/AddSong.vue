<template>
  <div class="add-song pad vfull flex-column">
    <transition name="fade">
      <div v-if="showInput" class="super-input flex-column pad nopad-top">
        <artist-picker v-if="field === 'artist'" class="flex-one substance" :filter="input" :on-select="artistSelected"></artist-picker>
        <passage-picker v-if="field === 'passage'" class="flex-one substance" :filter="input" :on-select="passageSelected" :on-change="passageChanged"></passage-picker>
        <version-picker v-if="field === 'version'" class="flex-one substance" :filter="input" :on-select="versionSelected"></version-picker>
      </div>
    </transition>

    <div class="distance flex-one" :class="{apply: showInput}">
      <div class="theme-mid pad marginb shadow bullet">
        <h3>Add a new song</h3>
      </div>
      <form method="POST" :class="{blur: isUploading}" enctype="multipart/form-data" @submit.prevent="submit">
        <div class="theme-mid pad shadow marginb">
          <div class="flex-row marginb">
            <p class="flex-one edit-item" @click="startInput('artist')">
              {{artist}}<span v-if="!artist" class="muted i">Artist name</span>
            </p>
            <p class="flex-one edit-item" @click="startInput('passage')">
              {{normalizedPassage}}<span v-if="!passage" class="muted i">Scripture passage</span>
            </p>
            <p class="flex-one edit-item" @click="startInput('version')">
              {{versionLabel}}<span v-if="!version" class="muted i">Bible version</span>
            </p>
          </div>

          <div class="file-container">
            <vue-dropzone  ref="dropzone" id="song-file"
            :options="dropzoneOptions"
            v-on:vdropzone-file-added="fileChanged"
            :class="{'has-file': file}"
            class="pad text-center shadow-inset callout alt rounded marginb"></vue-dropzone>
          </div>

          <p v-if="errorMessage" class="red text-center"><i class="fas fa-star"></i> {{errorMessage}}</p>

          <hr />

          <div class="optional">
            <p class="subtitle marginb">OPTIONAL</p>
            <input
            @keydown.prevent.comma="labelsChanged"
            @keydown.prevent.semicolon="labelsChanged"
            @keydown.prevent.enter="labelsChanged"
            v-model="labelInput" class="input" placeholder="labels" />
            <div class="labels">
              <p v-for="label in labels" @click="deleteLabel(label)" class="song-label back-red shadow"><i class="fas fa-times"></i> {{label}}</p>
            </div>
          </div>
        </div>

        <div class="text-center pad">
          <button class="marginb float-btn">Publish Song</button>
        </div>
      </form>
    </div>

    <div class="text-center user-info theme-back-text flex-row align-center flex-center distance" :class="{apply: showInput}">
      <img :src="user.image" class="rounded shadow" /> <span>{{user.name}}</span>
    </div>

    <div v-if="isUploading" class="center-box">
      <div> <div class="spinner large fa-spin"></div> </div>
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

export default {
  name: 'AddSong',
  data () {
    return {
      input: '',
      showInput: false,
      field: undefined,
      artist: undefined,
      passage: undefined,
      version: undefined,
      file: undefined,
      dropzoneOptions: {
        url: 'https://truewordsapp.com',
        thumbnailWidth: 150,
        maxFilesize: 15,
        autoProcessQueue: false,
        dictDefaultMessage: '<i class="fas fa-cloud-upload-alt"></i> &nbsp;Add song file'
      },
      labelInput: undefined,
      labels: [],
      isUploading: false,
      errorMessage: undefined
    }
  },
  computed: {
    ...mapGetters(['user']),
    normalizedPassage () {
      return bibleParser.normalize(this.passage)
    },
    versionLabel () {
      return this.version ? `${this.version.versionCode} - ${this.version.title}` : undefined
    },
    placeholder () {
      switch (this.field) {
        case 'artist': return 'Artist name'
        case 'passage': return 'Scripture passage'
        case 'version': return 'Bible version'
        default: return ''
      }
    }
  },
  components: { ArtistPicker, VersionPicker, PassagePicker, vueDropzone: vue2Dropzone },
  methods: {
    ...mapActions(['configureTitlebar']),
    passageChanged (passage) {
      this.input = passage
    },
    versionSelected (version) {
      this.version = version
      this.startInput(undefined)
    },
    passageSelected (passage) {
      this.passage = passage
      this.startInput(undefined)
    },
    artistSelected (artist) {
      this.artist = artist
      this.startInput(undefined)
    },
    startInput (field) {
      this.field = field
      this.showInput = field !== undefined
      if (!this.field) {
        this.input = ''
      }
    },
    fileChanged (file) {
      if (file) {
        if (this.file) {
          this.$refs.dropzone.removeFile(this.file)
        }
        this.file = file
        this.$set(this.dropzoneOptions, 'dictDefaultMessage', '')
      }
    },
    labelsChanged (e) {
      var lbls = this.labelInput.split(',').map(l => l.trim())
      lbls.forEach(l => {
        if (!this.labels.includes(l)) {
          this.labels.push(l)
        }
      })
      e.target.value = ''
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
      if (!this.file) errs.push('song file')
      if (errs.length) {
        this.errorMessage = `You must provide: ${errs.join(', ')}`
        return false
      }
      return true
    },
    submit (event) {
      if (!this.validate()) {
        return
      }
      const self = this
      var data = new FormData()
      data.append('artist', this.artist)
      data.append('user', this.user.id)
      data.append('passage', this.passage)
      data.append('version', JSON.stringify(this.version))
      data.append('labels', JSON.stringify(this.labels))
      data.append('songData', this.file)

      self.isUploading = true
      server.createSong(data, this.artist)
      .then(response => {
        self.errorMessage = undefined
        self.isUploading = false
        self.$router.push('/')
      })
      .catch(err => {
        self.isUploading = false
        self.errorMessage = `Error uploading song: ${err}`
      })
    },
    cancelAddSong () {
      this.$router.replace('/')
    }
  },
  mounted () {
    this.configureTitlebar({'CANCEL': this.cancelAddSong})
  }
}
</script>

<style lang="less">
#song-file {
  background-color: #d1d1d1;
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
      background-image: url('../../static/images/meter.png');
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
  z-index: 500;
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
  padding: 0 10px;
}
#song-file {
  margin-top: 20px;
}
.add-song {
  position: relative;
  h3 {
    margin: 0;
  }
  form {
    .edit-item {
      margin: 0 10px;
    }
  }
  .progress {
    height: 20px;
  }
}
.bullet {
  border-top-right-radius: 30px;
}
.user-info {
  img {
    height: 20px;
    margin-right: 10px;
  }
}
</style>
