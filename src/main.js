import Vue from 'vue';

import App from './App.vue';
import i18n from './i18n';
import router from './router';
import store from './store';

import './validation/index';

Vue.config.productionTip = false

// global level via mixin
Vue.mixin({
  methods: {
    globalHelper: function () {
      console.log('Vue.$store => ', Vue)
      alert('Hello world')
    },
    trans: function (...args) {
      return i18n.t(...args);
    },
    lang: function (...args) {
      return i18n.t(...args);
    },
    t: function (...args) {
      return i18n.t(...args);
    },
    __: function (...args) {
      return i18n.t(...args);
    }
  },
});

// global level via plugin
const MyPlugin = {
  install(Vue, options) {
    Vue.prototype.globalFn = () => {
      alert('This is from global function')
    }
  },
};

Vue.use(MyPlugin);

new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
