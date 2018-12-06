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

      <router-link v-show="isLoggedIn"
                   tag="a"
                   class="navbar-item"
                   :to="{'name': 'records'}">Records</router-link>
      <router-link v-show="isLoggedIn"
                   tag="a"
                   class="navbar-item"
                   :to="{'name': 'apps'}">Apps</router-link>
      <router-link v-show="!isLoggedIn"
                   tag="a"
                   class="navbar-item"
                   :to="{'name': 'login'}">Login</router-link>
      <a v-show="isLoggedIn"
         class="navbar-item"
         @click="doLogout()">Logout</a>
    </div>
  </nav>

</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: "Navbar",
  data () {
    return {
      isActive: false
    };
  },
  mounted () {

  },
  computed: {
    ...mapGetters({
      isLoggedIn: 'api/isLoggedIn'
    })
  },
  methods: {
    doLogout () {
      this.$store.dispatch('api/logout').then(() => {
        this.$router.push({ name: 'login' })
      })
    }
  }
};
</script>

<style scoped>
</style>
