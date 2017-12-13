import axios from 'axios'

// const baseUrl = 'https://true-songs-server.herokuapp.com'
const baseUrl = 'http://localhost:3300'

export default {
  authState: () => {
    return axios.get(`${baseUrl}/auth/state`, {withCredentials: true})
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
  streamSong (key) {
    return axios.get(`${baseUrl}/songs/${key}`)
    .then(response => response.data)
  }
}
