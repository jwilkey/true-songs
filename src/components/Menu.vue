<template>
  <div class="menu flex-column relative">
    <div class="substance">
      <profile class="marginb"></profile>
      <display-options class="marginb"></display-options>

      <div class="spacer"></div>

      <div v-if="user" @click="logout" class="pad mid-bottom pointer">
        <span class="fa-layers fa-fw marginr">
          <i class="fas fa-circle" data-fa-transform="grow-3"></i>
          <i class="fa-inverse fas fa-sign-out-alt alt" data-fa-transform="shrink-3"></i>
        </span>
        Log out
      </div>
    </div>

    <div class="flex-one"></div>

    <div @click="aboutTrueSongs" class="pad text-center marginb pointer">
      <span class="fa-layers fa-fw marginr">
        <i class="fas fa-circle" data-fa-transform="grow-3"></i>
        <i class="fa-inverse fas fa-info alt" data-fa-transform="shrink-3"></i>
      </span>
      About True Songs
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import DisplayOptions from '@/components/menu/DisplayOptions'
import Profile from '@/components/menu/Profile'
import server from '@/services/true-songs-service'

export default {
  name: 'Menu',
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters(['user'])
  },
  components: { Profile, DisplayOptions },
  methods: {
    ...mapActions(['setUser']),
    logout () {
      const self = this
      server.logout()
      .then(r => {
        self.setUser(undefined)
        self.$router.replace('/')
        self.showRightView(undefined)
      })
      .catch(() => {
        self.alert('Failed to log out. Please try again.', {'Ok': self.dismissAlert})
      })
    },
    aboutTrueSongs () {
      this.$router.push('/about')
      this.showRightView(undefined)
    }
  }
}
</script>

<style lang="less" scoped>
.menu {
  .menu-buttons {
    button {
      border-radius: 0px;
      margin: 1px;
    }
  }
}
.spacer {
  height: 40px;
}
</style>
