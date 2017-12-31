import Vue from 'vue'
import Vuex from 'vuex'
import bibleParser from '../helpers/bible-parser'

Vue.use(Vuex)

export const state = {
  allSongs: [],
  songs: [],
  sortMethod: 'passage',
  filter: undefined,
  titlebar: {},
  user: undefined,
  currentSong: undefined,
  isLoadingSong: false,
  isPlaying: false
}

export const getters = {
  allSongs: state => state.allSongs,
  songs: state => state.songs,
  sortMethod: state => state.sortMethod,
  filter: state => state.filter,
  titlebar: state => state.titlebar,
  user: state => state.user,
  currentSong: state => state.currentSong,
  isLoadingSong: state => state.isLoadingSong,
  isPlaying: state => state.isPlaying
}

export const actions = {
  setAllSongs ({ commit }, songs) {
    songs.forEach(s => {
      s.bible_version = JSON.parse(s.bible_version)
      s.labels = s.labels ? JSON.parse(s.labels) : []
      s.search = `|${s.passage}|${s.bible_version.versionCode}|${s.artist}|${s.labels.join('|')}`
      .toLowerCase()
      .replace(' ', '')
    })
    commit('SET_ALL_SONGS', songs)
  },
  setSongs ({ commit }, songs) {
    commit('SET_SONGS', songs)
  },
  updateSong ({ commit }, song) {
    song.bible_version = JSON.parse(song.bible_version)
    song.labels = song.labels ? JSON.parse(song.labels) : []
    song.search = `|${song.passage}|${song.bible_version.versionCode}|${song.artist}|${song.labels.join('|')}`
    .toLowerCase()
    .replace(' ', '')
    commit('UPDATE_SONG', song)
    return song
  },
  sortBy ({ commit }, method) {
    commit('SORT_BY', method)
  },
  setFilter ({ commit, state }, filter) {
    commit('SET_FILTER', filter)
    var songs = []
    if (filter) {
      switch (filter.key) {
        case 'book': songs = state.allSongs.filter(s => s.passage.startsWith(`${filter.value}.`))
          break
        case 'artist': songs = state.allSongs.filter(s => s.artist === filter.value)
          break
        case 'user': songs = state.allSongs.filter(s => s.user === filter.value)
          break
      }
    }
    commit('SET_SONGS', songs)
  },
  setUser ({ commit }, user) {
    commit('SET_USER', user)
  },
  setCurrentSong ({ commit }, song) {
    commit('SET_CURRENT_SONG', song)
  },
  removeSong ({ commit }, song) {
    commit('REMOVE_SONG', song)
  },
  isLoadingSong ({ commit }, isLoading) {
    commit('SET_IS_LOADING_SONG', isLoading)
  },
  setIsPlaying ({ commit }, isPlaying) {
    commit('SET_IS_PLAYING', isPlaying)
  },
  configureTitlebar ({ commit }, options) {
    commit('TITLEBAR_OPTIONS', options)
  }
}

function applySort (method, state) {
  switch (method) {
    case 'passage': state.songs.sort((a, b) => passageSort(a, b))
      break
    case 'upload': state.songs.sort((a, b) => uploadSort(a, b) || passageSort(a, b))
      break
    case 'artist': state.songs.sort((a, b) => artistSort(a, b) || passageSort(a, b))
      break
    default:
  }
}
function passageSort (a, b) {
  return bibleParser.compare(a.passage, b.passage)
}
function uploadSort (a, b) {
  return b.uploadedAt.localeCompare(a.uploadedAt)
}
function artistSort (a, b) {
  return a.artist.localeCompare(b.artist)
}

export const mutations = {
  SET_ALL_SONGS (state, songs) {
    state.allSongs = songs
  },
  SET_SONGS (state, songs) {
    state.songs = songs
    applySort(state.sortMethod, state)
  },
  UPDATE_SONG (state, song) {
    const i = state.songs.findIndex(s => s.passage === song.passage && s.uploadedAt === song.uploadedAt)
    state.songs[i] = song
  },
  SORT_BY (state, method) {
    state.sortMethod = method
    applySort(method, state)
  },
  SET_FILTER (state, filter) {
    state.filter = filter
  },
  REMOVE_SONG (state, song) {
    state.songs.splice(state.songs.indexOf(song), 1)
  },
  SET_IS_LOADING_SONG (state, isLoading) {
    state.isLoadingSong = isLoading
  },
  SET_IS_PLAYING (state, isPlaying) {
    state.isPlaying = isPlaying
  },
  TITLEBAR_OPTIONS (state, options) {
    state.titlebar = options
  },
  SET_USER (state, user) {
    state.user = user
  },
  SET_CURRENT_SONG (state, song) {
    state.currentSong = song
  }
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
