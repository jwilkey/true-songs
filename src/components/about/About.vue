<template>
  <div class="about-true-songs pad">
    <div class="theme-mid rounded pad shadow">
      <h3>About True Songs</h3>
      <p>True Songs is a music streaming app. Songs in this service are composed with Biblical Scriptures at the center.</p>

      <h3>Credits</h3>
      <p>Songs by book icons provided by Bogdan Rosu, Freepik, Smashicons, Eucalyp from <a href="https://www.flaticon.com" target="_blank">www.flaticon.com</a></p>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'about-true-songs',
  data () {
    return {
    }
  },
  methods: {
    ...mapActions(['configureTitlebar'])
  },
  mounted () {
    const self = this
    this.configureTitlebar({'Home': () => { self.$router.push('/') }})
  }
}
</script>

<style lang="less" scoped>
.about-true-songs {
}
</style>
