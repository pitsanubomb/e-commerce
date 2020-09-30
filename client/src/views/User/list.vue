<template>
  <div class="user">
    <h1>User page</h1>
    <UserList />
  </div>
</template>
<script>
import UserList from '@/components/User/UserList.vue';

export default {
  components: {
    UserList,
  },
};
</script>
