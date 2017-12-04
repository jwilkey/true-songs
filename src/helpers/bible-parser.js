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
  readable
}
