<template>
  <div id="app">

    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <router-link tag="a"
                     :to="{'name': 'login'}">Login</router-link>
        <router-link tag="a"
                     :to="{'name': 'records'}">Records</router-link>
      </el-header>
      <el-main>
        <el-row type="flex"
                class="row-bg"
                justify="center">
          <img src='@/assets/logo.png'
               class="justify-center" />
        </el-row>
        <router-view />
      </el-main>
    </el-container>

  </div>
</template>

<script>

export default {
  name: 'app',
  components: {
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
