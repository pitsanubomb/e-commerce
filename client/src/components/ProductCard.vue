<template>
  <b-card
    :title="name"
    :img-src="img"
    img-alt="Image"
    img-height="300"
    img-width="300"
    img-top
    tag="article"
    style="max-width: 20rem"
    class="mb-2"
  >
    <b-card-text>
      <b-row style="height: 50px">
        <b-col>฿{{ prize }}</b-col>
        <b-img
          v-if="isShipping"
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
</template>

<script>
export default {
  props: ['name', 'prize', 'img', 'isShipping'],
};
</script>
