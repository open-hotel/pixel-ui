<template>
  <div class="px-tab-container">
    <slot />
  </div>
</template>

<style lang="stylus">
.px-tab-container {
  flex: 1;
  display: block;
  background: #ffffff;
  position: relative;
  overflow: hidden;
  display: flex;
  height: 100%;
}
</style>
