<template>
  <b-form @submit.prevent="onSubmit">
    <b-form-group id="input-group-1" label="Productname:" label-for="input-1">
      <b-form-input
        id="input-1"
        v-model="state.name"
        type="text"
        required
        placeholder="Enter Name"
      ></b-form-input>
    </b-form-group>

    <b-form-group id="input-group-2" label="Detail:" label-for="input-2">
      <b-form-textarea
        id="textarea"
        v-model="state.detail"
        placeholder="Enter detail..."
        rows="3"
        max-rows="6"
      ></b-form-textarea>
    </b-form-group>

    <b-form-group
      id="input-group-image"
      label="Upload image:"
      label-for="input-image"
    >
      <b-img
        v-if="state.imgcover"
        :src="state.imgcover"
        alt="Transparent image"
      ></b-img>
      <b-form-file
        class="mt-3"
        accept="image/*"
        @change="onImageUpload"
        plain
      ></b-form-file>
    </b-form-group>

    <b-form-group id="input-group-3" label="Prize:" label-for="input-3">
      <b-form-input
        id="input-3"
        v-model="state.prize"
        type="number"
        required
        placeholder="Enter Prize"
      ></b-form-input>
    </b-form-group>

    <b-form-group id="input-group-4" label="Count:" label-for="input-4">
      <b-form-input
        id="input-3"
        v-model="state.count"
        type="number"
        required
        placeholder="Enter Count"
      ></b-form-input>
    </b-form-group>

    <b-form-group id="input-group-4">
      <b-form-checkbox-group v-model="state.isShipping" id="checkboxes-4">
        <b-form-checkbox value="true">Shipping</b-form-checkbox>
      </b-form-checkbox-group>
    </b-form-group>

    <b-button type="submit" variant="primary">Submit</b-button>
  </b-form>
</template>
<script>
import { reactive } from '@vue/composition-api';
import firebase from 'firebase/app';
import 'firebase/storage';

export default {
  props: {
    id: {
      type: String,
    },
    name: {
      type: String,
    },
    detail: {
      type: String,
    },
    imgcover: {
      type: String,
    },
    prize: {
      type: Number,
    },
    count: {
      type: Number,
    },
    isShipping: {
      type: Array,
    },
    isEdit: {
      type: Boolean,
    },
  },
  setup(props, ctx) {
    const state = reactive({
      name: props.name,
      detail: props.detail,
      imgcover: props.imgcover,
      prize: props.prize,
      count: props.count,
      isShipping: props.isShipping,
    });

    function firebaseUpload($file, urlData) {
      const pid = Math.random().toString(36).substring(4);
      const fireRef = firebase.storage().ref(`products/${pid}${$file.name}`);
      fireRef.putString(urlData, 'data_url').then(
        (snapshot) => {
          if (snapshot) {
            fireRef.getDownloadURL().then((productImg) => {
              state.imgcover = productImg;
            });
          }
        },
        (error) => {
          console.log(error);
        },
      );
    }

    function onImageUpload(e) {
      const uploadFile = e.target.files[0];
      const readImg = new FileReader();
      readImg.addEventListener('load', () => {
        firebaseUpload(uploadFile, readImg.result);
      });
      readImg.readAsDataURL(uploadFile);
    }
    async function fetchUserData() {
      const authHeaders = new Headers();
      authHeaders.append(
        'X-Authorization',
        `Bearer ${localStorage.getItem('x-token')}`,
      );

      const requestOptions = {
        method: 'GET',
        headers: authHeaders,
      };

      await fetch(
        `http://localhost:3000/api/product/${props.id}`,
        requestOptions,
      )
        .then((response) => response.json())
        .then((res) => {
          state.name = res.data.name;
          state.detail = res.data.detail;
          state.imgcover = res.data.imgcover;
          state.prize = res.data.prize;
          state.count = res.data.count;
          state.isShipping = [res.data.isShipping];
        })
        .catch((e) => {
          console.log(e);
        });
    }

    if (props.isEdit === true) {
      fetchUserData();
    }

    function onSubmit() {
      ctx.emit('submit-product', {
        bodydata: {
          name: state.name,
          detail: state.detail,
          imgcover: state.imgcover,
          prize: state.prize,
          count: state.count,
          isShipping: state.isShipping[0],
        },
        id: props.id,
      });
    }

    return {
      onSubmit,
      onImageUpload,
      state,
    };
  },
};
</script>
