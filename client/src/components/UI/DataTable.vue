<template>
  <div>
    <b-table striped hover :items="data" :fields="fields">
      <template v-if="fields.detail" v-slot:cell(detail)="row">
        <b-button size="sm" @click="row.toggleDetails" class="mr-2">
          {{ row.detailsShowing ? "Hide" : "Show" }} Detail
        </b-button>
      </template>
      <template v-slot:cell(Edit_Delete)="row">
        <b-button
          size="sm"
          @click="editData(row.item.id)"
          variant="success"
          class="mr-2"
        >
          Edit
        </b-button>
        <b-button
          size="sm"
          @click="delData(row.item.id)"
          variant="danger"
          class="mr-2"
        >
          Delete
        </b-button>
      </template>
      <template v-slot:row-details="row">
        <b-card>
          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right"><b>Name:</b></b-col>
            <b-col>{{ row.item.username }}</b-col>
          </b-row>
          <b-button size="sm" @click="row.toggleDetails">Hide Details</b-button>
        </b-card>
      </template>
    </b-table>
  </div>
</template>
<script>
export default {
  name: 'DataTable',
  props: {
    data: {
      type: Array,
    },
    fields: {
      type: Array,
    },
  },
  methods: {
    editData(id) {
      this.$emit('edit-id', id);
    },
    delData(id) {
      this.$emit('del-id', id);
    },
  },
};
</script>
