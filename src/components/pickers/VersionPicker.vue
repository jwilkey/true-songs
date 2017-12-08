<template>
  <div class="version-picker">
    <div class="flex-row flex-center rounded">
      <button v-if="this.osis" @click="finished" class="float-btn shadow back-green"><i class="fa fa-check"></i></button>
      <input class="input theme-mid shadow" v-model="filter" placeholder="Bible passage"/>
      <button class="back-red float-btn" @click="startInput(undefined)"><i class="fa fa-close"></i></button>
    </div>
    
    <div v-for="(versions, language, i) in translations" v-if="filtered(language, versions).length" class="language-group flex-column marginb">
      <p class="language marginb font-large">{{language}}</p>
      <div class="flex-row flex-wrap flex-center">
        <button v-for="version in filtered(language, versions)" @click="selected(version)" class="float-btn">{{version}}</button>
      </div>
    </div>
  </div>
</template>

<script>
import translationData from '../../../static/json/translations.json'

export default {
  name: 'VersionPicker',
  data () {
    return {
      selection: undefined
    }
  },
  props: ['filter', 'onSelect'],
  computed: {
    translations () {
      return translationData
    }
  },
  methods: {
    filtered (title, array) {
      const f = this.filter.toLowerCase()
      return array.filter(i => title.toLowerCase().includes(f) || i.toLowerCase().includes(f))
    },
    selected (version) {
      this.selection = version
      if (this.onSelect) {
        this.onSelect(version)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.language-group {
  padding: 5px;
}
.language {
  text-align: center;
}
</style>
