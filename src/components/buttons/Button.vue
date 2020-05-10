<template>
  <button :class="['px-btn', `px-btn-${color}`]" v-on="$listeners">
    <div class="px-btn-content">
      <slot />
    </div>
  </button>
</template>

<style lang="stylus">
@require '../../stylus/theme';

$shadow = 15%;
$shadowPressed = 50%;

.px-btn {
  display: inline-block;
  padding: 1em 2em;
  font: 12px Roboto, Arial;
  border-radius: 0.5em;
  outline: none;
  cursor: pointer;
  position: relative;
  margin: 0.25em;
  font-weight: bold;
  border: 1px solid #000;
  overflow: hidden;

  &:after {
    content: '';
    display: block;
    position: absolute;
    background: rgba(#FFF, 50%);
    height: 0.75em;
    width: 100%;
    top: 0;
    left: 0;
  }

  for $name, $color in $theme {
    &-{$name} {
      background: $color;
      color: contrast($color, #000).ratio > 9 ? #000 : #FFF;
    }
  }
}
</style>

<script>
export default {
  props: {
    color: {
      type: String,
      default: 'default'
    }
  }
}
</script>
