import backend from "@/backend"

export default {
  namespaced: true,
  state: {
    userToken: null,
    serverUrl: null
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
    }
  },
  actions: {
    login(context, form) {
      context.commit("setServerUrl", form.serverUrl)
      return backend
        .login(form)
        .then(userToken => {
          context.commit("setUserToken", userToken)
        })
        .catch(error => {
          throw error
        })
    },
    logout(context) {
      return backend.logout().then(() => context.commit("clearUserToken"))
    }
  }
}
