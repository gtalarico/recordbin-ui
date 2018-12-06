<template>
  <form>
    <div class="card">
      <div class="card-content">
        <!-- <img src='@/assets/logo.png'> -->
        <div class="content">
          <b-field label="Server URL"
                   :message="errors.server"
                   :type="{ 'is-danger': errors.server }">
            <b-input placeholder="https://ww-recordbin.herokuapp.com"
                     @input="errors.server = null"
                     v-model="form.serverUrl">
              ></b-input>
          </b-field>

          <b-field label="Username">
            <b-input v-model="form.username"></b-input>
          </b-field>

          <b-field label="Password"
                   :message="errors.login"
                   :type="{ 'is-danger': errors.login }">
            <b-input v-model="form.password"
                     @input="errors.login = null"
                     type="password"></b-input>
          </b-field>
          <a class="button"
             @click="submitForm()"
             :disabled="!form.serverUrl || !form.username || !form.password">Login</a>
        </div>
      </div>
    </div>
  </form>
</template>

<script>

export default {
  name: 'Login',
  props: {

  },
  data () {
    return {
      errors: {
        server: null,
        login: null,
      },
      form: {
        serverUrl: this.$store.state.api.serverUrl || 'https://ww-recordbin.herokuapp.com',
        username: '',
        password: '',
      }
    }
  },
  computed: {

  },
  beforeMount () {
    // If Already Logged in, go home
    if (this.$store.getters['api/isLoggedIn']) {
      this.$router.push({ name: 'home' })
    }
  },
  methods: {
    submitForm () {
      this.loginErrors = null
      this.$store.dispatch('api/login', this.form)
        .then(() => this.$router.push({ name: 'home' }))
        .catch(error => {
          console.log(error)
          if (error.response) {
            // Error Responses from server
            this.errors.login = Object.values(error.response.data).flat()
          } else {
            this.errors.server = error.message
          }
        })
    }
  }
}
</script>

<style scoped lang="sass">
.card
  margin: 0 auto
  max-width: 50%
</style>
