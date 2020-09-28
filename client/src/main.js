/* eslint-disable import/no-extraneous-dependencies */
import '@babel/polyfill';
import 'mutationobserver-shim';
import Vue from 'vue';
import VueCompositionAPI from '@vue/composition-api';
import './plugins/bootstrap-vue';

import App from './App.vue';
import router from './router';
import store from './store';

Vue.use(VueCompositionAPI);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
