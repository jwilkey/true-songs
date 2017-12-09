import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const state = {
  songs: [],
  titlebar: {}
}

export const getters = {
  songs: state => state.songs,
  titlebar: state => state.titlebar
}

export const actions = {
  setSongs ({ commit }, songs) {
    songs.forEach(s => {
      s.bible_version = JSON.parse(s.bible_version)
      s.labels = s.labels ? JSON.parse(s.labels) : []
    })
    commit('SET_SONGS', songs)
  },
  configureTitlebar ({ commit }, options) {
    commit('TITLEBAR_OPTIONS', options)
  }
}

export const mutations = {
  SET_SONGS (state, songs) {
    state.songs = songs
  },
  TITLEBAR_OPTIONS (state, options) {
    state.titlebar = options
  }
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
