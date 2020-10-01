<template>
  <div class="edit">
    <h1>Edit Data</h1>
    <UserEdit
      :id="$route.params.id"
      :isEdit="true"
      :username="state.username"
      :password="state.password"
      :checked="state.checked"
      @submit-user="editData"
    />
  </div>
</template>
<script>
import { reactive } from '@vue/composition-api';
import UserEdit from '@/components/User/UserFrom.vue';

export default {
  setup() {
    const state = reactive({
      username: '',
      password: 'kfllkfldsakrand',
      checked: [],
    });

    function editData(fromdata) {
      const bodyData = JSON.stringify(fromdata.bodydata);
      const authHeaders = new Headers();
      authHeaders.append(
        'X-Authorization',
        `Bearer ${localStorage.getItem('x-token')}`,
      );

      authHeaders.append('Content-Type', 'application/json');

      const requestOptions = {
        method: 'PUT',
        headers: authHeaders,
        body: bodyData,
      };

      fetch(`http://localhost:3000/api/user/${fromdata.id}`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
        })
        .catch((error) => console.log('error', error));
    }

    return {
      state,
      editData,
    };
  },
  components: {
    UserEdit,
  },
};
</script>
