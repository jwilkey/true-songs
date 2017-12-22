<template>
  <div>
    <div class="text-center user-info pad theme-back-text flex-row align-center flex-center">
      <img :src="user.image" class="circle shadow marginr" /> <span class="font-large">{{user.name}}</span>
    </div>

    <div v-if="!user" @click="login" class="pad mid-bottom pointer">
      <span class="fa-layers fa-fw marginr">
        <i class="fas fa-circle" data-fa-transform="grow-3"></i>
        <i class="fa-inverse fa-sign-in-alt" data-fa-transform="shrink-3"></i>
      </span>
      Sign in
    </div>
    <div @click="addSong" class="pad mid-bottom pointer">
      <span class="fa-layers fa-fw marginr">
        <i class="fas fa-circle" data-fa-transform="grow-3"></i>
        <i class="fa-inverse fas fa-plus alt" data-fa-transform="shrink-3"></i>
      </span>
      Add song
    </div>
    <div v-if="user" @click="viewUploads" class="pad pointer">
      <span class="fa-layers fa-fw marginr">
        <i class="fas fa-circle" data-fa-transform="grow-3"></i>
        <i class="fas fa-arrow-up alt" data-fa-transform="shrink-3"></i>
      </span>
      My uploads
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Profile',
  computed: {
    ...mapGetters(['user'])
  },
  methods: {
    addSong () {
      this.$router.push('/add_song')
      this.showRightView(undefined)
    },
    viewUploads () {
      this.showRightView(undefined)
    },
    login () {
      this.$router.push('/login')
      this.showRightView(undefined)
    }
  }
}
</script>

<style lang="less" scoped>
.user-info {
  img {
    height: 30px;
  }
}
</style>
