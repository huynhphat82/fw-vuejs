import Vue from 'vue';
import Vuex from 'vuex';
import * as VuexLocal from 'vuex-local';

import appVuex, { SET_LANG, useAsyncStorage } from './appVeux';

Vue.use(Vuex);

// Register local state management
Vue.use(VuexLocal, {
  // local modules will be registered under `locals` module
  // parentModulePath: ['locals']
});

const store = new Vuex.Store(appVuex);

const connect = (mapToState = {}, mapToDispatch = {}) => (Component = {}) => {
  if (typeof Component === 'function') {
    return Component({ ...mapToState, ...mapToDispatch });
  }

  Component.computed = {
    ...mapToState,
    ...(Component.computed || {}),
  };
  Component.methods = {
    ...mapToDispatch,
    ...(Component.methods || {}),
  };
  return Component;
};

export {
  SET_LANG,
  useAsyncStorage,
  connect,
};

export default store;
