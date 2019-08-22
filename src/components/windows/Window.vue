<template>
  <transition name="popup">
    <div
      v-if="visible"
      :class="[
        'window',
        { 'window--focused': current.focused, 'window--resizable': resizable }
      ]"
      tabindex="-1"
      :style="computedStyle"
      ref="window"
      @pointerdown="current.focused = true"
    >
      <template v-if="titlebar">
        <slot name="titleBar" v-if="$slots.titleBar" />
        <div
          v-else
          class="window-title"
          ref="titleBar"
          @pointerdown.prevent="handleMouseDown($event.clientX, $event.clientY)"
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
      <div class="window-content">
        <div class="window-content-body">
          <slot />
        </div>
        <div class="window-footer">
          <slot name="footer" />
        </div>
      </div>
      <div
        v-if="resizable"
        class="window-resizer"
        ref="resizeButton"
        @pointerdown="handleClickResize"
      ></div>
    </div>
  </transition>
</template>

<style lang="stylus">
.window {
  display: flex;
  flex-direction: column;
  position: absolute;
  background: #E0E0E0;
  color: #333;
  border-radius: 8px;
  border: 1px solid #000;
  box-shadow: 0 0 0 rgba(#000, 0.82);
  font-size: 14px;
  max-width: 100%;
  outline: none;
  transition: box-shadow 0.21s ease;
  font: 13px Roboto, Arial, sans-serif;
  background: #568ba4;

  &-title {
    flex: 0 auto;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0.5em;
    border: 2px double rgba(#FFF, 25%);
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
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: auto;
    position: relative;

    &-body {
      flex: 1;
      height: 100%;
      display: flex;
      flex-flow: column;
    }
  }

  &-resizer {
    display: block;
    position: absolute;
    width: 16px;
    height: 16px;
    bottom: 0;
    right: 0;
    cursor: nwse-resize;
    z-index: 1;
    user-select: none;
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
    flex-wrap: wrap;
    justify-content: flex-end;
    align-items: center;
  }
}

.popup {
  &-enter-active, &-leave-active {
    transition: all .4s cubic-bezier(.75,-0.5,0,1.75);
  }

  &-enter, &-leave-to {
    transform: scale(0.8);
    opacity: 0;
  }
}
</style>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop, Watch, Model } from 'vue-property-decorator'

@Component
export default class Window extends Vue {
  // Props
  @Prop({ type: Boolean, default: true }) visible!: boolean
  @Prop({ type: Boolean, default: true }) focused!: boolean
  @Prop({ type: Boolean, default: true }) titlebar!: boolean
  @Prop({ type: Boolean, default: true }) closeable!: boolean
  @Prop({ type: Boolean, default: false }) minimizable!: boolean
  @Prop({ type: Boolean, default: false }) resizable!: boolean
  @Prop({ type: Boolean, default: false }) minimized!: boolean
  @Prop({ type: Boolean, default: false }) closed!: boolean
  @Prop({ type: Boolean, default: true }) center!: boolean
  @Prop({ type: Number }) x!: number
  @Prop({ type: Number }) y!: number
  @Prop({ type: Number }) width!: number
  @Prop({ type: Number }) height!: number
  @Prop({ type: Number, default: 38 }) minWidth!: number
  @Prop({ type: Number, default: 38 }) minHeight!: number
  @Prop({ type: Number, default: 800 }) maxWidth!: number
  @Prop({ type: Number, default: 400 }) maxHeight!: number
  @Prop({ type: String, default: 'Message' }) title!: string

  @Watch('focused')
  private setFocused(focused: boolean) {
    this.current.focused = focused
  }

  @Watch('value')
  private setVisibility(visible: boolean) {
    this.current.visible = visible
  }

  @Watch('width')
  private setWidth(width: number) {
    this.current.width = width
  }

  @Watch('height')
  private setHeight(height: number) {
    this.current.height = height
  }

  @Watch('x')
  private setPositionX(x: number) {
    this.current.x = x
  }

  @Watch('y')
  private setPositionY(y: number) {
    this.current.y = y
  }

  offset = { x: 0, y: 0 }
  current = {
    visible: this.visible,
    x: this.x || 0,
    y: this.y || 0,
    width: this.width || 320,
    height: this.height || 240,
    focused: !!this.focused,
    minimized: this.minimized,
    closed: this.closed
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
    this.$parent.$el.removeEventListener('pointermove', this.handleLeaveResize)
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

  private handleResize(e: Event) {
    const { clientX, clientY } = e as PointerEvent
    const $el = e.target as HTMLDivElement
    const width = clientX - this.current.x
    const height = clientY - (this.current.y + 38)
    this.current = {
      ...this.current,
      width: this.normalizeValue(width, this.minWidth, this.maxWidth),
      height: this.normalizeValue(height, this.minHeight, this.maxHeight)
    }

    this.$emit('resize', this.current)
    this.$emit('update:width', this.current.width)
    this.$emit('update:height', this.current.height)
  }

  private handleClickResize(e: Event) {
    const $parent = this.$parent.$el as HTMLDivElement
    $parent.addEventListener('pointermove', this.handleResize)
    $parent.addEventListener(
      'pointerup',
      () => {
        $parent.removeEventListener('pointermove', this.handleResize)
      },
      { once: true }
    )
  }

  private handleLeaveResize(e: Event) {
    const $parent = this.$parent.$el as HTMLDivElement
    $parent.removeEventListener('pointermove', this.handleResize)
  }

  private normalizeValue(value: number, min: number, max: number) {
    return Math.min(Math.max(value, min), max)
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
    const el = this.$el as HTMLDivElement
    const parentEl = this.$parent.$el as HTMLDivElement
    const titlebar = this.$refs.titleBar as HTMLDivElement
    const maxX = (parentEl && parentEl.offsetWidth - 16) || Infinity
    const maxY =
      (parentEl && parentEl.offsetHeight - titlebar.offsetHeight) || Infinity
    const minX = (titlebar && 16 - titlebar.offsetWidth) || -Infinity
    const minY = 0
    const { x, y, width, height } = this.current

    return {
      top: `${this.normalizeValue(y, minY, maxY)}px`,
      left: `${this.normalizeValue(x, minX, maxX)}px`,
      width: `${this.normalizeValue(width, this.minWidth, this.maxWidth)}px`,
      height: `${this.normalizeValue(height, this.minHeight, this.maxHeight)}px`
    }
  }

  close() {
    this.current.visible = false
    this.current.closed = true

    this.$emit('input', false)
    this.$emit('update:closed', true)
    this.$emit('update:visible', this.current.visible)
    this.$emit('close')
  }

  minimize() {
    this.current.visible = false
    this.current.minimized = true

    this.$emit('input', this.current.visible)
    this.$emit('update:minimized', true)
    this.$emit('update:visible', this.current.visible)
  }

  mounted() {
    const $el = this.$el as HTMLDivElement
    const $parentEl = this.$parent.$el as HTMLDivElement
    const $resize = this.$refs.resizeButton as HTMLDivElement

    $parentEl.addEventListener('pointerdown', this.handleBlur.bind(this))

    if (this.center && !this.x && !this.y) {
      this.current = {
        ...this.current,
        x: $parentEl.offsetWidth / 2 - $el.offsetWidth / 2,
        y: $parentEl.offsetHeight / 2 - $el.offsetHeight / 2
      }
    }
  }
}
</script>
