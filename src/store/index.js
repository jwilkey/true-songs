import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const state = {
  songs: [],
  titlebar: {},
  user: undefined,
  currentSong: undefined,
  isLoadingSong: false,
  isPlaying: false
}

export const getters = {
  songs: state => state.songs,
  titlebar: state => state.titlebar,
  user: state => state.user,
  currentSong: state => state.currentSong,
  isLoadingSong: state => state.isLoadingSong,
  isPlaying: state => state.isPlaying
}

export const actions = {
  setSongs ({ commit }, songs) {
    songs.forEach(s => {
      s.bible_version = JSON.parse(s.bible_version)
      s.user = s.user
      s.labels = s.labels ? JSON.parse(s.labels) : []
    })
    commit('SET_SONGS', songs)
  },
  setUser ({ commit }, user) {
    commit('SET_USER', user)
  },
  setCurrentSong ({ commit }, songKey) {
    commit('SET_CURRENT_SONG', songKey)
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

export const mutations = {
  SET_SONGS (state, songs) {
    state.songs = songs
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
