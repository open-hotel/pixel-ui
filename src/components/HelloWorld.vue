<template>
  <GUI class="game-ui">
    <button>Toggle</button>
    <Window :x="100" :y="100" :width="400" :height="400" title="Janela 1">
      <h1>Kk eae men</h1>
    </Window>
    <Window :x="50" :y="100" :width="200" :height="200" title="Janela 2">
      <h1>teste</h1>
    </Window>
    <Window :x="200" :y="150" :width="300" :height="300" title="Janela 3">
      <ul>
        <li>Olha lá</li>
        <li>Olha só</li>
      </ul>
    </Window>
  </GUI>
</template>

<style lang="stylus">
html,body
  width 100%
  height 100%

.game-ui
  background #000
</style>

<script lang="ts">
import Vue from "vue";
import GUI from "../components/ui/GUI.vue";
import { Window } from "../components/ui/window";

export default Vue.extend({
  data() {
    return {
      visible: false
    };
  },
  components: {
    GUI,
    Window
  }
});
</script>
