import axios from 'axios'

const baseUrl = 'https://true-songs-server.herokuapp.com'

export default {
  fetchSongs: function () {
    return axios.get(`${baseUrl}/songs`)
    .then(response => response.data)
  },
  streamSong (key) {
    return axios.get(`${baseUrl}/songs/${key}`)
    .then(response => response.data)
  }
}
