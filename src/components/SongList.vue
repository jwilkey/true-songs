<template>
  <div class="song-list flex-column vfull">
    <transition name="fade">
      <div v-if="showMenu" class="menu shadow-long pad marginb flex-row flex-center">
        <button @click="addSong" class="theme-back-text mid-right mid-left">
          <span class="fa-layers fa-fw">
            <i class="fas fa-circle callout alt" data-fa-transform="grow-3"></i>
            <i class="fa-inverse fas fa-plus" data-fa-transform="shrink-3"></i>
          </span>
          Add song
        </button>
        <button v-if="user" @click="viewUploads" class="theme-back-text mid-right mid-left">
          <span class="fa-layers fa-fw">
            <i class="fas fa-circle callout alt" data-fa-transform="grow-3"></i>
            <i class="fas fa-arrow-up" data-fa-transform="shrink-3"></i>
          </span>
          My uploads
        </button>
        <button v-if="!user" @click="login" class="theme-back-text mid-right mid-left"><i class="fas fa-sign-in-alt"></i> Sign in</button>
      </div>
    </transition>

    <div v-if="filter" class="theme-back-text pad">
      <span class="flex-one">{{ filterLabel }}</span>
      <button @click="filter = undefined" class="back-red nopad marginl"><i class="far fa-times-circle"></i></button>
    </div>

    <div class="songs flex-one scrolly bottompad">
      <song-item v-for="(song, i) in visibleSongs" :song="song" :key="i"></song-item>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import SongItem from './SongItem'
import server from '../services/true-songs-service'

export default {
  name: 'SongList',
  data () {
    return {
      filter: undefined,
      showMenu: false
    }
  },
  computed: {
    ...mapGetters(['songs', 'currentSong', 'user']),
    visibleSongs () {
      if (this.filter) {
        return this.songs.filter(s => s[this.filter.key] === this.filter.value)
      }
      return this.songs
    },
    filterLabel () {
      switch (this.filter.key) {
        case 'user': return 'Songs uploaded by me'
        default: return undefined
      }
    }
  },
  components: { SongItem },
  methods: {
    ...mapActions(['setSongs', 'configureTitlebar']),
    toggleMenu () {
      this.showMenu = !this.showMenu
    },
    addSong () {
      this.$router.push('/add_song')
    },
    viewUploads () {
      this.filter = {key: 'user', value: this.user.id}
      this.showMenu = false
    },
    login () {
      this.$router.push('/login')
    }
  },
  mounted () {
    window.r = this.$root
    this.configureTitlebar({'<i class="fa fa-ellipsis-v theme-back-text"></i>': this.toggleMenu})

    this.showLoading()
    const self = this
    server.fetchSongs()
    .then(songs => {
      self.setSongs(songs)
      self.hideLoading()
    })
    .catch(e => {
      self.hideLoading()
    })
  }
}
</script>

<style lang="less" scoped>
.song-list {
  .menu {
    button {
      background-color: transparent;
      margin: 0 7px;
      box-shadow: none;
    }
    i {
      text-shadow: 1px 0px 3px black;
    }
  }
  .songs {
    padding-top: 5px;
    padding-right: 0px;
    padding-left: 5px;
  }
}
</style>
