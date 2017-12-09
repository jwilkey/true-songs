import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const state = {
  songs: []
}

export const getters = {
  songs: state => state.songs
}

export const actions = {
  setSongs ({ commit }, songs) {
    songs.forEach(s => { s.bible_version = JSON.parse(s.bible_version) })
    commit('SET_SONGS', songs)
  }
}

export const mutations = {
  SET_SONGS (state, songs) {
    state.songs = songs
  }
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
