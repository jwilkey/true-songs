import parser from 'bible-passage-reference-parser/js/en_bcv_parser'
var osisNames = require('./osis_names.json')
var bcv = new parser.bcv_parser()  // eslint-disable-line new-cap
bcv.options.book_alone_strategy = 'first_chapter'
bcv.options.book_sequence_strategy = 'include'

function osis (text) {
  return text ? bcv.parse(text).osis() : ''
}

function readable (osis) {
  if (!osis) {
    return undefined
  }

  const refs = osis.split(',')

  const range = refs[0].split('-')
  const start = range[0].split('.')

  const l1 = start.length
  const startRef = `${osisNames[start[0]]} ${start[1]}${l1 > 2 ? ':' + start[2] : ''}`
  var endRef = ''
  if (range[1]) {
    const end = range[1].split('.')
    const l2 = end.length
    const sameCh = end[1] === start[1]
    endRef = `-${sameCh ? '' : end[1]}${l2 > 2 ? `${sameCh ? '' : ':'}${end[2]}` : ''}`
  }

  return `${startRef}${endRef}`
}

export default {
  osis,
  normalize (text) {
    return readable(osis(text))
  },
  sort (osis1, osis2) {
    const parts1 = osis1.split('.')
    const parts2 = osis2.split('.')
    if (parts1.length === 2) { parts1.push('1') }
    if (parts2.length === 2) { parts2.push('1') }
    if (!osis1 || !osis2 || parts1.length !== 3 || parts2.length !== 3 || (parts1[0] !== parts2[0])) {
      return undefined
    }
    if (i(parts1[1]) > i(parts2[1]) || (parts1[1] === parts2[1] && i(parts1[2]) > i(parts2[2]))) {
      return [osis2, osis1]
    }
    return [osis1, osis2]
  },
  compare (osis1, osis2) {
    if (osis1 === osis2) { return 0 }

    const one = bcv.parse(osis1).parsed_entities()[0].entities[0].start
    const two = bcv.parse(osis2).parsed_entities()[0].entities[0].start

    if (JSON.stringify(one) === JSON.stringify(two)) { return 0 }
    if (one.b === two.b) {
      return one.c > two.c || (one.c === two.c && one.v > two.v) ? 1 : -1
    } else {
      const books = Object.keys(osisNames)
      return books.indexOf(one.b) - books.indexOf(two.b)
    }
  },
  readable
}

function i (val) {
  return parseInt(val)
}
