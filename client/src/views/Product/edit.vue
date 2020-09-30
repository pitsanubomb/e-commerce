<template>
  <div class="edit">
    <h1>Edit Data</h1>
    <ProductEdit
      :id="$route.params.id"
      :isEdit="true"
      :name="state.name"
      :detail="state.detail"
      :imgcover="state.imgcover"
      :prize="state.prize"
      :count="state.count"
      :isShipping="state.isShipping"
      @submit-product="editData"
    />
  </div>
</template>
<script>
import { reactive } from '@vue/composition-api';
import ProductEdit from '@/components/Product/ProductFrom.vue';

export default {
  setup() {
    const state = reactive({
      name: '',
      detail: '',
      imgcover: '',
      prize: null,
      count: null,
      isShipping: [],
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

      fetch(`http://localhost:3000/api/product/${fromdata.id}`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
        })
        .catch((error) => console.log('error', error));
    }

    return {
      state,
      editData,
    };
  },
  components: {
    ProductEdit,
  },
};
</script>
