import backend from "@/backend"

export default {
  namespaced: true,
  state: {
    userToken: null,
    serverUrl: null,
    user: null
  },
  getters: {
    isLoggedIn: state => {
      return state.userToken !== null
    }
  },
  mutations: {
    setServerUrl(state, value) {
      state.serverUrl = value
    },
    clearServerUrl(state) {
      state.serverUrl = null
    },
    setUserToken(state, value) {
      state.userToken = value
    },
    clearUserToken(state) {
      state.userToken = null
    },
    setUser(state, value) {
      state.user = value
    },
    clearUser(state) {
      state.user = null
    }
  },
  actions: {
    login(context, form) {
      // Must be set here, request interceptor
      context.commit("setServerUrl", form.serverUrl)
      return backend
        .login(form)
        .then(userToken => {
          context.commit("setUserToken", userToken)
          backend.getUser().then(user => {
            context.commit("setUser", user)
          })
        })
        .catch(error => {
          context.commit("clearServerUrl")
          context.commit("clearUserToken")
          context.commit("clearUser")
          throw error
        })
    },
    register(context, form) {
      context.commit("setServerUrl", form.serverUrl)
      return backend.register(form)
    },
    logout(context) {
      return backend.logout().then(() => {
        context.commit("clearUserToken")
        context.commit("clearUser")
      })
    }
  }
}
