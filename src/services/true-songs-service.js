import axios from 'axios'

const baseUrl = 'https://true-songs-server.herokuapp.com'
// const baseUrl = 'http://localhost:3300'

export default {
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
