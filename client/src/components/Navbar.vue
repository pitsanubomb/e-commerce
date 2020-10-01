<template>
  <nav class="navbar navbar-light bg-light">
    <a class="navbar-brand">E-commerce</a>
    <form class="form-inline">
      <div v-if="!isLogin">
        <router-link :to="{name: 'Login'}">Login</router-link>
      </div>
      <button
        @click="logout"
        v-else
        class="btn btn-outline-success my-2 my-sm-0"
      >
        Logout
      </button>
    </form>
  </nav>
</template>

<script>
import { computed } from '@vue/composition-api';

export default {
  setup() {
    const isLogin = computed(
      () => localStorage.getItem('x-token')
        && localStorage.getItem('x-token') !== '',
    );

    function logout() {
      localStorage.clear();
    }

    return {
      isLogin,
      logout,
    };
  },
};
</script>
