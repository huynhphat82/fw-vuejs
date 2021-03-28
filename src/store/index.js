import Vue from 'vue';
import Vuex from 'vuex';
import { AnotherHttp, Http, i18n } from '../services';

import { product } from './modules';
import logger from './logger';

Vue.use(Vuex);

export const SET_LANG = 'setLang';

// Set locale for http headers
const setLangHttpHeaders = (lang) => {
  Http.setHeaders({ Locale: lang });
  AnotherHttp.setHeaders({ Locale: lang });
}

const store = new Vuex.Store({
  plugins: process.env.NODE_ENV !== 'production' ? [logger] : [],
  state: {
    lang: 'en',
    user: {
      isLoggedIn: false,
      isSubscribed: false,
    },
  },
  mutations: {
    [SET_LANG]: (state, payload) => {
      state.lang = payload;
      i18n.locale = payload;
      setLangHttpHeaders(payload);
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
    },
    auth(state) {
      return state.user;
    },
  }
});

export default store;
