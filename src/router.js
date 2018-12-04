import Vue from "vue"
import Router from "vue-router"
import Login from "@/views/Login"
import Records from "@/views/Records"

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: "/",
      name: "home"
    },
    {
      path: "/records",
      name: "records",
      component: Records
    },
    {
      path: "/login",
      name: "login",
      component: Login
    }
  ]
})
