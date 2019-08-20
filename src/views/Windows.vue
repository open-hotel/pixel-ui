<template>
  <div class="demo-windows">
    <px-window-manager class="windows-ui">
      <px-window>
        <h1>Hello World!</h1>
        <px-btn>Default</px-btn>
        <px-btn color="success">Success</px-btn>
        <px-btn color="info">Info</px-btn>
        <px-btn color="warning">Warning</px-btn>
        <px-btn color="danger">Danger</px-btn>
      </px-window>
    </px-window-manager>
  </div>
</template>

<style lang="stylus">
.windows-ui {
  width: 100vw;
  height: 100vh;
}
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Home extends Vue {}
</script>
