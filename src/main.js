import Vue from "vue"
import App from "@/App.vue"

import router from "@/router"
import $backend from "@/backend"
import "./plugins/element.js"
Vue.prototype.$backend = $backend
Vue.config.productionTip = false

const vue = new Vue({
  router,
  render: h => h(App)
})

vue.$mount("#app")
