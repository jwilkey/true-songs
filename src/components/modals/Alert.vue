<template>
  <div class="center-box">
    <div class="alert theme-mid pad shadow rounded">
      <div class="text-center pad">{{content}}</div>
      <div class="actions pad text-center">
        <button v-for="(callback, title) in actions" @click="callback">{{title}}</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Alert',
  props: ['content', 'actions']
}
</script>

<style lang="less" scoped>
.alert {
  min-width: 280px;
  max-width: 550px;
}
  .actions {
    button {
      margin: 0 8px;
      min-width: 60px;
    }
  }
</style>
