<template>
  <div class="song-list flex-column vfull">
    <div class="search-wrapper small-pad expandable" :class="{apply: showSearch}">
      <input v-model="searchTerm" id="search-input" class="input theme-mid shadow" placeholder="search" />
      <button class="search-clear small-pad clear" @click="clearSearch">
        <i class="fa-inverse fas fa-times muted" data-fa-transform="shrink-3"></i>
      </button>
    </div>

    <transition name="fade">
      <div v-if="filter" class="small-pad">
        <div class="theme-mid pad flex-row rounded shadow">
          <div class="flex-one"><span class="muted">Showing:</span> {{ filterLabel }}</div>
          <a @click="filter = undefined" class="callout alt nopad marginl">show all</a>
        </div>
      </div>
    </transition>

    <div class="songs flex-one scrolly bottompad">
      <song-item v-for="(song, i) in visibleSongs" :song="song" :key="i"></song-item>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Menu from './Menu'
import SongItem from './SongItem'
import server from '../services/true-songs-service'
import bibleParser from '../helpers/bible-parser'

export default {
  name: 'SongList',
  data () {
    return {
      showSearch: false,
      searchTerm: undefined,
      filter: undefined
    }
  },
  computed: {
    ...mapGetters(['songs', 'currentSong', 'user']),
    visibleSongs () {
      var filteredSongs = this.songs
      if (this.filter) {
        filteredSongs = filteredSongs.filter(s => s[this.filter.key] === this.filter.value)
      }
      if (this.searchTerm) {
        var osis = bibleParser.osis(this.searchTerm)
        if (osis && !this.searchTerm.match(/\d/)) {
          osis = osis.split('.')[0]
        }
        const search = this.searchTerm.toLowerCase().replace(' ', '')
        filteredSongs = filteredSongs
        .filter(s => s.search.indexOf(`|${search}`) > -1 || (osis && s.passage.startsWith(osis)))
      }
      return filteredSongs
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
    toggleSearch () {
      this.showSearch = !this.showSearch
      if (this.showSearch) {
        this.$nextTick(() => {
          this.$el.querySelector('#search-input').focus()
        })
      }
    },
    clearSearch () {
      this.searchTerm = ''
      this.$nextTick(() => {
        this.$el.querySelector('#search-input').focus()
      })
    },
    toggleMenu () {
      this.showRightView(Menu)
    },
    viewUploads () {
      this.filter = {key: 'user', value: this.user.id}
    }
  },
  mounted () {
    this.configureTitlebar({
      '<i class="fas fa-search"></i>': this.toggleSearch,
      '<i class="fa fa-ellipsis-v theme-back-text"></i>': this.toggleMenu
    })

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
    padding-right: 15px !important;
    button {
      padding: 4px 10px;
      border-radius: 30px;
      margin-left: 10px;
      min-width: 40px;
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
.search-wrapper {
  position: relative;
  .search-clear {
    position: absolute;
    right: 10px;
    top: 8px;
    box-shadow: none;
  }
}
.expandable {
  max-height: 0px;
  transform: scale(0);
  opacity: 0;
  transition: max-height 0.5s, transform 0.5s, opacity 0.5s, padding 0.5s;
  &:not(.apply) {
    padding: 0 !important;
  }
  &.apply {
    max-height: 100px;
    transform: scale(1);
    opacity: 1;
  }
}
</style>
