import Vue from "vue"
import App from "@/App.vue"

import router from "@/router"
import store from "@/store"
import backend from "@/backend"

import "@/filters"
import "@/plugins/buefy.js"

Vue.config.productionTip = false
Vue.prototype.$backend = backend

const vue = new Vue({
  router,
  store,
  beforeCreate() {
    this.$store.commit("initStore")
  },
  render: h => h(App)
})

vue.$mount("#app")
