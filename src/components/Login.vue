<template>
  <div class="content pad">
    <div v-if="user" class="user flex-column vfull text-center">
      <div class="flex-one">
        <h1 class="theme-back-text">Hello {{user.name}}</h1>
        <img :src="user.image" class="user-image" />
      </div>
      <router-link to="/" class="theme-back-text marginb">done</router-link>
    </div>
    <div v-else class="flex-column">
      <p class="sign-in-label theme-back-text text-center font-large">Sign in so that you can upload songs</p>

      <a :href="googleUrl" class="button text-center pad marginb flex-row align-center flex-center"><img src="@/assets/images/btn_google_light_normal_ios.svg" class="google" /> Sign in with Google</a>

      <a :href="facebookUrl" class="button text-center pad marginb flex-row align-center flex-center"><img src="@/assets/images/fb_logo.png" class="facebook" /> Sign in with Facebook</a>
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
    ...mapGetters(['user', 'platform']),
    googleUrl () {
      return this.platform === 'ios' ? 'webapp:google:signIn' : server.loginUrl('google')
    },
    facebookUrl () {
      return this.platform === 'ios' ? 'webapp:facebook:signIn' : server.loginUrl('facebook')
    }
  },
  watch: {
    user () {
      if (this.user) {
        const self = this
        setTimeout(() => {
          self.$router.replace(self.$route.query.ref ? `/${self.$route.query.ref}` : '/')
        }, 3000)
      }
    }
  },
  methods: {
    ...mapActions(['setUser'])
  },
  mounted () {
    const self = this
    server.authState()
    .then(self.setUser)
    .catch(() => {})
  }
}
</script>

<style lang="less" scoped>
.sign-in-label {
  margin-bottom: 40px;
}
a {
  img {
    margin-right: 10px;
  }
  .google {
    height: 30px;
  }
  .facebook {
    height: 25px;
  }
}
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
