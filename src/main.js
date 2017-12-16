import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

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

Vue.mixin({
  methods: {
    showRightView (component, props) {
      this.$root.$children[0].rightView = component
      this.$root.$children[0].rightViewProps = props
    },
    hideRightView () {
      this.$root.$children[0].rightView = undefined
    }
  }
})
