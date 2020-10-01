<template>
  <div class="add">
    <h1>Add Data</h1>
    <b-alert v-model="state.isShow" :variant="state.variant">
      {{ state.message }}
    </b-alert>
    <UserAdd
      :id="$route.params.id"
      :isEdit="false"
      :username="state.username"
      :password="state.password"
      :checked="state.checked"
      @submit-user="editData"
    />
  </div>
</template>
<script>
import { reactive } from '@vue/composition-api';
import UserAdd from '@/components/User/UserFrom.vue';

export default {
  setup() {
    const state = reactive({
      username: '',
      password: '',
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
        method: 'POST',
        headers: authHeaders,
        body: bodyData,
      };

      fetch('http://localhost:3000/api/user/register', requestOptions)
        .then((response) => response.json())
        .then((result) => {
          if (result) {
            state.isShow = true;
            state.variant = 'success';
            state.message = 'Create data sucess';
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
    UserAdd,
  },
};
</script>
