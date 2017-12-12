import Vue from 'vue'
import Router from 'vue-router'
import SongList from '@/components/SongList'
import Login from '@/components/Login'
import AddSong from '@/components/AddSong'

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
      component: AddSong
    }
  ]
})
