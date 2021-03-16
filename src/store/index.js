import Vue from 'vue';
import Vuex from 'vuex';

import { i18n } from '../globals';
import { product } from './modules';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    lang: 'en'
  },
  mutations: {
    SET_LANG: (state, payload) => {
      state.lang = payload;
      i18n.locale = payload;
    }
  },
  actions: {
    setLang: ({ commit }, payload) => {
      commit('SET_LANG', payload);
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
