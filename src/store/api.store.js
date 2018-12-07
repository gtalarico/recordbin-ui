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
    setUserToken(state, value) {
      state.userToken = value
    },
    setServerUrl(state, value) {
      state.serverUrl = value
    },
    clearUserToken(state) {
      state.userToken = null
    },
    clearUser(state) {
      state.user = null
    },
    setUser(state, value) {
      state.user = value
    }
  },
  actions: {
    login(context, form) {
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
