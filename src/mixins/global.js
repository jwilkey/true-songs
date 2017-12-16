import Vue from 'vue'

Vue.mixin({
  methods: {
    showLoading () {
      this.$root.$children[0].isLoading = true
    },
    hideLoading () {
      this.$root.$children[0].isLoading = false
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
