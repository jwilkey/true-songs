<template>
  <div class="you-version flex-column small-pad vfull">
    <p class="small-pad theme-back-text">Read the Bible from YouVersion.com:</p>
    <div class="flex-one relative mid-bottom scrolly">
      <iframe :src="bibleEmbedUrl" class="cover" height="100%" width="100%"></iframe>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'you-version',
  data () {
    return {
      passage: 'John.1',
      version: 'niv'
    }
  },
  computed: {
    versionNumber () {
      switch (this.version.toLowerCase()) {
        case 'niv': return 111
        case 'nkjv': return 114
        default: return 111
      }
    },
    bibleEmbedUrl () {
      const passage = this.passage.split('.').slice(0, 2).join('.')
      return `https://www.bible.com/bible/${this.versionNumber}/${passage}.${this.version}`
    }
  },
  methods: {
    ...mapActions(['setTitlebarRightItems']),
    closeBible () {
      this.$router.push('/')
    }
  },
  mounted () {
    this.setTitlebarRightItems({
      '<i class="fas fa-times"></i> CLOSE': this.closeBible
    })
    this.passage = this.$route.query.passage
    this.version = this.$route.query.version
  }
}
</script>

<style lang="less" scoped>
.you-version {
  iframe {
    border: none;
  }
}
</style>
