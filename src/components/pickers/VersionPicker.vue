<template>
  <div class="version-picker">
    <div class="flex-row flex-center rounded">
      <input class="input theme-mid shadow" v-model="filter" placeholder="filter versions"/>
      <button class="back-red float-btn" @click="onSelect(undefined)"><i class="fas fa-times"></i></button>
    </div>

    <br />

    <div v-for="(versions, language, i) in translations" v-if="filtered(versions).length" class="language-group flex-column marginb">
      <p class="language marginb theme-back-text font-large">{{language}}</p>
      <div class="flex-row flex-wrap flex-center">
        <button v-for="version in filtered(versions)" @click="selected(version)" class="float-btn">{{version.versionCode}} - {{version.title}}</button>
      </div>
    </div>
  </div>
</template>

<script>
import server from '../../services/true-songs-service'

export default {
  name: 'VersionPicker',
  data () {
    return {
      filter: '',
      translations: [],
      selection: undefined
    }
  },
  props: ['onSelect'],
  methods: {
    filtered (versions) {
      const f = this.filter.toLowerCase()
      return versions.filter(i => i.language.toLowerCase().includes(f) || i.title.toLowerCase().includes(f) || i.versionCode.toLowerCase().includes(f))
    },
    selected (version) {
      this.selection = version
      if (this.onSelect) {
        this.onSelect(version)
      }
    }
  },
  mounted () {
    const self = this
    server.fetchBibles()
    .then(bibles => { self.translations = bibles })
  }
}
</script>

<style lang="less" scoped>
.version-picker {
  input {
    margin: 0 5px;
  }
}
.language-group {
  padding: 5px;
}
.language {
  text-align: center;
}
</style>
