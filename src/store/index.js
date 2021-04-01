import Vue from 'vue';
import Vuex from 'vuex';
import appVuex, { SET_LANG } from './appVeux';

Vue.use(Vuex);

const store = new Vuex.Store(appVuex);

export {
  SET_LANG,
};

export default store;
