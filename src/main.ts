import Vue from 'vue';
import browserDetect from 'vue-browser-detect-plugin';
import Loading from 'vue-loading-overlay';
import App from './App.vue';
import router from './router';
import store from './store';
import './assets/styles/tailwind.css';
import 'vue-loading-overlay/dist/vue-loading.css';

Vue.use(browserDetect);
Vue.use(Loading);
Vue.component('Loading', Loading);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
