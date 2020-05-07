<template>
  <ul class="px-tab-list">
    <slot />
  </ul>
</template>

<style lang="stylus">
.px-tab-list {
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  font: normal 11px Roboto, Arial, sans-serif;
  margin: 0;
  z-index: 1;
  position: relative;
  overflow: hidden;
}
</style>
