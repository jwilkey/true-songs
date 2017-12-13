import Vue from 'vue'
import Router from 'vue-router'
import SongList from '@/components/SongList'
import Login from '@/components/Login'
import AddSong from '@/components/AddSong'
import store from '../store'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'SongList',
      component: SongList
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
        next(!store.getters.user ? `/login?ref=${to.path}` : true)
      }
    }
  ]
})
