import Vue from "vue"
import Router from "vue-router"
import Login from "@/views/Login"
import Records from "@/views/Records"
import Apps from "@/views/Apps"

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      redirect: "records"
    },
    {
      path: "/records",
      name: "records",
      component: Records
    },
    {
      path: "/apps",
      name: "apps",
      component: Apps
    },
    {
      path: "/login",
      name: "login",
      component: Login
    }
  ]
})
