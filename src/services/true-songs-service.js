import axios from 'axios'

const baseUrl = process.env.GATEWAY

export default {
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
  fetchSongs: function () {
    return axios.get(`${baseUrl}/songs`)
    .then(response => response.data)
  },
  createSong (data, artist) {
    return axios.post(`${baseUrl}/songs/upload?artist=${artist}`, data)
  },
  streamSong (key) {
    return axios.get(`${baseUrl}/songs/${key}`)
    .then(response => response.data)
  }
}
