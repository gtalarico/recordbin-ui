<template>
  <el-row type="flex"
          class="row-bg"
          justify="center">
    <el-col :span="12">
      <el-card shadow="always">
        {{records}}
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'Records',
  props: {

  },
  data () {
    return {
      records: null,
    }
  },
  mounted () {
    this.$backend.fetch('records').then(records => this.records = records)
  }
}
</script>

<style scoped>
</style>
