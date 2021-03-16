import Vue from 'vue';

/**
 * Register globally common functions
 */
const GlobalPlugin = {
  install: function (Vue, options) {
    Vue.prototype.globalFn = () => {
      alert('This is from global function');
    }
  },
};

Vue.use(GlobalPlugin);
