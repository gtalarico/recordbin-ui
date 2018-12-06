import Vue from "vue"
import Router from "vue-router"

import store from "@/store"
import Login from "@/views/Login"
import Records from "@/views/Records"
import Apps from "@/views/Apps"

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: "/",
      name: "home",
      redirect: "records"
    },
    {
      path: "/records",
      name: "records",
      component: Records,
      meta: { requiresAuth: true }
    },
    {
      path: "/apps",
      name: "apps",
      component: Apps,
      meta: { requiresAuth: true }
    },
    {
      path: "/login",
      name: "login",
      component: Login
    }
  ]
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.meta.requiresAuth
  const isLoggedIn = store.getters["api/isLoggedIn"]
  if (requiresAuth && !isLoggedIn) {
    return next("/login")
  }
  next()
})

export default router
