<template>
  <UserList
    :data="state.items"
    :fields="state.fields"
    @edit-id="editData"
    @del-id="delData"
  />
</template>

<script>
import { reactive } from '@vue/composition-api';

import DataTable from '@/components/UI/DataTable.vue';

export default {
  setup() {
    const state = reactive({
      items: [],
      fields: ['id', 'username', 'Edit_Delete'],
    });

    function editData($id) {
      this.$router.push(`/backoffice/user/${$id}`);
    }

    async function fetchData() {
      const authHeaders = new Headers();
      authHeaders.append(
        'X-Authorization',
        `Bearer ${localStorage.getItem('x-token')}`,
      );

      const requestOptions = {
        method: 'GET',
        headers: authHeaders,
      };

      fetch('http://localhost:3000/api/user/all', requestOptions)
        .then((response) => response.json())
        .then((result) => {
          state.items = result.data.user;
        })
        .catch((error) => console.log('error', error));
    }

    async function delData($id) {
      const authHeaders = new Headers();
      authHeaders.append(
        'X-Authorization',
        `Bearer ${localStorage.getItem('x-token')}`,
      );

      const requestOptions = {
        method: 'DELETE',
        headers: authHeaders,
      };

      fetch(`http://localhost:3000/api/user/${$id}`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          if (result) {
            fetchData();
          }
        })
        .catch((error) => console.log('error', error));
    }

    fetchData();

    return {
      state,
      editData,
      delData,
    };
  },
  components: { UserList: DataTable },
};
</script>
