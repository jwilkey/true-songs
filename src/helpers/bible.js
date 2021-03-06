var books = [
  { 'identifier': 'Gen', 'name': 'Genesis', 'chapters': 50, 'verses': [31, 25, 24, 26, 32, 22, 24, 22, 29, 32, 32, 20, 18, 24, 21, 16, 27, 33, 38, 18, 34, 24, 20, 67, 34, 35, 46, 22, 35, 43, 55, 32, 20, 31, 29, 43, 36, 30, 23, 23, 57, 38, 34, 34, 28, 34, 31, 22, 33, 26] },
  { 'identifier': 'Exod', 'name': 'Exodus', 'chapters': 40, 'verses': [22, 25, 22, 31, 23, 30, 25, 32, 35, 29, 10, 51, 22, 31, 27, 36, 16, 27, 25, 26, 36, 31, 33, 18, 40, 37, 21, 43, 46, 38, 18, 35, 23, 35, 35, 38, 29, 31, 43, 38] },
  { 'identifier': 'Lev', 'name': 'Leviticus', 'chapters': 27, 'verses': [17, 16, 17, 35, 19, 30, 38, 36, 24, 20, 47, 8, 59, 57, 33, 34, 16, 30, 37, 27, 24, 33, 44, 23, 55, 46, 34] },
  { 'identifier': 'Num', 'name': 'Numbers', 'chapters': 36, 'verses': [54, 34, 51, 49, 31, 27, 89, 26, 23, 36, 35, 16, 33, 45, 41, 50, 13, 32, 22, 29, 35, 41, 30, 25, 18, 65, 23, 31, 40, 16, 54, 42, 56, 29, 34, 13] },
  { 'identifier': 'Deut', 'name': 'Deuteronomy', 'chapters': 34, 'verses': [46, 37, 29, 49, 33, 25, 26, 20, 29, 22, 32, 32, 18, 29, 23, 22, 20, 22, 21, 20, 23, 30, 25, 22, 19, 19, 26, 68, 29, 20, 30, 52, 29, 12] },
  { 'identifier': 'Josh', 'name': 'Joshua', 'chapters': 24, 'verses': [18, 24, 17, 24, 15, 27, 26, 35, 27, 43, 23, 24, 33, 15, 63, 10, 18, 28, 51, 9, 45, 34, 16, 33] },
  { 'identifier': 'Judg', 'name': 'Judges', 'chapters': 21, 'verses': [36, 23, 31, 24, 31, 40, 25, 35, 57, 18, 40, 15, 25, 20, 20, 31, 13, 31, 30, 48, 25] },
  { 'identifier': 'Ruth', 'name': 'Ruth', 'chapters': 4, 'verses': [22, 23, 18, 22] },
  { 'identifier': '1Sam', 'name': '1 Samuel', 'chapters': 31, 'verses': [28, 36, 21, 22, 12, 21, 17, 22, 27, 27, 15, 25, 23, 52, 35, 23, 58, 30, 24, 42, 15, 23, 29, 22, 44, 25, 12, 25, 11, 31, 13] },
  { 'identifier': '2Sam', 'name': '2 Samuel', 'chapters': 24, 'verses': [27, 32, 39, 12, 25, 23, 29, 18, 13, 19, 27, 31, 39, 33, 37, 23, 29, 33, 43, 26, 22, 51, 39, 25] },
  { 'identifier': '1Kgs', 'name': '1 Kings', 'chapters': 22, 'verses': [53, 46, 28, 34, 18, 38, 51, 66, 28, 29, 43, 33, 34, 31, 34, 34, 24, 46, 21, 43, 29, 53] },
  { 'identifier': '2Kgs', 'name': '2 Kings', 'chapters': 25, 'verses': [18, 25, 27, 44, 27, 33, 20, 29, 37, 36, 21, 21, 25, 29, 38, 20, 41, 37, 37, 21, 26, 20, 37, 20, 30] },
  { 'identifier': '1Chr', 'name': '1 Chronicles', 'chapters': 29, 'verses': [54, 55, 24, 43, 26, 81, 40, 40, 44, 14, 47, 40, 14, 17, 29, 43, 27, 17, 19, 8, 30, 19, 32, 31, 31, 32, 34, 21, 30] },
  { 'identifier': '2Chr', 'name': '2 Chronicles', 'chapters': 36, 'verses': [17, 18, 17, 22, 14, 42, 22, 18, 31, 19, 23, 16, 22, 15, 19, 14, 19, 34, 11, 37, 20, 12, 21, 27, 28, 23, 9, 27, 36, 27, 21, 33, 25, 33, 27, 23] },
  { 'identifier': 'Ezra', 'name': 'Ezra', 'chapters': 10, 'verses': [11, 70, 13, 24, 17, 22, 28, 36, 15, 44] },
  { 'identifier': 'Neh', 'name': 'Nehemiah', 'chapters': 13, 'verses': [11, 20, 32, 23, 19, 19, 73, 18, 38, 39, 36, 47, 31] },
  { 'identifier': 'Esth', 'name': 'Esther', 'chapters': 10, 'verses': [22, 23, 15, 17, 14, 14, 10, 17, 32, 3] },
  { 'identifier': 'Job', 'name': 'Job', 'chapters': 42, 'verses': [22, 13, 26, 21, 27, 30, 21, 22, 35, 22, 20, 25, 28, 22, 35, 22, 16, 21, 29, 29, 34, 30, 17, 25, 6, 14, 23, 28, 25, 31, 40, 22, 33, 37, 16, 33, 24, 41, 30, 24, 34, 17] },
  { 'identifier': 'Ps', 'name': 'Psalm', 'chapters': 150, 'verses': [6, 12, 8, 8, 12, 10, 17, 9, 20, 18, 7, 8, 6, 7, 5, 11, 15, 50, 14, 9, 13, 31, 6, 10, 22, 12, 14, 9, 11, 12, 24, 11, 22, 22, 28, 12, 40, 22, 13, 17, 13, 11, 5, 26, 17, 11, 9, 14, 20, 23, 19, 9, 6, 7, 23, 13, 11, 11, 17, 12, 8, 12, 11, 10, 13, 20, 7, 35, 36, 5, 24, 20, 28, 23, 10, 12, 20, 72, 13, 19, 16, 8, 18, 12, 13, 17, 7, 18, 52, 17, 16, 15, 5, 23, 11, 13, 12, 9, 9, 5, 8, 28, 22, 35, 45, 48, 43, 13, 31, 7, 10, 10, 9, 8, 18, 19, 2, 29, 176, 7, 8, 9, 4, 8, 5, 6, 5, 6, 8, 8, 3, 18, 3, 3, 21, 26, 9, 8, 24, 13, 10, 7, 12, 15, 21, 10, 20, 14, 9, 6] },
  { 'identifier': 'Prov', 'name': 'Proverbs', 'chapters': 31, 'verses': [33, 22, 35, 27, 23, 35, 27, 36, 18, 32, 31, 28, 25, 35, 33, 33, 28, 24, 29, 30, 31, 29, 35, 34, 28, 28, 27, 28, 27, 33, 31] },
  { 'identifier': 'Eccl', 'name': 'Ecclesiastes', 'chapters': 12, 'verses': [18, 26, 22, 16, 20, 12, 29, 17, 18, 20, 10, 14] },
  { 'identifier': 'Song', 'name': 'Song of Solomon', 'chapters': 8, 'verses': [17, 17, 11, 16, 16, 13, 13, 14] },
  { 'identifier': 'Isa', 'name': 'Isaiah', 'chapters': 66, 'verses': [31, 22, 26, 6, 30, 13, 25, 22, 21, 34, 16, 6, 22, 32, 9, 14, 14, 7, 25, 6, 17, 25, 18, 23, 12, 21, 13, 29, 24, 33, 9, 20, 24, 17, 10, 22, 38, 22, 8, 31, 29, 25, 28, 28, 25, 13, 15, 22, 26, 11, 23, 15, 12, 17, 13, 12, 21, 14, 21, 22, 11, 12, 19, 12, 25, 24] },
  { 'identifier': 'Jer', 'name': 'Jeremiah', 'chapters': 52, 'verses': [19, 37, 25, 31, 31, 30, 34, 22, 26, 25, 23, 17, 27, 22, 21, 21, 27, 23, 15, 18, 14, 30, 40, 10, 38, 24, 22, 17, 32, 24, 40, 44, 26, 22, 19, 32, 21, 28, 18, 16, 18, 22, 13, 30, 5, 28, 7, 47, 39, 46, 64, 34] },
  { 'identifier': 'Lam', 'name': 'Lamentations', 'chapters': 5, 'verses': [22, 22, 66, 22, 22] },
  { 'identifier': 'Ezek', 'name': 'Ezekiel', 'chapters': 48, 'verses': [28, 10, 27, 17, 17, 14, 27, 18, 11, 22, 25, 28, 23, 23, 8, 63, 24, 32, 14, 49, 32, 31, 49, 27, 17, 21, 36, 26, 21, 26, 18, 32, 33, 31, 15, 38, 28, 23, 29, 49, 26, 20, 27, 31, 25, 24, 23, 35] },
  { 'identifier': 'Dan', 'name': 'Daniel', 'chapters': 12, 'verses': [21, 49, 30, 37, 31, 28, 28, 27, 27, 21, 45, 13] },
  { 'identifier': 'Hos', 'name': 'Hosea', 'chapters': 14, 'verses': [11, 23, 5, 19, 15, 11, 16, 14, 17, 15, 12, 14, 16, 9] },
  { 'identifier': 'Joel', 'name': 'Joel', 'chapters': 3, 'verses': [20, 32, 21] },
  { 'identifier': 'Amos', 'name': 'Amos', 'chapters': 9, 'verses': [15, 16, 15, 13, 27, 14, 17, 14, 15] },
  { 'identifier': 'Obad', 'name': 'Obadiah', 'chapters': 1, 'verses': [21] },
  { 'identifier': 'Jonah', 'name': 'Jonah', 'chapters': 4, 'verses': [17, 10, 10, 11] },
  { 'identifier': 'Mic', 'name': 'Micah', 'chapters': 7, 'verses': [16, 13, 12, 13, 15, 16, 20] },
  { 'identifier': 'Nah', 'name': 'Nahum', 'chapters': 3, 'verses': [15, 13, 19] },
  { 'identifier': 'Hab', 'name': 'Habakkuk', 'chapters': 3, 'verses': [17, 20, 19] },
  { 'identifier': 'Zeph', 'name': 'Zephaniah', 'chapters': 3, 'verses': [18, 15, 20] },
  { 'identifier': 'Hag', 'name': 'Haggai', 'chapters': 2, 'verses': [15, 23] },
  { 'identifier': 'Zech', 'name': 'Zechariah', 'chapters': 14, 'verses': [21, 13, 10, 14, 11, 15, 14, 23, 17, 12, 17, 14, 9, 21] },
  { 'identifier': 'Mal', 'name': 'Malachi', 'chapters': 4, 'verses': [14, 17, 18, 6] },
  { 'identifier': 'Matt', 'name': 'Matthew', 'chapters': 28, 'verses': [25, 23, 17, 25, 48, 34, 29, 34, 38, 42, 30, 50, 58, 36, 39, 28, 27, 35, 30, 34, 46, 46, 39, 51, 46, 75, 66, 20] },
  { 'identifier': 'Mark', 'name': 'Mark', 'chapters': 16, 'verses': [45, 28, 35, 41, 43, 56, 37, 38, 50, 52, 33, 44, 37, 72, 47, 20] },
  { 'identifier': 'Luke', 'name': 'Luke', 'chapters': 24, 'verses': [80, 52, 38, 44, 39, 49, 50, 56, 62, 42, 54, 59, 35, 35, 32, 31, 37, 43, 48, 47, 38, 71, 56, 53] },
  { 'identifier': 'John', 'name': 'John', 'chapters': 21, 'verses': [51, 25, 36, 54, 47, 71, 53, 59, 41, 42, 57, 50, 38, 31, 27, 33, 26, 40, 42, 31, 25] },
  { 'identifier': 'Acts', 'name': 'Acts', 'chapters': 28, 'verses': [26, 47, 26, 37, 42, 15, 60, 40, 43, 48, 30, 25, 52, 28, 41, 40, 34, 28, 41, 38, 40, 30, 35, 27, 27, 32, 44, 31] },
  { 'identifier': 'Rom', 'name': 'Romans', 'chapters': 16, 'verses': [32, 29, 31, 25, 21, 23, 25, 39, 33, 21, 36, 21, 14, 23, 33, 27] },
  { 'identifier': '1Cor', 'name': '1 Corinthians', 'chapters': 16, 'verses': [31, 16, 23, 21, 13, 20, 40, 13, 27, 33, 34, 31, 13, 40, 58, 24] },
  { 'identifier': '2Cor', 'name': '2 Corinthians', 'chapters': 13, 'verses': [24, 17, 18, 18, 21, 18, 16, 24, 15, 18, 33, 21, 14] },
  { 'identifier': 'Gal', 'name': 'Galatians', 'chapters': 6, 'verses': [24, 21, 29, 31, 26, 18] },
  { 'identifier': 'Eph', 'name': 'Ephesians', 'chapters': 6, 'verses': [23, 22, 21, 32, 33, 24] },
  { 'identifier': 'Phil', 'name': 'Philippians', 'chapters': 4, 'verses': [30, 30, 21, 23] },
  { 'identifier': 'Col', 'name': 'Colossians', 'chapters': 4, 'verses': [29, 23, 25, 18] },
  { 'identifier': '1Thess', 'name': '1 Thessalonians', 'chapters': 5, 'verses': [10, 20, 13, 18, 28] },
  { 'identifier': '2Thess', 'name': '2 Thessalonians', 'chapters': 3, 'verses': [12, 17, 18] },
  { 'identifier': '1Tim', 'name': '1 Timothy', 'chapters': 6, 'verses': [20, 15, 16, 16, 25, 21] },
  { 'identifier': '2Tim', 'name': '2 Timothy', 'chapters': 4, 'verses': [18, 26, 17, 22] },
  { 'identifier': 'Titus', 'name': 'Titus', 'chapters': 3, 'verses': [16, 15, 15] },
  { 'identifier': 'Phlm', 'name': 'Philemon', 'chapters': 1, 'verses': [25] },
  { 'identifier': 'Heb', 'name': 'Hebrews', 'chapters': 13, 'verses': [14, 18, 19, 16, 14, 20, 28, 13, 28, 39, 40, 29, 25] },
  { 'identifier': 'Jas', 'name': 'James', 'chapters': 5, 'verses': [27, 26, 18, 17, 20] },
  { 'identifier': '1Pet', 'name': '1 Peter', 'chapters': 5, 'verses': [25, 25, 22, 19, 14] },
  { 'identifier': '2Pet', 'name': '2 Peter', 'chapters': 3, 'verses': [21, 22, 18] },
  { 'identifier': '1John', 'name': '1 John', 'chapters': 5, 'verses': [10, 29, 24, 21, 21] },
  { 'identifier': '2John', 'name': '2 John', 'chapters': 1, 'verses': [13] },
  { 'identifier': '3John', 'name': '3 John', 'chapters': 1, 'verses': [14] },
  { 'identifier': 'Jude', 'name': 'Jude', 'chapters': 1, 'verses': [25] },
  { 'identifier': 'Rev', 'name': 'Revelation', 'chapters': 22, 'verses': [20, 29, 22, 11, 14, 17, 17, 13, 21, 11, 19, 17, 18, 20, 8, 21, 18, 24, 21, 15, 27, 21] }
]

