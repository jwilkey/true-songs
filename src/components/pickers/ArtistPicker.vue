<template>
  <div class="artist-picker text-center flex-column">
    <div class="flex-one">
      <div class="flex-row flex-center rounded">
        <div class="flex-row align-center input theme-mid shadow rounded">
          <input @keyup.enter="onSelect(filter)" v-model="filter" placeholder="Artist name" autofocus />
          <button class="clear muted" @click="clear"><i class="fas fa-times"></i></button>
        </div>
      </div>
      <div class="text-right margint">
        <button class="back-red float-btn" @click="cancel">cancel</button>
        <transition name="fade">
          <button v-if="filter" @click="onSelect(filter)" class="float-btn shadow back-green"><i class="fas fa-check"></i> Finished</button>
        </transition>
      </div>
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
  props: ['input', 'onSelect'],
  methods: {
    clear () {
      this.filter = undefined
      this.$el.querySelector('input').focus()
    },
    cancel () {
      this.onSelect(this.input)
    }
  },
  mounted () {
    this.filter = this.input
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
    border: none;
  }
  .clear {
    box-shadow: none;
  }
}
</style>
