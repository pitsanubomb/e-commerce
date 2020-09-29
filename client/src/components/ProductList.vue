<template>
  <div class="container-fulid mt-3 mx-3">
    <b-card-group columns>
      <b-card
        v-for="product in products"
        :key="product.id"
        :title=product.name
        img-src="https://picsum.photos/300/300/?image=41"
        img-alt="Image"
        img-top
      >
        <b-card-text>
          <b-row>
            <b-col>฿{{ product.prize }}</b-col>
            <b-img
              src="@/assets/free-free-shipping-icon-2048-thumb.png"
              style="width: 40px; height: 40px"
              rounded
              alt="Rounded image"
            ></b-img>
          </b-row>
        </b-card-text>
        <template v-slot:footer>
          <small class="text-muted">Last updated 3 mins ago</small>
        </template>
      </b-card>
    </b-card-group>
  </div>
</template>

<script>
import { ref } from '@vue/composition-api';

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
};
</script>
