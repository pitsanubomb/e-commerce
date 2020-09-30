<template>
  <div class="content">
    <AdminUI />
    <b-container class="mt-3">
      <router-view></router-view>
    </b-container>
  </div>
</template>

<script>
import AdminUI from '@/components/layout/AdminUi.vue';

export default {
  name: 'Backoffice',
  components: {
    AdminUI,
  },
};
</script>
