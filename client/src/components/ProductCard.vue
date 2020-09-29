<template>
  <div>
    <b-col>
      <b-card
        :title="name"
        :img-src="img"
        img-alt="Image"
        img-top
        tag="article"
        style="max-width: 20rem"
        class="mb-2"
      >
        <b-card-text>
          <b-row>
            <b-col>฿{{ prize }}</b-col>
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
    </b-col>
  </div>
</template>

<script>
export default {
  props: ['name', 'prize', 'img'],
};
</script>
