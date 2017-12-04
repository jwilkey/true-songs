<template>
  <div class="add-song pad">
    <div class="theme-mid pad marginb shadow">
      <h3>Add a new song</h3>
    </div>
    <form :action="postUrl" method="POST" :class="{blur: isUploading}" enctype="multipart/form-data" @submit.prevent="submit">
      <div class="theme-mid pad shadow marginb">
        <input class="input marginb" name="artist" placeholder="Artist name" v-model="artist" required />

        <div class="passage-chooser marginb">
          <input @focusout="updatePassage" @focus="passageFocused" class="input" name="passage" placeholder="Scripture passage" v-model="passage" autocomplete="off" required />
          <p v-if="isEditingPassage" class="hint theme-hi muted shadow">{{normalizedPassage}}</p>
        </div>

        <input id="file" type="file" name="songData" />
      </div>

      <button class="callout-light marginb" :disabled="!artist || !passage">Publish Song</button>
      <p v-if="errorMessage" class="red">{{errorMessage}}</p>
    </form>

    <div v-if="isUploading" class="center-box">
      <i class="blue fa fa-circle-o-notch fa-spin fa-2x"></i>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import bibleParser from '../helpers/bible-parser'

export default {
  name: 'AddSong',
  data () {
    return {
      artist: undefined,
      passage: undefined,
      isEditingPassage: false,
      isUploading: false,
      errorMessage: undefined
    }
  },
  computed: {
    postUrl () {
      return `https://true-songs-server.herokuapp.com/songs/upload?artist=${this.artist}&`
    },
    osis () {
      return bibleParser.osis(this.passage)
    },
    normalizedPassage () {
      return bibleParser.normalize(this.passage)
    }
  },
  methods: {
    updatePassage () {
      this.isEditingPassage = false
      this.passage = this.normalizedPassage
    },
    passageFocused () {
      this.isEditingPassage = true
    },
    submit (event) {
      const self = this
      var data = new FormData()
      data.append('artist', this.artist)
      data.append('passage', this.osis)
      data.append('songData', document.getElementById('file').files[0])

      self.isUploading = true
      axios.post(this.postUrl, data)
      .then(response => {
        self.errorMessage = undefined
        self.isUploading = false
        self.$router.push('/')
      })
      .catch(err => {
        self.isUploading = false
        self.errorMessage = `Error uploading song: ${err}`
      })
    }
  }
}
</script>

<style lang="less">
.add-song {
  h3 {
    margin: 0;
  }
  .progress {
    height: 20px;
  }
  .passage-chooser {
    position: relative;
    .hint {
      position: absolute;
      left: 5px;
      padding: 5px;
      top: 100%;
    }
  }
}
</style>
