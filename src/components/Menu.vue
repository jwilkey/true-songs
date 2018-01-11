<template>
  <div class="menu flex-column small-pad relative">
    <div class="close-button">
      <button @click="showRightView(undefined)" class="pull-right small-pad circle"><i class="fas fa-times"></i></button>
    </div>
    <div class="substance">
      <profile class="marginb"></profile>
      <display-options></display-options>
    </div>
    <div class="flex-one"></div>

    <div @click="aboutTrueSongs" class="pad text-center marginb pointer">
      <span class="fa-layers fa-fw marginr">
        <i class="fas fa-circle" data-fa-transform="grow-3"></i>
        <i class="fa-inverse fas fa-info alt" data-fa-transform="shrink-3"></i>
      </span>
      About True Songs
    </div>
  </div>
</template>

<script>
import DisplayOptions from '@/components/menu/DisplayOptions'
import Profile from '@/components/menu/Profile'

export default {
  name: 'Menu',
  data () {
    return {
    }
  },
  computed: { },
  components: { Profile, DisplayOptions },
  methods: {
    aboutTrueSongs () {
      this.$router.push('/about')
      this.showRightView(undefined)
    }
  }
}
</script>

<style lang="less" scoped>
.menu {
  .menu-buttons {
    button {
      border-radius: 0px;
      margin: 1px;
    }
  }
}
.close-button {
  position: absolute;
  top: 8px;
  right: 8px;
  button { min-width: 25px; }
}
</style>
