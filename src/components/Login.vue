<template>
  <div class="pad">
    <div v-if="user" class="user flex-column vfull text-center">
      <div class="flex-one">
        <h1 class="theme-back-text">Hello {{user.name}}</h1>
        <img :src="user.image" class="user-image" />
      </div>
      <router-link to="/" class="theme-back-text marginb">done</router-link>
    </div>
    <div v-else class="flex-column ">
      <p class="marginb theme-back-text text-center font-large">Login with</p>
      <a :href="googleUrl" class="button text-center pad marginb">Google</a>
      <!-- <a :href="facebookUrl" class="button text-center pad marginb">Facebook</a> -->
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import server from '../services/true-songs-service'

export default {
  name: 'Login',
  data () {
    return {
      auth: undefined
    }
  },
  computed: {
    ...mapGetters(['user']),
    googleUrl () {
      return server.loginUrl('google')
    },
    facebookUrl () {
      return server.loginUrl('facebook')
    }
  },
  methods: {
    ...mapActions(['setUser'])
  },
  mounted () {
    const self = this
    server.authState()
    .then(response => {
      self.setUser(response)
      if (self.user) {
        setTimeout(() => {
          self.$router.replace(self.$route.query.ref || '/')
        }, 3000)
      }
    })
  }
}
</script>

<style lang="less" scoped>
.user {
  h1 {
    margin-bottom: 40px;
  }
  .user-image {
    border-radius: 30px;
    height: 50px;
    width: 50px;
  }
}
</style>
