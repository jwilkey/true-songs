import Vue from 'vue'
import Router from 'vue-router'
import SongList from '@/components/SongList'
import Login from '@/components/Login'
import AddSong from '@/components/AddSong'
import YouVersion from '@/components/views/YouVersion'
import store from '../store'
import server from '../services/true-songs-service'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'SongList',
      component: SongList,
      beforeEnter: (to, from, next) => {
        server.authState()
        .then(response => {
          store.dispatch('setUser', response)
        })
        next()
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/add_song',
      name: 'AddSong',
      component: AddSong,
      beforeEnter: (to, from, next) => {
        next(!store.getters.user ? `/login?ref=add_song` : true)
      }
    },
    {
      path: '/bible',
      name: 'Bible',
      component: YouVersion
    }
  ]
})
