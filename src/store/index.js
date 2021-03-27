import Vue from 'vue';
import Vuex from 'vuex';
import { i18n } from '../services';

import { product } from './modules';

Vue.use(Vuex);

export const SET_LANG = 'setLang';

const store = new Vuex.Store({
  state: {
    lang: 'en'
  },
  mutations: {
    [SET_LANG]: (state, payload) => {
      state.lang = payload;
      i18n.locale = payload;
    }
  },
  actions: {
    [SET_LANG]: ({ commit }, payload) => {
      commit(SET_LANG, payload);
    }
  },
  modules: {
    product
  },
  getters: {
    currentLang: (state, getters) => { // this.$store.getters.currentLang
      return state.lang;
    },
    f1: (state, getters) => id => { // this.$store.getters.f1(id = 1)
      return state.lang + getters.currentLang + id;
    }
  }
});

export default store;
