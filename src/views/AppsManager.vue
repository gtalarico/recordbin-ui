<template>
  <section>

    <b-table :data="data"
             :checked-rows.sync="checkedRows"
             :is-row-checkable="(row) => row.id !== 3"
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
        <b-table-column field="name"
                        label="App Name">
          {{ props.row.name }}
        </b-table-column>
        <b-table-column field="owner"
                        label="Owner">
          {{ props.row.owner }}
        </b-table-column>
        <b-table-column field="created_on"
                        label="Created On">
          {{ props.row.created_on | formatDatetime }}
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
            <p>No Apps</p>
          </div>
        </section>
      </template>

    </b-table>

    <div class="section">
      <button class="button is-small"
              disabled>Add App</button>
    </div>

  </section>
</template>

<script>
export default {
  name: 'Apps',
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
    this.$backend.fetch('apps').then(apps => this.data = apps)
  }
}
</script>

<style lang="sass">


</style>