var Bible = {
  otBooks: books.slice(0, 39),
  ntBooks: books.slice(39, 66),
  Passage: Passage,
  book (bookIdentifier) {
    return books.find(book => book.identifier === bookIdentifier)
  },
  bookName (bookIdentifier) {
    var b = this.book(bookIdentifier)
    return b ? b.name : undefined
  },
  chapters (bookIdentifier) {
    var b = this.book(bookIdentifier)
    return b ? b.chapters : undefined
  },
  buildPassage (startVerse, endVerse) {
    return new Passage(startVerse, endVerse)
  },
  compareReferences (verse1, verse2) {
    if (!verse1 || !verse2 || (verse1.book !== verse2.book)) {
      return NaN
    }
    if (verse2.chapter > verse1.chapter) {
      return 1
    } else if (verse2.chapter === verse1.chapter) {
      if (verse2.number > verse1.number) {
        return 1
      } else if (verse2.number === verse1.number) {
        return 0
      } else {
        return -1
      }
    } else {
      return -1
    }
  },
  passageContains (startVerse, endVerse, verseInQuestion) {
    var startingVerseComparison = this.compareReferences(startVerse, verseInQuestion)
    if (startingVerseComparison === 0) {
      return true
    } else if (endVerse !== undefined) {
      var endingVerseComparison = this.compareReferences(verseInQuestion, endVerse)
      if (endingVerseComparison === 0 || (startingVerseComparison === 1 && endingVerseComparison === 1)) {
        return true
      }
      return false
    }
  }
}

