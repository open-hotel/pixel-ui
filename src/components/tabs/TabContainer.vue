<template>
  <div class="px-tab-container" v-if="active || value === name" :key="name">
    <slot />
  </div>
</template>

<style lang="stylus">
.px-tab-container {
  display: block;
  border: 1px solid #000;
  background: #ffffff;
  position: relative;
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
