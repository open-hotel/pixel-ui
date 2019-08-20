<template>
  <div class="about">
    <h1>This is an about page</h1>
    <button @click="increment">{{ counter }}</button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      counter: 0
    };
  },
  methods: {
    increment() {
      this.counter++;
    }
  }
});
</script>
