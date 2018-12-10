<template>
  <form ref="form">
    <div class="card">
      <div class="card-content">
        <!-- <img src='@/assets/logo.png'> -->
        <h4>RecordBin UI</h4>
        <div class="content">
          <b-field label="Server URL"
                   :message="errors.server"
                   :type="{ 'is-danger': errors.server }">
            <b-input placeholder="https://api.recordbin.co"
                     @input="clearErrors()"
                     v-model="form.serverUrl">
              ></b-input>
          </b-field>

          <b-field label="Email"
                   :message="errors.email"
                   :type="{ 'is-danger': errors.email }">
            <b-input v-model="form.email"
                     @input="clearErrors()"
                     type="email"></b-input>
          </b-field>

          <b-field label="Password"
                   :message="errors.password"
                   :type="{ 'is-danger': errors.password }">
            <b-input v-model="form.password"
                     @input="clearErrors()"
                     type="password"></b-input>
          </b-field>
          <button class="button is-danger"
                  @click="doLogin()"
                  :disabled="formIsValid">Login</button>
          <button class="button is-pulled-right"
                  @click="doRegistration()"
                  :disabled="formIsValid">Register</button>
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
        email: null,
        password: null
      },
      form: {
        serverUrl: this.$store.state.api.serverUrl || 'https://api.recordbin.co',
        email: '',
        password: '',
      }
    }
  },
  computed: {
    formIsValid () {
      return !this.form.serverUrl || !this.form.email || !this.form.password || !this.$refs.form.checkValidity()
    },
  },
  beforeMount () {
    // If Already Logged in, go home
    if (this.$store.getters['api/isLoggedIn']) {
      this.$router.push({ name: 'home' })
    }
  },
  methods: {
    clearErrors () {
      this.errors.server = null
      this.errors.email = null
      this.errors.password = null
    },
    doLogin () {
      this.clearErrors()
      this.$store.dispatch('api/login', this.form)
        .then(() => this.$router.push({ name: 'home' }))
        .catch(error => this.handleError(error))
    },
    doRegistration () {
      this.clearErrors()
      this.$store.dispatch('api/register', this.form)
        .then(() => this.doLogin())
        .catch(error => this.handleError(error))
    },
    handleError (error) {
      console.error(error)
      if (!error.response) {
        // No response. Is Connection error (or CORS)
        this.errors.server = error.message
      } else if (error.response.status === 404) {
        this.errors.server = 'Server not found'
      } else {
        const formErrors = error.response.data
        if (formErrors.non_field_errors) {
          this.errors.email = formErrors.non_field_errors
        } else {
          for (var field in formErrors) {
            this.errors[field] = formErrors[field]
          }
        }
      }
    }
  }
}
</script>

<style scoped lang="sass">
.card
  margin: 0 auto
  max-width: 50%
</style>
