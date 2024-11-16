<template>
  <div class="about">
    <div style="display: flex; flex-direction: column">
      <h1>This is an about page</h1>

      <h1>{{ count }}</h1>
      <button @click="useCounterStore().increment()">Click</button>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useCounterStore } from "@/stores/counter";

const { count } = storeToRefs(useCounterStore());
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
