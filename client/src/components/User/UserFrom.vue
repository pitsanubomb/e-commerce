<template>
  <b-form @submit.prevent="onSubmit">
    <b-form-group id="input-group-1" label="Username:" label-for="input-1">
      <b-form-input
        id="input-1"
        v-model="state.username"
        type="text"
        required
        placeholder="Enter Username"
      ></b-form-input>
    </b-form-group>

    <b-form-group id="input-group-2" label="Password:" label-for="input-2">
      <b-form-input
        id="input-2"
        v-model="state.password"
        type="password"
        required
        placeholder="Enter Password"
      ></b-form-input>
    </b-form-group>

    <b-form-group id="input-group-4">
      <b-form-checkbox-group v-model="state.checked" id="checkboxes-4">
        <b-form-checkbox value="true">Admin</b-form-checkbox>
      </b-form-checkbox-group>
    </b-form-group>

    <b-button type="submit" variant="primary">Submit</b-button>
  </b-form>
</template>
<script>
import { reactive } from '@vue/composition-api';

export default {
  props: {
    id: {
      type: String,
    },
    username: {
      type: String,
    },
    password: {
      type: String,
    },
    checked: {
      type: Array,
    },
    isEdit: {
      type: Boolean,
    },
  },
  setup(props, ctx) {
    const state = reactive({
      username: props.username,
      password: props.password,
      checked: props.checked,
    });

    async function fetchUserData() {
      const authHeaders = new Headers();
      authHeaders.append(
        'X-Authorization',
        `Bearer ${localStorage.getItem('x-token')}`,
      );

      const requestOptions = {
        method: 'GET',
        headers: authHeaders,
      };

      await fetch(`http://localhost:3000/api/user/${props.id}`, requestOptions)
        .then((response) => response.json())
        .then((res) => {
          state.username = res.data.username;
          state.checked = res.data.isAdmin;
        })
        .catch((e) => {
          console.log(e);
        });
    }

    if (props.isEdit === true) {
      fetchUserData();
    }

    function onSubmit() {
      let $isAdmin = false;
      if (state.checked.length > 0) {
        $isAdmin = true;
      }

      ctx.emit('submit-user', {
        bodydata: {
          username: state.username,
          password: state.password,
          isAdmin: $isAdmin,
        },
        id: props.id,
      });
    }

    return {
      onSubmit,
      state,
    };
  },
};
</script>
