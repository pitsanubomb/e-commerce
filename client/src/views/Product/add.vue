<template>
  <div class="edit">
    <h1>Add Data</h1>
    <b-alert v-model="state.isShow" :variant="state.variant">
      {{ state.message }}
    </b-alert>
    <ProductEdit
      :id="$route.params.id"
      :name="state.name"
      :detail="state.detail"
      :imgcover="state.imgcover"
      :prize="state.prize"
      :count="state.count"
      :isShipping="state.isShipping"
      @submit-product="addData"
    />
  </div>
</template>
<script>
import { reactive } from '@vue/composition-api';
import ProductEdit from '@/components/Product/ProductFrom.vue';

const newLocal = 'http://localhost:3000/api/product/add';
export default {
  setup() {
    const state = reactive({
      name: '',
      detail: '',
      imgcover: '',
      prize: null,
      count: null,
      isShipping: [],
      isShow: false,
      variant: '',
      message: '',
    });

    function addData(fromdata) {
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

      fetch(newLocal, requestOptions)
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
      addData,
    };
  },
  components: {
    ProductEdit,
  },
};
</script>
