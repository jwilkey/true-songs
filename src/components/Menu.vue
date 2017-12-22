<template>
  <div class="menu flex-column small-pad">
    <div class="flex-row menu-buttons">
      <button @click="showSortOptions" class="flex-one"><i class="fas fa-sort-alpha-down"></i></button>
      <button @click="showProfile" class="flex-one"><i class="fas fa-user"></i></button>
    </div>

    <component :is="component"></component>

    <div class="flex-one substance">

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
      component: DisplayOptions
    }
  },
  methods: {
    showSortOptions () {
      this.component = DisplayOptions
    },
    showProfile () {
      this.component = Profile
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
</style>
