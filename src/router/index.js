import Vue from 'vue'
import Router from 'vue-router'
import analytics from '@/helpers/analytics-helper'

import SongList from '@/components/SongList'
import Login from '@/components/Login'
import AddSong from '@/components/AddSong'
import YouVersion from '@/components/views/YouVersion'

import About from '@/components/about/About'
import Privacy from '@/components/about/Privacy'

import store from '../store'
import server from '../services/true-songs-service'

Vue.use(Router)

var router = new Router({
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
        .catch(() => {})
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
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/privacy',
      name: 'Privacy',
      component: Privacy
    }
  ]
})

router.afterEach((to, from) => {
  if (to.name !== 'Activity') {
    analytics.trackScreen(to.name)
  }
})

export default router
