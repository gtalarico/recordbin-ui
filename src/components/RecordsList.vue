<template>
  <section v-if="selectedApp">

    <b-table :data="records.filter(r => r.app === selectedApp.name)"
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
        <pre class="code-detail">{{props.row.data}}</pre>
      </template>

      <template slot="empty">
        <section class="section">
          <div class="content has-text-grey has-text-centered">
            <p>
              <b-icon icon="emoticon-sad"
                      size="is-large">
              </b-icon>
            </p>
            <p>No records for <strong>{{selectedApp.name}}</strong></p>
          </div>
        </section>
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
  props: [
    'records',
    'selectedApp'
  ],
  data () {
    return {
      openedDetail: [],
      data: [],
      checkedRows: [],
    }
  },
  mounted () {

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

