import axios from 'axios'

const baseUrl = process.env.GATEWAY

var versesCache = []
function cacheVerse (key, verse) {
  var obj = {key, verse}
  versesCache.splice(0, 0, obj)
  if (versesCache.length > 5) {
    versesCache.pop()
  }
}

export default {
  auth (token, strategy) {
    return axios.post(`${baseUrl}/auth/${strategy}/token`, {access_token: token})
    .then(response => response.data)
  },
  authState: () => {
    return axios.get(`${baseUrl}/user`, {withCredentials: true})
    .then(response => response.data)
  },
  loginUrl: (provider) => {
    return `${baseUrl}/auth/${provider}`
  },
  login: (provider) => {
    return axios.post(`${baseUrl}/auth/${provider}`)
    .then(response => response.data)
  },
  fetchBibles: function () {
    return axios.get(`${baseUrl}/bible/versions`)
    .then(response => response.data)
  },
  fetchBibleText: function (song) {
    const key = `${song.bible_version.id}-${song.passage}`
    const found = versesCache.find(v => v.key === key)
    if (found) {
      return Promise.resolve(found.verse)
    } else {
      return axios.get(`${baseUrl}/bible/text/${song.bible_version.id}?osis=${song.passage}`)
      .then(response => {
        cacheVerse(key, response.data)
        return response.data
      })
    }
  },
  fetchSongs: function () {
    return axios.get(`${baseUrl}/songs`)
    .then(response => response.data)
  },
  createSong (data, artist) {
    return axios.post(`${baseUrl}/songs/upload?artist=${artist}`, data)
  },
  updateSong (song, updates) {
    return axios.post(`${baseUrl}/songs/update`, {song, updates})
    .then(response => response.data)
  },
  streamSong (key) {
    return axios.get(`${baseUrl}/songs/${key}`)
    .then(response => response.data)
  },
  deleteSong (song) {
    return axios.delete(`${baseUrl}/songs`, {
      withCredentials: true,
      params: {
        passage: song.passage,
        uploadedAt: song.uploadedAt,
        key: song.key
      }
    })
  }
}
