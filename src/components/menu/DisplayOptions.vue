<template>
  <div class="display-options small-pad">
    <div class="sort-options margint">
      <p class="muted">SORT SONGS BY</p>
      <div @click="sortBy('passage')" class="pad mid-bottom pointer">
        <span v-if="isSortPassage"><i class="fas fa-check muted" data-fa-transform="shrink-2"></i></span> Bible passage
      </div>
      <div @click="sortBy('artist')" class="pad mid-bottom pointer">
        <span v-if="isSortArtist"><i class="fas fa-check muted" data-fa-transform="shrink-2"></i></span> Artist
      </div>
      <div @click="sortBy('upload')" class="pad mid-bottom pointer">
        <span v-if="isSortUpload"><i class="fas fa-check muted" data-fa-transform="shrink-2"></i></span> Upload date
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'DisplayOptions',
  data () {
    return {
    }
  },
  watch: {
    sortMethod () {
      this.showRightView(undefined)
    }
  },
  computed: {
    ...mapGetters(['sortMethod']),
    isSortPassage () {
      return this.sortMethod === 'passage'
    },
    isSortArtist () {
      return this.sortMethod === 'artist'
    },
    isSortUpload () {
      return this.sortMethod === 'upload'
    }
  },
  methods: {
    ...mapActions(['sortBy'])
  }
}
</script>

<style lang="less" scoped>
.display-options {
}
</style>
