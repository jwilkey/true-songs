export default {
  methods: {
    play () {
      this.$root.$children[0].$refs.playback.playCurrentSong()
    }
  }
}
