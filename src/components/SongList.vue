<template>
  <div class="song-list flex-column vfull">
    <div class="search-wrapper small-pad expandable" :class="{apply: showSearch}">
      <input v-model="searchTerm" id="search-input" class="input theme-mid shadow" placeholder="search" />
      <button class="search-clear small-pad clear" @click="clearSearch">
        <i class="fa-inverse fas fa-times muted" data-fa-transform="shrink-3"></i>
      </button>
    </div>

    <div v-if="filter" class="small-pad">
      <div class="theme-back-text small-pad flex-row align-center rounded">
        <p class="font-small small-pad">{{visibleSongs.length}}</p>
        <div class="flex-one font-large">{{ filterLabel }}</div>
        <a @click="setFilter(undefined)" class="callout alt nopad marginl">show all</a>
      </div>
    </div>

    <div v-if="showSongs" class="songs flex-one scrolly bottompad">
      <song-item v-for="(song, i) in visibleSongs" :song="song" :key="i"></song-item>
    </div>

    <div v-if="!showSongs" class="book-selector flex-one scrolly">
      <div class="flex-row flex-center marginb">
        <div class="categories theme-back-text pointer">
          <div @click="category = 'books'" :class="{callout: category === 'books'}" class="pad rounded">Bible books</div>
          <div @click="category = 'artists'" :class="{callout: category === 'artists'}" class="pad rounded">Artists</div>
        </div>
      </div>

      <div v-if="category === 'books'" class="flex-row flex-wrap flex-center">
        <div v-for="(title, book) in bookNames" v-if="songsByBook[book]" @click="bookSelected(book)" class="book theme-mid circle shadow-long">
          <div class="book-image vfull callout flex-column" :style="{'background-image': bookImage(book)}">
            <div class="flex-one flex-column flex-center">
              <p class="count-label text-center font-large">{{songsByBook[book]}}</p>
              <p class="text-center">song{{songsByBook[book] > 1 ? 's' : ''}}</p>
            </div>
            <p class="book-label theme-mid shadow text-center">{{ title }}</p>
          </div>
        </div>
      </div>

      <div v-if="category === 'artists'" class="small-pad">
        <div v-for="artist in songsByArtist" @click="artistSelected(artist[0])" class="flex-row align-center theme-mid phaser">
          <div class="emblem theme-back">
            <p class="emblem-label z2 cover">{{ artist[1] }}</p>
          </div>
          <p class="flex-one">{{ artist[0] }}</p>
          <p class="muted alt font-small">{{ artist[1] }} songs</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Menu from './Menu'
import SongItem from './SongItem'
import server from '@/services/true-songs-service'
import bookNames from '@/helpers/osis_names.json'
import bookImages from '@/helpers/book_images.json'
import bibleParser from '@/helpers/bible-parser'

export default {
  name: 'SongList',
  data () {
    return {
      category: 'books',
      selectedBook: undefined,
      showSearch: false,
      searchTerm: undefined
    }
  },
  computed: {
    ...mapGetters(['allSongs', 'songs', 'user', 'filter']),
    bookNames () {
      return bookNames
    },
    showSongs () {
      return this.songs.length && (this.songs.length <= 30 || this.filter)
    },
    songsByBook () {
      var books = {}
      this.allSongs.forEach(s => {
        books[s.book] = (books[s.book] || 0) + 1
      })
      return books
    },
    songsByArtist () {
      var artists = {}
      this.allSongs.forEach(s => {
        artists[s.artist] = (artists[s.artist] || 0) + 1
      })
      return Object.entries(artists)
    },
    visibleSongs () {
      var filteredSongs = this.songs
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
        case 'book': return `Song${this.visibleSongs.length > 1 ? 's' : ''} from ${this.bookNames[this.filter.value]}`
        case 'artist': return `Song${this.visibleSongs.length > 1 ? 's' : ''} by ${this.filter.value}`
        case 'user': return 'Songs uploaded by me'
        default: return undefined
      }
    }
  },
  components: { SongItem },
  methods: {
    ...mapActions(['setAllSongs', 'setSongs', 'configureTitlebar', 'setFilter']),
    bookSelected (osisBook) {
      this.setFilter({key: 'book', value: osisBook})
    },
    artistSelected (artist) {
      this.setFilter({key: 'artist', value: artist})
    },
    bookImage (book) {
      return bookImages[book]
    },
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
      self.setAllSongs(songs)
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
.fa-music {
  margin-right: 5px;
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
.book-selector {
  padding-bottom: 100px;
  .phaser {
    padding: 3px 10px;
    margin-bottom: 2px;
    border-top-left-radius: 30px;
    border-bottom-left-radius: 30px;
    min-height: 44px;
    .emblem {
      position: relative;
      height: 31px;
      width: 31px;
      text-align: center;
      border-radius: 50px;
      margin-right: 8px;
      margin-bottom: 1px;
      .emblem-label {
        margin: 0;
        padding-top: 5px;
      }
    }
  }
  .categories {
    display: inline-block;
    margin-left: auto;
    margin-right: auto;
    & > * {
      display: inline-block;
      padding: 10px;
    }
  }
  .book {
    position: relative;
    width: 100px;
    height: 100px;
    margin: 5px;
    .book-image {
      position: absolute;
      top: 5px;
      left: 5px;
      right: 5px;
      height: 90px;
      border-radius: 100%;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
    }
    .book-label {
      border-radius: 2px;
      margin-bottom: -8px;
      margin-left: -3px;
      margin-right: -3px;
      padding: 0 3px;
    }
    .count-label {
      color: white;
      text-shadow: 0px 0px 5px black;
    }
  }
  .label {
    padding: 15px 5px;
    padding-bottom: 0px;
    font-weight: bold;
  }
}
</style>
