import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import './mixins/global'
import server from '@/services/true-songs-service'

Vue.config.productionTip = false

Vue.config.keyCodes.comma = 188
Vue.config.keyCodes.semicolon = 186

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})

window.truesongs = {
  auth (token, strategy) {
    server.auth(token, strategy)
    .catch(response => {
      console.log('Error injecting auth:')
      console.log(response)
    })
  }
}
