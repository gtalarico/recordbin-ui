<template>
  <section>
    <b-table :data="apps"
             :selected.sync="selectedRow"
             @select="selectApp"
             focusable
             striped
             hoverable>

      <template slot-scope="props">
        <b-table-column field="name"
                        label="Apps">
          {{ props.row.name }}
        </b-table-column>
        <b-table-column field="owner"
                        label="Owner">
          <span class="tag">{{ props.row.owner }}</span>
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

      <template slot="footer">
        <router-link tag="button"
                     class="button is-small"
                     :to="{name: 'apps'}">Manage Apps</router-link>
      </template>

    </b-table>

  </section>
</template>

<script>
export default {
  name: 'Apps',
  props: [
    'apps'
  ],
  data () {
    return {
      data: [],
      selectedRow: null
    }
  },
  methods: {
    selectApp (app) {
      // If done on template selectedRow is none
      this.$emit('appSelected', app)
    }
  }
}
</script>

<style lang="sass">




</style>

