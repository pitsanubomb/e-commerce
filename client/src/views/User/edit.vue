<template>
  <div class="edit">
    <h1>Edit Data</h1>
    <b-alert v-model="state.isShow" :variant="state.variant">
      {{ state.message }}
    </b-alert>
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
      isShow: false,
      variant: '',
      message: '',
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
          if (result) {
            state.isShow = true;
            state.variant = 'success';
            state.message = 'Edit data sucess';
          }
        })
        .catch((error) => {
          state.isShow = true;
          state.variant = 'danger';
          state.message = error;
        });
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
