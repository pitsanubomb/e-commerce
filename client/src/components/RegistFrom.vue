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
      <b-form-group id="input-group-3" label="Username:" label-for="input-3">
        <b-form-input
          id="input-3"
          v-model="data.form.username"
          type="text"
          required
          placeholder="Enter Username"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-4"
        label="Your Password:"
        label-for="input-4"
      >
        <b-form-input
          id="input-4"
          v-model="data.form.password"
          type="password"
          required
          placeholder="Enter Password"
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Register</b-button>
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
      await fetch('http://localhost:3000/api/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data.form),
      })
        .then((response) => response.json())
        .then(($data) => {
          if ($data.error) {
            data.show = 5;
            data.error = $data.error;
          } else {
            data.show = 5;
            data.error = 'สมัครสำเร็จ';
          }
        })
        .catch((e) => {
          data.show = 5;
          data.error = e;
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
