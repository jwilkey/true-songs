<template>
  <div class="center-box">
    <div class="alert theme-mid pad shadow rounded flex-column">
      <div v-if="isComponent" :is="content" class="flex-one"></div>
      <div v-if="!isComponent" class="text-center pad flex-one">{{content}}</div>
      <div class="actions pad text-center">
        <button v-for="(callback, title) in actions" @click="callback">{{title}}</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Alert',
  props: ['content', 'actions'],
  computed: {
    isComponent () {
      return typeof this.content.render === 'function'
    }
  }
}
</script>

<style lang="less" scoped>
.alert {
  width: 80vw;
  max-width: 550px !important;
  max-height: 80vh;
}
.actions {
  button {
    margin: 0 8px;
    min-width: 60px;
  }
}
</style>
