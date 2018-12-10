<template>
  <section>
    <b-loading :is-full-page="true"
               :active.sync="!apps.length && !records.length"
               :can-cancel="false"></b-loading>
    <div class="columns">
      <div class="column is-one-third">
        <apps-list :apps="apps"
                   @appSelected="selectApp" />
      </div>
      <div class="column">
        <records-list :records="records"
                      :selectedApp="selectedApp" />
      </div>
    </div>

  </section>
</template>

<script>

import RecordsList from '@/components/RecordsList'
import AppsList from '@/components/AppsList'

export default {
  name: 'AppRecords',
  components: {
    'records-list': RecordsList,
    'apps-list': AppsList,
  },
  props: {
  },
  data () {
    return {
      apps: [],
      records: [],
      selectedApp: null
    }
  },
  methods: {
    selectApp (app) {
      this.selectedApp = app
    }
  },
  mounted () {
    this.$backend.fetch('apps').then(apps => this.apps = apps)
    this.$backend.fetch('records').then(records => this.records = records)
  }
}
</script>

<style lang="sass">

tr.detail
  td, div
    margin: 0
    padding: 0 !important
  pre
    padding: 20




</style>

