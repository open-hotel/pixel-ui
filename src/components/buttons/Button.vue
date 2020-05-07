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
  padding: 4px 16px;
  font: 12px Roboto, Arial;
  border-radius: 2px;
  border: 1px solid #000;
  outline: none;
  cursor: pointer;
  position: relative;
  margin: 2px;
  font-weight: bold;
  box-shadow: 0 1px 0 #000;

  &:before {
    content: '';
    display: block;
    position: absolute;
    top: 2px;
    left: 2px;
    right: 2px;
    bottom: 50%;
    z-index: 0;
    transition: all 0.21s ease;
  }

  &-content {
    position: relative;
    z-index: 1;
  }

  &:active {
    box-shadow: inset 2px 2px 0 rgba(#000, 82%);
  }

  for $name, $color in $theme {
    $bgColor = darken($color, $shadow);

    &-{$name} {
      background: $bgColor;
      color: contrast($color, #000).ratio > 8 ? #000 : #FFF;

      &:before {
        background: $color;
      }

      &:active {
        background: darken($bgColor, $shadowPressed);
        color: contrast(darken($color, $shadowPressed), #000).ratio > 8 ? #000 : #FFF;

        &:before {
          background: darken($color, $shadowPressed);
        }
      }
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
