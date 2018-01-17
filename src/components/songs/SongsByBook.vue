<template>
  <div class="songs-by-book books flex-row flex-wrap flex-center">
    <div @click="addSong" class="tile flex-column relative">
      <div class="pad-10">
        <div class="icon-wrapper theme-mid shadow flex-column flex-center">
          <p class="text-center callout alt"><i class="fas fa-invert fa-plus fa-3x"></i></p>
        </div>
      </div>
      <p class="book-label z2 theme-back-text text-center">Add songs</p>
    </div>

    <div v-for="(title, book) in bookNames" v-if="songsByBook[book]" @click="bookSelected(book)" class="tile theme-mid glass shadow flex-column relative">
      <div class="pad-10">
        <div class="icon-wrapper theme-mid shadow-inset flex-column flex-center">
          <p class="book-icon text-center callout alt font-larger">{{bookImage(book)}}</p>
        </div>
      </div>
      <p class="book-label z2 text-center callout alt">{{ title }}</p>
      <div class="z3 font-small"><p class="count-label callout alt pull-right">{{songsByBook[book]}}</p></div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import bookNames from '@/helpers/osis_names.json'
import bookImages from '@/helpers/book_images.json'

export default {
  name: 'songs-by-book',
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters(['allSongs']),
    bookNames () {
      return bookNames
    },
    songsByBook () {
      var books = {}
      this.allSongs.forEach(s => {
        books[s.book] = (books[s.book] || 0) + 1
      })
      return books
    }
  },
  methods: {
    ...mapActions(['setFilter']),
    bookSelected (osisBook) {
      this.setFilter({key: 'book', value: osisBook})
    },
    bookImage (book) {
      return bookImages[book]
    },
    addSong () {
      this.$router.push('/add_song')
    }
  }
}
</script>

<style lang="less" scoped>
.songs-by-book {
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}
.tile {
  margin: 5px 3px;
  cursor: pointer;
  border-radius: 2px;
  width: 113px;
  .pad-10 {
    padding: 10px;
  }
  .icon-wrapper {
    border-radius: 100%;
    overflow: hidden;
    width: 93px;
    height: 93px;
    &.action {
      background: linear-gradient(45deg, #003344, #24508f);
      color: #eee;
    }
  }
  .book-icon {
    font-size: 50px;
  }
  .book-label {
    padding-bottom: 10px;
  }
  .count-label {
    position: absolute;
    top: 2px;
    right: 3px;
  }
}
</style>
