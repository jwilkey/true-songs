<template>
  <div class="titlebar theme-mid flex-row">
    <p class="flex-one">{{title}}</p>
    <a @click.prevent="addSong"><i class="fa fa-plus"></i></a>
  </div>
</template>

<script>
export default {
  name: 'Titlebar',
  data () {
    return {
      title: 'True Songs'
    }
  },
  methods: {
    addSong () {
      this.$router.push('/add_song')
    }
  }
}
</script>

<style lang="less">
.titlebar {
  padding: 10px;
  z-index: 100;
  overflow: visible;
}
</style>
