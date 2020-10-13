import Vue from 'vue';
import browserDetect from 'vue-browser-detect-plugin';
import Loading from 'vue-loading-overlay';
import App from './App.vue';
import './assets/styles/tailwind.css';
import 'vue-loading-overlay/dist/vue-loading.css';

Vue.use(browserDetect);
Vue.use(Loading);
Vue.component('Loading', Loading);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');
