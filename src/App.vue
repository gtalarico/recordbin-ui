<template>
  <div id="app">

    <navbar />

    <div class="container">
      <div class="section">
        <router-view />
      </div>
      <!-- <el-row type="flex"
                class="row-bg"
                justify="center">
          <img src='@/assets/logo.png'
               class="justify-center" />
        </el-row> -->
    </div>
  </div>
</template>

<script>

import Navbar from '@/components/Navbar.vue'

export default {
  name: 'app',
  components: {
    'navbar': Navbar
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
.el-header {
  background-color: #3e3d44;
  color: #fafafa;
  line-height: 60px;
}

* {
  padding: 0;
  margin: 0;
}

.wrapper {
  height: 100%;
}

header {
  width: 100%;
  padding: 0 20px;
  z-index: 1;
  box-sizing: border-box;
}

/* header::after {
  display: inline-block;
  content: "";
  height: 100%;
  vertical-align: middle;
} */

.container {
  padding-top: 80px;
}

.menu {
  height: 100%;
}

.content {
  padding: 20px;
}

.header-logo {
  display: inline-block;
  vertical-align: middle;
}
</style>
