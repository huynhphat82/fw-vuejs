import Vue from 'vue';

import App from './App.vue';
import router from './router';
import store from './store';
import { i18n, registerGlobal } from './services';

Vue.config.productionTip = false

registerGlobal();

new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
