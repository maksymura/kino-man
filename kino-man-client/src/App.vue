<script setup>
import { RouterLink, RouterView } from "vue-router";
import { getAuthStore } from "@/stores";
import { router } from "@/router";

const authStore = getAuthStore();

function logoutUser() {
  authStore.clearUser();

  return router.push("/login");
}
</script>

<template>
  <div class="app-container bg-light">
    <nav
      v-show="authStore.userFromJwtToken"
      class="navbar navbar-expand navbar-dark bg-dark"
    >
      <div class="navbar-nav">
        <RouterLink to="/" class="nav-item nav-link">Home</RouterLink>
        <a @click="logoutUser()" class="nav-item nav-link">Logout</a>
      </div>
    </nav>
    <div class="wrapper">
      <RouterView />
    </div>
  </div>
</template>

<style>
@import "@/assets/base.css";
.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
