import Vue from 'vue'

Vue.mixin({
  methods: {
    showLoading () {
      this.$root.$children[0].isLoading = true
    },
    hideLoading () {
      this.$root.$children[0].isLoading = false
    },
    alert (content, actions) {
      this.$root.$children[0].alertConfig = { content, actions }
    },
    dismissAlert () {
      this.$root.$children[0].alertConfig = undefined
    },
    showRightView (component, props) {
      this.$root.$children[0].rightView = component
      this.$root.$children[0].rightViewProps = props
    },
    hideRightView () {
      this.$root.$children[0].rightView = undefined
    }
  }
})
