import { AnotherHttp, Http, i18n } from '../services';

import { product } from './modules';
import logger from './logger';
import { signup } from './../components/Signup/veux';

export const SET_LANG = 'setLang';

// Set locale for http headers
const setLangHttpHeaders = (lang) => {
  Http.setHeaders({ Locale: lang });
  AnotherHttp.setHeaders({ Locale: lang });
}

const getOtherData = () => new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve([1, 2, 3, 4, 5]);
  }, 1000)
});

const modules = {
  signup,
  product,
};

const state = {
  lang: 'en',
  user: {
    isLoggedIn: false,
    isSubscribed: false,
  },
};

const getters = {
  currentLang: (state, getters) => { // this.$store.getters.currentLang
    return state.lang;
  },
  f1: (state, getters) => id => { // this.$store.getters.f1(id = 1)
    return state.lang + getters.currentLang + id;
  },
  auth(state) {
    return state.user;
  },
};

const actions = { // async|sync
  [SET_LANG]: ({ commit }, payload) => {
    commit(SET_LANG, payload);
  },
  actionA ({ commit }) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        commit('someMutation');
        resolve();
      }, 1000);
    });
  },
  actionB ({ dispatch, commit }) {
    return dispatch('actionA').then(() => {
      commit('someOtherMutation');
    });
  },
  async actionC({ commit, dispatch, state, rootState, rootGetters }) {
    await dispatch('actionA') // wait for `actionA` to finish
    commit('gotOtherData', await getOtherData())
  }
};

const mutations = { // sync
  [SET_LANG]: (state, payload) => {
    state.lang = payload;
    i18n.locale = payload;
    setLangHttpHeaders(payload);
  },
  someMutation: (state, payload) => {
    console.log('someMutation => ', payload);
  },
  gotOtherData: (state, payload) => {
    console.log('gotOtherData => ', payload);
  },
};

const appVuex = {
  plugins: process.env.NODE_ENV !== 'production' ? [logger] : [],
  state,
  mutations,
  actions,
  getters,
  modules,
};

export default appVuex;
