<template>
  <transition name="popup">
    <div
      v-if="current.value"
      :class="['window', { 'window--focused': current.focused }]"
      tabindex="-1"
      :style="computedStyle"
      ref="window"
      @mousedown="current.focused = true"
    >
      <template v-if="titlebar">
        <slot name="titleBar" v-if="$slots.titleBar" />
        <div
          v-else
          class="window-title"
          ref="titleBar"
          @mousedown.prevent="handleMouseDown($event.clientX, $event.clientY)"
        >
          <slot name="title" v-if="$slots.title" />
          <span v-else-if="title" class="window-title-text">{{ title }}</span>
          <slot name="windowActions" v-if="$slots.windowActions" />
          <div class="window-actions">
            <button
              v-if="closeable"
              class="window-action window-action-close"
              @click="close"
            ></button>
          </div>
        </div>
      </template>
      <div class="window-content">
        <slot />
      </div>
    </div>
  </transition>
</template>

<style lang="stylus">
.window
  position absolute
  width 320px
  height 240px
  background #E0E0E0
  color: #333
  border-radius: 8px
  overflow hidden
  border: 1px solid #000
  box-shadow: 0 0 0 rgba(#000,.82)
  resize both
  font-size 14px
  min-width 128px
  min-height 128px
  max-width 100%
  max-height 80vh
  outline none
  transition all .21s ease, top, left, width, height 0s
  font bold 13px Roboto, Arial, sans-serif
  &-title
    display flex
    flex-direction row
    align-items center
    background #568ba4
    padding .5em
    border 2px double #69a6c3
    border-bottom none
    border-radius 8px 8px 0 0
    cursor default
    &-text
      flex 1
      color #FFF
      text-align center

  &--focused
    box-shadow: 0 4px 8px rgba(#000,.82), 0 4px 0 rgba(#000,.82)
    z-index 99999999

  &-action
    width 20px
    height 20px
    border none
    background-color transparent
    background-image url('./assets/controls.png')
    background-repeat no-repeat

    &-close
      background-position -140px -10px
      &:hover
        background-position -200px -10px
      &:active
        background-position -169px -10px

.popup
  &-enter-active,
  &-leave-active
    transform scale(1)
    opacity 1
  &-enter,
  &-leave-to
    transform scale(.809)
    opacity 0
</style>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop, Watch } from 'vue-property-decorator'

@Component
export default class Window extends Vue {
  // Props
  @Prop({ type: Boolean, default: true }) focused?: boolean
  @Prop({ type: Boolean, default: true }) titlebar?: boolean
  @Prop({ type: Boolean, default: true }) closeable?: boolean
  @Prop({ type: Boolean, default: true }) value?: boolean
  @Prop({ type: Number }) x?: number
  @Prop({ type: Number }) y?: number
  @Prop({ type: Number }) width?: number
  @Prop({ type: Number }) height?: number
  @Prop({ type: String, default: 'Message' }) title?: string

  @Watch('value')
  setVisibility(visible: boolean) {
    this.current.value = visible
  }

  offset = { x: 0, y: 0 }
  current = {
    value: this.value,
    x: this.x,
    y: this.y,
    width: this.width,
    height: this.height,
    focused: this.focused
  }

  private handleBlur(e: any) {
    e.stopPropagation()

    this.current.focused = e.path.some((el: HTMLElement) => el === this.$el)
  }

  private handleStopDrag(e: Event) {
    const { clientX, clientY } = e as PointerEvent
    const $el = e.target as any

    this.$parent.$el.removeEventListener('pointerup', this.handleStopDrag)
    this.$parent.$el.removeEventListener('pointermove', this.handleMove)
  }

  private handleMove(e: Event) {
    const { clientX, clientY } = e as PointerEvent

    this.current = {
      ...this.current,
      x: this.offset.x + clientX,
      y: this.offset.y + clientY
    }

    this.$emit('move', this.current)
    this.$emit('update:x', this.current.x)
    this.$emit('update:y', this.current.y)
  }

  private handleMouseDown(x: number, y: number) {
    const window = this.$refs.window as HTMLDivElement

    this.current.focused = true

    this.offset = {
      x: window.offsetLeft - x,
      y: window.offsetTop - y
    }

    this.$parent.$el.addEventListener('pointerup', this.handleStopDrag)
    this.$parent.$el.addEventListener('pointermove', this.handleMove)
  }

  get computedStyle() {
    return {
      top: `${this.current.y}px`,
      left: `${this.current.x}px`,
      width: `${this.current.width}px`,
      height: `${this.current.height}px`
    }
  }

  close() {
    this.current.value = false
    this.$emit('input', this.current.value)
  }

  mounted() {
    const $el = this.$el as HTMLDivElement
    this.$parent.$el.addEventListener('pointerdown', this.handleBlur.bind(this))
  }
}
</script>
