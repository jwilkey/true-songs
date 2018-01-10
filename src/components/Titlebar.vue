<template>
  <div class="titlebar z1 theme-back-text flex-row align-center pad font-large">
    <div @click="$router.push('/')" class="logo-box callout marginr shadow flex-column flex-center">
      <img class="logo" src="../../static/images/wavebar_padded.png" />
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
  overflow: visible;
  .logo-box {
    border-radius: 15px;
    padding: 3px;
    transform: scale(1.3);
    img {
      filter: invert();
    }
  }
  .logo {
    height: 22px;
  }
  .titlebar-action {
    padding: 4px 10px;
    border-radius: 30px;
    margin-left: 10px;
    min-width: 40px;
  }
}
</style>
