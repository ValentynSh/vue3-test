import { defineStore } from "pinia";
import type UserModel from "@/types/userModel";

interface UserStoreState {
  user: UserModel | null;
}

export const useUserStore = defineStore("userStore", {
  state: (): UserStoreState => ({
    user: null,
  }),
  actions: {
    setUser(user: UserModel) {
      this.$state.user = user;
    },
    getUser() {
      return this.$state.user;
    },
    deleteUser() {
      this.$state.user = null;
    },
  },
});
