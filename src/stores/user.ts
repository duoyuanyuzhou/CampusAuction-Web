import { defineStore } from 'pinia'
import User = API.User

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null as User | null,
    token: '' as string,
  }),

  getters: {
    isLogin: (state) => !!state.user,
    isAdmin: (state) => state.user?.role === 2,
  },

  actions: {
    setUser(user: User) {
      this.user = user
    },

    setToken(token: string) {
      this.token = token
    },

    clearUser() {
      this.user = null
      this.token = ''
    },
  },

  persist: {
    key: 'user',
    storage: localStorage,
    paths: ['user', 'token'],
  },
})
