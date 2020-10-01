/* eslint-disable import/no-extraneous-dependencies */
import '@babel/polyfill';
import 'mutationobserver-shim';
import Vue from 'vue';
import VueCompositionAPI from '@vue/composition-api';
import './plugins/bootstrap-vue';

import firebase from 'firebase/app';

import App from './App.vue';
import router from './router';
import store from './store';

Vue.use(VueCompositionAPI);
Vue.config.productionTip = false;

const firebaseConfig = {
  apiKey: 'AIzaSyCvI6oSteN78IT_DPCH96CguMLVhHvH51I',
  authDomain: 'ecommerce-6e7b2.firebaseapp.com',
  databaseURL: 'https://ecommerce-6e7b2.firebaseio.com',
  projectId: 'ecommerce-6e7b2',
  storageBucket: 'ecommerce-6e7b2.appspot.com',
  messagingSenderId: '195059731301',
  appId: '1:195059731301:web:49ff9a0f82aa6c43b32f8c',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
