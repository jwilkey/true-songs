<template>
  <div class="titlebar theme-mid flex-row">
    <p class="flex-one">{{title}}</p>
    <a v-for="(action, display) in titlebar" @click.prevent="action" v-html="display"></a>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Titlebar',
  data () {
    return {
      title: 'True Songs'
    }
  },
  computed: {
    ...mapGetters(['titlebar'])
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
