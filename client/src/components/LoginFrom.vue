<template>
  <b-container class="mt-3">
    <b-alert
      v-model="data.show"
      variant="danger"
      dismissible
      @dismissed="dismissCountDown = 0"
      @dismiss-count-down="countDownChanged"
    >
      {{ data.error }}
    </b-alert>
    <b-form @submit="onSubmit">
      <b-form-group id="input-group-1" label="Username:" label-for="input-1">
        <b-form-input
          id="input-1"
          v-model="data.form.username"
          type="text"
          required
          placeholder="Enter Username"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-2"
        label="Your Password:"
        label-for="input-2"
      >
        <b-form-input
          id="input-2"
          v-model="data.form.password"
          type="password"
          required
          placeholder="Enter Password"
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Login</b-button>
    </b-form>
  </b-container>
</template>

<script>
import { reactive } from '@vue/composition-api';

export default {
  setup() {
    const data = reactive({
      form: {
        username: '',
        password: '',
      },
      show: 0,
      error: '',
    });

    async function onSubmit(evt) {
      evt.preventDefault();
      const res = await fetch('http://localhost:3000/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data.form),
      });
      await res
        .json()
        .then((response) => response.json())
        .then(($data) => {
          console.log($data);
        })
        .catch(() => {
          data.show = 5;
          data.error = 'ไม่สามรถข้าสู่ระบบได้';
        });
    }

    function countDownChanged(dismissCountDown) {
      data.show = dismissCountDown;
    }

    return {
      onSubmit,
      data,
      countDownChanged,
    };
  },
};
</script>
