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
                     type="password"></b-input>
          </b-field>
          <a class="button"
             @click="submitForm()"
             :disabled="!form.username || !form.password">Login</a>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import auth from '@/auth'

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
        serverUrl: auth.readServerUrl() || 'https://ww-recordbin.herokuapp.com',
        username: '',
        password: '',
      }
    }
  },
  computed: {

  },
  methods: {
    submitForm () {
      this.loginErrors = null
      this.$backend.login(this.form).then(() => {
        this.$router.push('/')
      }).catch(error => {
        debugger
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
