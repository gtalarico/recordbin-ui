<template>
  <section>

    <b-table :data="data"
             :checked-rows.sync="checkedRows"
             :is-row-checkable="(row) => row.id !== 3"
             :opened-detailed="openedDetail"
             detailed
             detail-key="id"
             hoverable>
      <!-- checkable -->
      <!-- striped -->
      <!-- narrowed -->

      <template slot="bottom-left"
                v-if="checkedRows.length">
        <b>Total checked</b>: {{ checkedRows.length }}
      </template>

      <template slot-scope="props">
        <!-- <b-table-column field="id"
                            label="Id">
              {{ props.row.id.split('-')[0] }}
            </b-table-column> -->
        <b-table-column field="created_on"
                        label="Created On">
          {{ props.row.created_on | formatDatetime }}
        </b-table-column>
        <b-table-column field="app"
                        label="App">
          <span class="tag">
            {{ props.row.app }}
          </span>
        </b-table-column>
      </template>

      <template slot="detail"
                slot-scope="props">
        <!-- <article class="media"> -->
        <!-- <div class="media-content"> -->
        <!-- <div class="content"> -->
        <pre class="code-detail">{{props.row.data}}</pre>
        <!-- </div> -->
        <!-- </div> -->
        <!-- </article> -->
      </template>

    </b-table>
    <!-- <button class="button field is-danger"
            @click="checkedRows = []"
            :disabled="!checkedRows.length">
      <b-icon icon="close"></b-icon>
      <span>Clear checked</span>
    </button> -->
  </section>
</template>

<script>
export default {
  name: 'Records',
  props: {
  },
  data () {
    return {
      openedDetail: [],
      data: [],
      checkedRows: [],
    }
  },
  mounted () {
    this.$backend.fetch('records').then(records => this.data = records)
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

