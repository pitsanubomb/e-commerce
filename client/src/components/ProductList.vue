<template>
  <div class="container-fulid mt-3 mx-3">
    <b-card-group deck>
      <b-card
        no-body
        v-for="product in products"
        :key="product.id"
        class="overflow-hidden"
        style="max-width: 540px"
      >
        <b-row no-gutters>
          <b-col md="6">
            <b-card-img
              src="https://picsum.photos/400/400/?image=20"
              alt="Image"
              class="rounded-0"
            ></b-card-img>
          </b-col>
          <b-col md="6">
            <b-card-body title="Horizontal Card">
              <b-card-text>
                This is a wider card with supporting text as a natural lead-in
                to additional content. This content is a little bit longer.
              </b-card-text>
            </b-card-body>
          </b-col>
        </b-row>
      </b-card>
    </b-card-group>
  </div>
</template>

<script>
import { ref } from '@vue/composition-api';

export default {
  setup() {
    const products = ref([]);

    const apiUrl = 'http://localhost:8080/api/product/all';

    async function getProductList() {
      const res = await fetch(apiUrl);
      const json = await res.json();
      products.value = json.data;
    }

    getProductList();
    return { products };
  },
};
</script>
