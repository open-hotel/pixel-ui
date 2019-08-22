<template>
  <li
    :class="{
      'px-tab-list-item': true,
      'px-tab-list-item--active': active || value === target
    }"
    @click="$emit('input', target)"
  >
    <slot />
  </li>
</template>

<style lang="stylus">
.px-tab-list-item {
  background: rgba(#FFF, 50%);
  border: 1px solid #000;
  border-bottom: 0;
  padding: 0.25em 0.5em;
  border-radius: 0.5em 0.5em 0 0;
  cursor: pointer;
  color: #000;

  &--active {
    background: #FFF;
  }
}
</style>

<script>
export default {
  props: {
    active: {
      type: Boolean,
      default: false
    },
    target: {
      type: String
    },
    value: {
      type: String
    }
  }
}
</script>
