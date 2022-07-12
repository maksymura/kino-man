import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/Home.vue";
import LoginView from "@/views/Login.vue";
import RegisterView from "@/views/Register.vue";
import { getAuthStore } from "@/stores";
import { publicPages } from "./router.constants";

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/register",
      name: "register",
      component: RegisterView,
    },
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
  ],
});

router.beforeEach(async (to) => {
  const authRequired = !publicPages.includes(to.path);
  const authStore = getAuthStore();

  if (authRequired && !authStore.userFromJwtToken) {
    return "/login";
  }
});
