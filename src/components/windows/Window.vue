<template>
  <transition name="popup">
    <div
      v-if="current.value"
      :class="[
        'window',
        { 'window--focused': current.focused, 'window--resizable': resizable }
      ]"
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
              class="window-action window-action-minimize"
              @click="minimize"
            ></button>
            <button
              v-if="closeable"
              class="window-action window-action-close"
              @click="close"
            ></button>
          </div>
        </div>
      </template>
      <div class="window-content" :style="computedContentStyle">
        <div class="window-content-body">
          <slot />
        </div>
        <div class="window-footer">
          <slot name="footer" />
        </div>
      </div>
    </div>
  </transition>
</template>

<style lang="stylus">
.window {
  position: absolute;
  background: #E0E0E0;
  color: #333;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #000;
  box-shadow: 0 0 0 rgba(#000, 0.82);
  font-size: 14px;
  max-width: 100%;
  outline: none;
  transition: all 0.21s ease, top, left, width, height 0s;
  font: 13px Roboto, Arial, sans-serif;

  &-title {
    flex: 0 auto;
    display: flex;
    flex-direction: row;
    align-items: center;
    background: #568ba4;
    padding: 0.5em;
    border: 2px double #69a6c3;
    border-bottom: none;
    border-radius: 8px 8px 0 0;
    cursor: default;

    &-text {
      flex: 1;
      color: #FFF;
      text-align: center;
    }
  }

  &-content {
    display: flex;
    flex-direction: column;
    overflow: auto;
    position: relative;
    padding: 1em;
    min-width: 128px;
    min-height: 128px;

    &-body {
      flex: 1;
    }
  }

  &--resizable {
    p(selector());

    ^[0]-content {
      resize: both;
    }
  }

  &--focused {
    box-shadow: 0 4px 8px rgba(#000, 0.82), 0 4px 0 rgba(#000, 0.82);
    z-index: 99999999;
  }

  &-action {
    width: 20px;
    height: 20px;
    border: none;
    background-color: transparent;
    background-image: url('./assets/controls.png');
    background-repeat: no-repeat;
    cursor: pointer;
    margin: 0 2px;

    &-close {
      background-position: -140px -10px;

      &:hover {
        background-position: -200px -10px;
      }

      &:active {
        background-position: -169px -10px;
      }
    }

    &-minimize {
      background-image: url('./assets/minimize.png');

      &:hover {
        opacity: 0.82;
      }

      &:active {
        background-image: url('./assets/minimize-press.png');
      }
    }
  }

  &-footer {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    padding: 0.25em 0.5em;
  }
}

.popup {
  &-enter-active, &-leave-active {
    transform: scale(1);
    opacity: 1;
  }

  &-enter, &-leave-to {
    transform: scale(.95)
    opacity: 0;
  }
}
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
  @Prop({ type: Boolean, default: false }) minimizable?: boolean
  @Prop({ type: Boolean, default: true }) resizable?: boolean
  @Prop({ type: Boolean, default: false }) minimized?: boolean
  @Prop({ type: Boolean, default: true }) value?: boolean
  @Prop({ type: Number }) x?: number
  @Prop({ type: Number }) y?: number
  @Prop({ type: Number }) width?: number
  @Prop({ type: Number }) height?: number
  @Prop({ type: String, default: 'Message' }) title?: string

  @Watch('value')
  private setVisibility(visible: boolean) {
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
      left: `${this.current.x}px`
    }
  }

  get computedContentStyle() {
    return {
      width: `${this.current.width}px`,
      height: `${this.current.height}px`
    }
  }

  close() {
    this.current.value = false
    this.$emit('input', this.current.value)
    this.$emit('close')
  }

  minimize() {
    this.current.value = false

    this.$emit('input', this.current.value)
    this.$emit('update:minimized', true)
  }

  mounted() {
    const $el = this.$el as HTMLDivElement
    this.$parent.$el.addEventListener('pointerdown', this.handleBlur.bind(this))
  }
}
</script>