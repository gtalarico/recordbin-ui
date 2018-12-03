<template>
  <el-row type="flex"
          class="row-bg"
          justify="center">
    <el-col :span="12">
      <el-card shadow="always">
        <el-form :model="form"
                 status-icon
                 ref="form"
                 class="demo-ruleForm">
          <!-- label-width="120px" -->
          <el-form-item label="Username"
                        prop="username">
            <el-input type="text"
                      v-model="form.username"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="Confirm"
                        prop="password">
            <el-input type="password"
                      v-model="form.password"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary"
                       @click="submitForm()">Submit</el-button>
          </el-form-item>
        </el-form>
      </el-card>
      {{response}}
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'Login',
  props: {

  },
  data () {
    return {
      response: null,
      form: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    submitForm () {
      this.$backend.login(this.form).then(response => {
        this.response = response
      })
    }
  }
}
</script>

<style scoped>
</style>
