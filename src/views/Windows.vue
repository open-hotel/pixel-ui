<template>
  <div class="demo-windows">
    <px-window-manager class="windows-ui">
      <px-window minimizable>
        <h3>Lorem, ipsum dolor.</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi eum,
          qui ad aut facilis repellat nobis molestiae tenetur. Iusto, porro!
        </p>
        <template #footer>
          <px-btn>Default</px-btn>
        </template>
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
export default class Home extends Vue {
  data() {
    return {
      position: {
        x: 50,
        y: 150,
        width: 128,
        height: 128
      }
    }
  }
}
</script>
