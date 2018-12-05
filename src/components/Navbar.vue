<template>
  <nav class="navbar is-light"
       role="navigation"
       aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item"
         href="/">
        <img src="@/assets/logo-social.png"
             width="25"
             height="25">
      </a>

      <router-link v-show="hasToken"
                   tag="a"
                   class="navbar-item"
                   :to="{'name': 'records'}">Records</router-link>
      <router-link v-show="hasToken"
                   tag="a"
                   class="navbar-item"
                   :to="{'name': 'apps'}">Apps</router-link>
      <router-link v-show="!hasToken"
                   tag="a"
                   class="navbar-item"
                   :to="{'name': 'login'}">Login</router-link>
      <a v-show="hasToken"
         class="navbar-item"
         @click="doLogout()">Logout</a>
    </div>
  </nav>

</template>

<script>

export default {
  name: "Navbar",
  data () {
    return {
      isActive: false
    };
  },
  computed: {
    hasToken () {
      return localStorage.getItem("recordbin_usertoken")
    }
  },
  methods: {
    doLogout () {
      this.$backend.logout()
      this.$router.push({ name: 'login' })
    }
  }
};
</script>

<style scoped>
</style>
