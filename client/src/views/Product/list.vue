<template>
  <div class="product">
    <h1>Product page</h1>
    <ProductList />
  </div>
</template>
<script>
import ProductList from '@/components/Product/ProductList.vue';

export default {
  components: {
    ProductList,
  },
};
</script>
