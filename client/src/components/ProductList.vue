<template>
  <b-container class="mt-3">
    <b-row align-v="center">
      <product
        img="https://picsum.photos/600/300/?image=25"
        :name="product.name"
        :prize="product.prize"
        v-for="product in products"
        :key="product.id"
      />
    </b-row>
  </b-container>
</template>

<script>
import { ref } from '@vue/composition-api';
import ProductCard from '@/components/ProductCard.vue';

export default {
  setup() {
    const products = ref([]);

    const apiUrl = 'http://localhost:3000/api/product/all';

    async function getProductList() {
      const res = await fetch(apiUrl);
      const json = await res.json();
      products.value = json.data;
    }

    getProductList();
    return { products };
  },
  components: { product: ProductCard },
};
</script>
