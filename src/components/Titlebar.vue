<template>
  <div class="titlebar theme-back-text flex-row align-center pad font-large">
    <div class="logo-box callout marginr flex-column flex-center">
      <img class="logo" src="../../static/images/logo.png" />
    </div>
    <p class="flex-one">{{title}}</p>
    <button v-for="(action, display) in titlebar" @click.prevent="action" v-html="display" class="titlebar-action theme-back-text"></button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Titlebar',
  data () {
    return {
      title: 'TRUE SONGS'
    }
  },
  computed: {
    ...mapGetters(['titlebar'])
  }
}
</script>

<style lang="less">
.titlebar {
  z-index: 100;
  overflow: visible;
  .logo-box {
    border-radius: 15px;
    padding: 2px;
    transform: scale(1.3);
  }
  .logo {
    height: 25px;
    filter: invert();
    transform: translateX(1px);
  }
  .titlebar-action {
    padding: 4px 10px;
    border-radius: 30px;
    margin-left: 10px;
    min-width: 40px;
  }
}
</style>
