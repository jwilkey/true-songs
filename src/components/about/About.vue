<template>
  <div class="about-true-songs pad">
    <div class="theme-mid rounded pad shadow">
      <h3>About True Songs</h3>
      <p>Our passion is to encourage everyone to ‘taste and see that the LORD is good’ (Psalm 34:8) through the power of His Word.</p>
	  <br>
	  <p>Our mission is to provide a platform to harness the talents and service of God’s children to create a place where the entire Word of God can be heard through the power and beauty of the music He has given us.</p>
	  <br>
	  <p><b>Share your music! &#9833;&#9834;&#9835;&#9836;&nbsp;&nbsp;</b>Click <a @click="addSong"><b>here</b></a> to upload your Scripture songs.</p>

	  <br>
	  <br>

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
    ...mapActions(['setTitlebarRightItems']),
    addSong () {
      this.$router.push('/add_song')
    }
  },
  mounted () {
    const self = this
    this.setTitlebarRightItems([{template: 'Home', action: () => { self.$router.push('/') }}])
  }
}
</script>

<style lang="less" scoped>
.about-true-songs {
}
</style>
