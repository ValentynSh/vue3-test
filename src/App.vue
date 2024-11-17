<script setup lang="ts">
import { storeToRefs } from "pinia";
import { RouterLink, RouterView, useRoute } from "vue-router";
import { computed, ref } from "vue";
import HelloWorld from "./components/HelloWorld.vue";
import SetUserForm from "./components/SetUserForm.vue";
import { useUserStore } from "@/stores/userStore";

const route = useRoute();
const userStore = useUserStore();
const showUserForm = ref<boolean>(false);
const { user } = storeToRefs(userStore);
const isUserAvailable = computed(() => user.value !== null);
const routName = computed(() => {
  if (!route.name) return "Welcome";
  const string = route.name.toString();
  return string.charAt(0).toUpperCase() + string.slice(1);
});

function test() {
  showUserForm.value = true;
  console.log("click", showUserForm.value);
}
</script>

<template>
  <div class="layout-container">
    <Teleport to="body">
      <SetUserForm v-if="showUserForm" @on-form-close="showUserForm = false" />
    </Teleport>
    <header>
      <!-- <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" /> -->

      <div class="wrapper">
        <HelloWorld :msg="`${routName} page`" />

        <nav class="menu-block">
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/about">About</RouterLink>
          <RouterLink
            v-if="isUserAvailable"
            :to="{
              name: 'profile',
              params: { userName: user?.username ?? '' },
            }"
            >Profile</RouterLink
          >
        </nav>
        <button @click="test()" class="login-menu-button" v-if="user === null">
          Login
        </button>
        <button @click="test()" class="login-menu-button" v-else>
          Edit profile
        </button>
      </div>
    </header>
    <div class="content">
      <RouterView />
    </div>
  </div>
</template>

<style scoped lang="scss">
.login-menu-button {
  position: absolute;
  right: 0px;
  background-color: transparent;
  color: gray;
  font-size: 32px;
  appearance: none;
  border: none;
  &:hover {
    cursor: pointer;
    color: #20e68b;
  }
}

.menu-block {
  position: relative;
  display: flex;
  font-size: 32px;
  & a {
    padding: 0px 10px;
    display: flex;
    line-height: normal;
  }
}
.layout-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  flex: 1;
  min-height: 100vh;
}
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  //   width: 100%;
  //   font-size: 12px;
  //   text-align: center;
  // margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

header .wrapper {
  position: relative;
  display: flex;
  place-items: flex-start;
  flex-wrap: wrap;
  height: 100px;
  align-items: center;
}
</style>
