import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import './mixins/global'
import server from '@/services/true-songs-service'

Vue.config.productionTip = false

Vue.config.keyCodes.comma = 188
Vue.config.keyCodes.semicolon = 186

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

window.truesongs = {
  auth (token, strategy) {
    server.auth(token, strategy)
      .then(r => {
        server.authState()
          .then(user => {
            store.dispatch('setUser', user)
          })
      })
      .catch(response => {
        console.log('Error injecting auth:')
        console.log(response)
      })
  }
}
