<script setup lang="ts">
import { ref, watch } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const routeName = ref<string>("");

function capitalizeFirstLetter(string: string): string {
  if (!string) return "";
  return string.charAt(0).toUpperCase() + string.slice(1);
}

watch(
  () => route.params.userName,
  (newUserName) => {
    if (newUserName && typeof newUserName === "string") {
      routeName.value = capitalizeFirstLetter(newUserName);
    }
  },
  { immediate: true }
);
</script>

<template>
  <div class="user-view">
    <h1 class="page-name">Hello {{ routeName }}</h1>
  </div>
</template>

<style scoped></style>
