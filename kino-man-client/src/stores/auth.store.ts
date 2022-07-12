import { defineStore } from "pinia";

export const getAuthStore = defineStore({
  id: "authStore",
  state: () => ({
    jwtToken: JSON.parse(localStorage.getItem("jwtToken") as string),
    userFromJwtToken: JSON.parse(
      localStorage.getItem("userFromJwtToken") as string
    ),
  }),
  actions: {
    async saveUser(
      jwtToken: string,
      userFromJwtToken: Record<string, unknown>
    ) {
      this.jwtToken = jwtToken;
      this.userFromJwtToken = userFromJwtToken;

      localStorage.setItem("jwtToken", JSON.stringify(this.jwtToken));
      localStorage.setItem(
        "userFromJwtToken",
        JSON.stringify(this.userFromJwtToken)
      );
    },

    clearUser() {
      this.jwtToken = null;
      this.userFromJwtToken = null;

      localStorage.removeItem("jwtToken");
      localStorage.removeItem("userFromJwtToken");
    },
  },
});
