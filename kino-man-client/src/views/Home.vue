<script setup>
import { getAuthStore } from "@/stores";
const { userFromJwtToken } = getAuthStore();
</script>

<script>
import { getServerTime } from "@/services";

export default {
  data() {
    return {
      serverTime: "",
    };
  },
  async created() {
    const { serverTime } = await getServerTime();
    this.serverTime = serverTime;
  },
};
</script>

<template>
  <div class="home_wrapper">
    <h1>Hi {{ userFromJwtToken.name }}!</h1>
    <div>When you opened the page, server time was: {{ serverTime }}</div>
  </div>
</template>

<style>
.home_wrapper {
  text-align: center;
  max-height: 400px;
}
</style>
