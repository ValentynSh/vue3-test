<script setup lang="ts">
// defineProps<{
//   msg: string
// }>()
const props = defineProps({
  msg: String,
});
</script>

<template>
  <div class="greetings">
    <h1 class="page-name">{{ msg }}</h1>
  </div>
</template>

<style scoped>
.greetings {
  display: flex;
  line-height: normal;
  width: 300px;
  max-width: 500px;
  overflow: hidden;
}
.page-name {
  color: #20e68b;
  line-height: normal;
  margin: 0px;
  padding: 0px;
  padding-bottom: 10px;
  top: 0;
  display: inline-block;
  font-size: 42px;
}
</style>
