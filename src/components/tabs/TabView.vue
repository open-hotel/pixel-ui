<template>
  <div class="px-tab-view" v-if="active || value === name" :key="name">
    <slot />
  </div>
</template>

<style lang="stylus">
.px-tab-view {
  display: block;
  flex: 1;
}
</style>

<script>
export default {
  props: {
    active: {
      type: Boolean,
      default: false
    },
    name: {
      type: String,
      required: true
    },
    value: {
      type: String
    }
  }
}
</script>
