<template>
  <div class="passage-picker center text-center flex-column">
    <div class="flex-row flex-center rounded">
      <button v-if="this.osis" @click="finished" class="float-btn shadow back-green"><i class="fa fa-check"></i></button>
      <input class="input theme-mid shadow" v-model="filter" placeholder="Bible passage"/>
      <button class="back-red float-btn" @click="onSelect(undefined)"><i class="fa fa-close"></i></button>
    </div>

    <div class="flex-one substance">
      <div v-if="header" class="passage-bar shadow theme-mid flex-row flex-center align-center marginb">
        <a v-if="chapter" @click="chapterBack" class="pad"><i class="fa fa-chevron-left"></i></a>
        <div class="flex-one">
          <h2 class="pad">{{header}}</h2>
        </div>
        <a v-if="chapter" @click="chapterForward" class="pad"><i class="fa fa-chevron-right"></i></a>
      </div>

      <div v-if="showTestaments" class="flex-column flex-center testaments">
        <button class="center" @click="setTestament('OT')">OLD TESTAMENT</button>
        <button class="center" @click="setTestament('NT')">NEW TESTAMENT</button>
      </div>

      <div v-if="showOT" class="flex-row flex-wrap flex-center">
        <button v-for="book in otBooks" @click="setBook(book.name)" class="float-btn">{{book.name}}</button>
      </div>
      <div v-if="showNT" class="flex-row flex-wrap flex-center">
        <button v-for="book in ntBooks" @click="setBook(book.name)" class="float-btn">{{book.name}}</button>
      </div>

      <div v-if="chapters" class="small-cont flex-row flex-wrap flex-center">
        <button v-for="n in chapters" @click="chapterSelected(n)" class="float-btn">{{n}}</button>
      </div>

      <div v-if="verses" class="small-cont flex-row flex-wrap flex-center">
        <button v-for="n in verses" class="float-btn" @click="verseSelected(n)">{{n}}</button>
      </div>
    </div>

    <div class="text-right">
      <button v-if="this.osis" @click="finished" class="float-btn shadow back-green"><i class="fa fa-check"></i>&nbsp; {{normalize(osis)}}</button>
    </div>
  </div>
</template>

<script>
import bibleParser from '../../helpers/bible-parser'
import { Bible } from '../../helpers/bible'

export default {
  name: 'PassagePicker',
  data () {
    return {
      filter: '',
      testament: undefined,
      book: undefined,
      chapter: undefined,
      verse: undefined
    }
  },
  props: ['onSelect'],
  watch: {
    filter () {
      if (this.osis) {
        const start = this.osis.split('-')[0].split('.')
        this.book = start[0]
        this.chapter = start.length > 1 ? start[1] : undefined
      }
    }
  },
  computed: {
    header () {
      return `${{...this.bookObject}.name || ''} ${this.chapter || ''}`.trim()
    },
    otBooks () {
      return Bible.otBooks
    },
    ntBooks () {
      return Bible.ntBooks
    },
    showOT () {
      return !this.book && this.testament === 'OT' && !this.osis
    },
    showNT () {
      return !this.book && this.testament === 'NT' && !this.osis
    },
    osis () {
      return bibleParser.osis(this.filter)
    },
    showTestaments () {
      return !this.book && !this.testament
    },
    bookObject () {
      return this.book ? Bible.book(bibleParser.osis(this.book).split('.')[0]) : undefined
    },
    chapters () {
      if (this.book) {
        return this.verses ? undefined : this.bookObject.chapters
      }
    },
    verses () {
      return this.chapter ? this.bookObject.verses[this.chapter - 1] : undefined
    }
  },
  methods: {
    normalize (text) {
      return bibleParser.normalize(text)
    },
    chapterBack () {
      if (this.chapter && this.chapter > 1) {
        this.chapter--
      }
    },
    chapterForward () {
      if (this.bookObject.chapters !== this.chapter) {
        this.chapter++
      }
    },
    setTestament (testament) {
      this.testament = testament
    },
    setBook (book) {
      this.book = book
    },
    chapterSelected (chapter) {
      this.chapter = chapter
    },
    verseSelected (verse) {
      const selectedPassage = `${this.book} ${this.chapter} v${verse}`
      const selectedOsis = bibleParser.osis(selectedPassage)
      if (!this.osis) {
        this.filter = this.normalize(selectedPassage)
      } else {
        const references = this.osis.split('-')
        const sorted = bibleParser.sort(selectedOsis, references[0])
        if (references[0] === sorted[0]) {
          this.filter = this.normalize(`${references[0]}-${selectedOsis}`)
        } else if (selectedOsis === sorted[0]) {
          references.length === 2
          ? this.filter = this.normalize(`${selectedOsis}-${references[1]}`)
          : this.filter = this.normalize(`${selectedOsis}-${references[0]}`)
        }
      }
    },
    finished () {
      if (this.onSelect) {
        this.onSelect(this.osis)
      }
    }
  },
  mounted () {
  }
}
</script>

<style lang="less" scoped>
.passage-picker {
  max-width: 600px;
  .passage-bar {
    border-radius: 30px;
    h2 {
      display: inline;
      margin: 0;
    }
  }
  input {
    margin: 0 5px;
  }
}
.center {
  margin-left: auto;
  margin-right: auto;
}
.small-cont {
  max-width: 400px;
}
.testaments {
  button {
    margin-top: 15px;
    margin-bottom: 15px;
  }
}
</style>