// Verse
function Verse (bookIdentifier, chapter, number) {
  this.book = bookIdentifier
  this.chapter = chapter
  this.number = number
}

Verse.prototype.equals = function (verse) {
  return Bible.compareReferences(verse, this) === 0
}
Verse.prototype.isAfter = function (verse) {
  return Bible.compareReferences(verse, this) === 1
}
Verse.prototype.isBefore = function (verse) {
  return Bible.compareReferences(this, verse) === 1
}

// Passage
function Passage (startVerse, endVerse) {
  this.start = startVerse
  this.end = endVerse
}

Passage.prototype.description = function () {
  var text = `${Bible.bookName(this.start.book)} ${this.start.chapter}:${this.start.number}`
  if (this.end !== undefined) {
    var endChapter = this.end.chapter !== this.start.chapter ? `${this.end.chapter}:` : ''
    text = `${text}-${endChapter}${this.end.number}`
  }
  return text
}

Passage.prototype.fromJson = function (json) {
  var start = json.start
  var end = json.end
  return new Passage(new Verse(start.book, start.chapter, start.number), new Verse(end.book, end.chapter, end.number))
}

// WordRange
// word: {book: b, verse: verseNumber, text: text, index: index}
function WordRange (startingWord, endingWord) {
  this.kind = 'word-range'
  this.startingWord = startingWord
  this.endingWord = endingWord
}

WordRange.prototype.includes = function (word) {
  var start = this.startingWord.verse * 100 + this.startingWord.index
  var end = this.endingWord.verse * 100 + this.endingWord.index
  var wordRef = word.verse * 100 + word.index
  return this.startingWord.book === word.book &&
  wordRef >= start &&
  wordRef <= end
}

WordRange.prototype.fromJson = function (json) {
  return new WordRange(json.startingWord, json.endingWord)
}

export { Bible, Verse, WordRange }
