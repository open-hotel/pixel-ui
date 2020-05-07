<template>
  <li
    :class="{
      'px-tab-list-item': true,
      'px-tab-list-item--active': active || value === target
    }"
    @click="$emit('input', target)"
  >
    <span>
      <slot />
    </span>
  </li>
</template>

<style lang="stylus">
.px-tab-list-item {
  display: flex;
  flex: 1;
  background: rgba(#FFF, 50%);
  border-bottom: 0;
  border: 1px solid #000;
  border-bottom: 0;
  padding: 0.4em 0.8em;
  cursor: pointer;
  color: #000;
  text-align: center;
  align-items: center;
  justify-content: center;
  position: relative;
  border-radius: 4px 4px 0 0;

  & + &, &:first-child {
    border-left: 0;
  }

  &:last-child {
    border-right: 0;
  }

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
