<template>
  <div id="app">

    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <span>Tom</span>
      </el-header>
      <el-main>
        <el-row type="flex"
                class="row-bg"
                justify="center">
          <!-- <img src='@/assets/logo.png'
               class="justify-center" /> -->
        </el-row>
        <login></login>
      </el-main>
    </el-container>

  </div>
</template>

<script>
import Login from './views/Login.vue'

export default {
  name: 'app',
  components: {
    Login
  },
  data () {
    return {
      records: null
    }
  },
  mounted () {

  }
}
</script>

<style>
body {
  margin: 0;
}

.el-header {
  background-color: #3e3d44;
  color: #fafafa;
  line-height: 60px;
}
</style>
