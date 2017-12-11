import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const state = {
  songs: [],
  titlebar: {},
  currentSong: undefined,
  isLoadingSong: false
}

export const getters = {
  songs: state => state.songs,
  titlebar: state => state.titlebar,
  currentSong: state => state.currentSong,
  isLoadingSong: state => state.isLoadingSong
}

export const actions = {
  setSongs ({ commit }, songs) {
    songs.forEach(s => {
      s.bible_version = JSON.parse(s.bible_version)
      s.labels = s.labels ? JSON.parse(s.labels) : []
    })
    commit('SET_SONGS', songs)
  },
  playSong ({ commit }, songKey) {
    commit('SET_CURRENT_SONG', songKey)
  },
  isLoadingSong ({ commit }, isLoading) {
    commit('SET_IS_LOADING_SONG', isLoading)
  },
  configureTitlebar ({ commit }, options) {
    commit('TITLEBAR_OPTIONS', options)
  }
}

export const mutations = {
  SET_SONGS (state, songs) {
    state.songs = songs
  },
  SET_IS_LOADING_SONG (state, isLoading) {
    state.isLoadingSong = isLoading
  },
  TITLEBAR_OPTIONS (state, options) {
    state.titlebar = options
  },
  SET_CURRENT_SONG (state, key) {
    state.currentSong = key
  }
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
