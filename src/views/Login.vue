<template>
  <form>
    <div class="card">
      <div class="card-content">
        <!-- <img src='@/assets/logo.png'> -->
        <div class="content">
          <b-field label="Username">
            <b-input v-model="form.username"></b-input>
          </b-field>

          <b-field label="Password"
                   :type="{ 'is-danger': loginErrors }"
                   :message="loginErrors">
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


export default {
  name: 'Login',
  props: {

  },
  data () {
    return {
      loginErrors: null,
      form: {
        username: '',
        password: ''
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
        this.loginErrors = Object.values(error.response.data).flat()
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
