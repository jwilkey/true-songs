<template>
  <div class="titlebar z1 theme-back-text flex-row align-center pad font-large">
    <div v-if="!showLeftItems" @click="$router.push('/')" class="logo-box callout marginr shadow flex-column flex-center">
      <img class="logo" src="@/assets/images/wavebar_padded.png" />
    </div>
    <button v-for="item in leftItems" @click.prevent="item.action" v-html="item.template" class="titlebar-action left theme-back-text"></button>

    <p class="flex-one">{{title || 'TRUE SONGS'}}</p>

    <button v-for="item in rightItems" @click.prevent="item.action" v-html="item.template" class="titlebar-action right theme-back-text"></button>
  </div>
</template>

<script>
export default {
  name: 'Titlebar',
  data () {
    return {
    }
  },
  props: ['title', 'leftItems', 'rightItems'],
  computed: {
    showLeftItems () {
      return this.leftItems && Object.keys(this.leftItems).length
    }
  }
}
</script>

<style lang="less">
.titlebar {
  overflow: visible;
  .logo-box {
    border-radius: 15px;
    padding: 3px;
    transform: scale(1.3);
  }
  .logo {
    height: 22px;
    filter: invert(1);
  }
  .titlebar-action {
    padding: 6px 10px 5px 10px;
    border-radius: 20px;
    min-width: 32px;
    &.left {
      margin-right: 10px;
    }
    &.right {
      margin-left: 10px;
    }
  }
}
</style>
