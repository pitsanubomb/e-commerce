<template>
  <div class="login">
    <b-card-group deck class="mx-3 mt-3">
      <b-card title="Login">
        <LoginFrom />
      </b-card>
      <b-card title="Register">
        <RegistFrom />
      </b-card>
    </b-card-group>
  </div>
</template>

<script>
import LoginFrom from '@/components/LoginFrom.vue';
import RegistFrom from '@/components/RegistFrom.vue';

export default {
  name: 'Login',
  components: {
    LoginFrom,
    RegistFrom,
  },
};
</script>
