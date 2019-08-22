<template>
  <div class="demo-windows">
    <px-window-manager class="windows-ui">
      <px-window minimizable>
        <h3>Lorem, ipsum dolor.</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi eum,
          qui ad aut facilis repellat nobis molestiae tenetur. Iusto, porro!
        </p>
        <px-tab-list>
          <px-tab-list-item v-model="tab" target="home"
            >Início</px-tab-list-item
          >
          <px-tab-list-item v-model="tab" target="rooms"
            >Quartos</px-tab-list-item
          >
          <px-tab-list-item v-model="tab" target="events"
            >Eventos</px-tab-list-item
          >
          <px-tab-list-item v-model="tab" target="me"
            >Meu Mundo</px-tab-list-item
          >
          <px-tab-list-item v-model="tab" target="search"
            >Buscar</px-tab-list-item
          >
        </px-tab-list>
        <div>
          <px-tab-view v-model="tab" name="home">
            <h1>Home</h1>
          </px-tab-view>
          <px-tab-view v-model="tab" name="rooms">
            <h1>Quartos</h1>
          </px-tab-view>
          <px-tab-view v-model="tab" name="events">
            <h1>Eventos</h1>
          </px-tab-view>
          <px-tab-view v-model="tab" name="me">
            <h1>Meus</h1>
          </px-tab-view>
          <px-tab-view v-model="tab" name="search">
            <h1>Busca</h1>
          </px-tab-view>
        </div>
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
      tab: '',
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
