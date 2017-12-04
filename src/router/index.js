import Vue from 'vue'
import Router from 'vue-router'
import SongList from '@/components/SongList'
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
      path: '/add_song',
      name: 'AddSong',
      component: AddSong
    }
  ]
})
