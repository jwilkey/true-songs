<template>
  <div class="artist-picker text-center flex-column">
    <div class="flex-one">
      <div class="flex-row flex-center rounded">
        <button v-if="filter" @click="onSelect(filter)" class="float-btn shadow back-green"><i class="fas fa-check"></i></button>
        <input @keyup.enter="onSelect(filter)" class="input theme-mid shadow" v-model="filter" placeholder="Artist name" autofocus />
        <button class="back-red float-btn" @click="onSelect(undefined)"><i class="fas fa-times"></i></button>
      </div>
    </div>

    <div class="text-right">
      <button v-if="filter" class="float-btn back-green" @click="onSelect(filter)">Finished</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ArtistPicker',
  data () {
    return {
      filter: ''
    }
  },
  props: ['onSelect'],
  mounted () {
    this.$nextTick(() => {
      this.$el.querySelector('input').focus()
    })
  }
}
</script>

<style lang="less" scoped>
.artist-picker {
  input {
    margin: 0 5px;
  }
}
</style>
