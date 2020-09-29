<template>
  <b-container fluid class="mt-3">
    <b-card-group columns>
      <product
        :img= "product.imgcover"
        :name="product.name"
        :prize="product.prize"
        :isShipping="product.isShipping"
        v-for="product in products"
        :key="product.id"
      />
    </b-card-group>
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
