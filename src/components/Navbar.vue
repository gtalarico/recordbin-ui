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
                   active-class="is-active"
                   class="navbar-item"
                   :to="{'name': 'records'}">Records</router-link>
      <router-link v-show="isLoggedIn"
                   tag="a"
                   active-class="is-active"
                   class="navbar-item"
                   :to="{'name': 'apps'}">Apps</router-link>
      <a v-show="serverUrl"
         class="navbar-item"
         :href="serverUrl"
         target="blank">Api</a>
      <router-link v-show="!isLoggedIn"
                   tag="a"
                   active-class="is-active"
                   class="navbar-item"
                   :to="{'name': 'login'}">Login</router-link>
      <a v-show="isLoggedIn"
         class="navbar-item"
         @click="doLogout()">Logout</a>
      <span v-show="isLoggedIn"
            class="navbar-item is-size-7 has-text-grey">{{userEmail}}</span>
      <span v-show="isLoggedIn"
            class="navbar-item is-size-7 has-text-grey">{{serverUrl}}</span>
    </div>
  </nav>

</template>

<script>
import { mapGetters, mapState } from 'vuex'

export default {
  name: "Navbar",
  data () {
    return {

    }
  },
  mounted () {

  },
  computed: {
    ...mapGetters({
      isLoggedIn: 'api/isLoggedIn'
    }),
    ...mapState('api', ['user', 'serverUrl']),
    userEmail () {
      return this.user ? this.user.email : ''
    }
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
