import Vue from "vue"
import Vuex from "vuex"

import apiStore from "./api.store.js"
import storageHelper from "./storage.helper.js"

Vue.use(Vuex)

const onStoreChange = (mutation, state) => {
  storageHelper.setItem("state", state)
}

export default new Vuex.Store({
  modules: {
    api: apiStore
  },
  mutations: {
    initStore(initialState) {
      const store = this
      const savedState = storageHelper.getItem("state")
      if (savedState) {
        store.replaceState(Object.assign(initialState, savedState))
      }
      store.subscribe(onStoreChange)
    }
  }
})
