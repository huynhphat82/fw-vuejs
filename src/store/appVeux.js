import { AnotherHttp, Http, i18n } from '../services';
import router, { ROUTE } from '~/router';

import { product } from './modules';
import logger from './logger';
import { signup } from './../components/Signup/veux';
import vuexPersistence from './vuexPersistence';
import vuexCookie from './vuexCookie';

export const SET_LANG = 'setLang';
export const SIGN_IN = 'signin';
export const SIGN_OUT = 'signout';

export const useAsyncStorage = vuexPersistence.asyncStorage;

export const MODULES = {
  PRODUCT: 'product',
  SIGNUP: 'signup',
};

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
  [MODULES.PRODUCT]: product,
  [MODULES.SIGNUP]: signup,
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
    let user = state.user;
    if (!user) {
      user = {
        isLoggedIn: false,
        isSubscribed: false,
      };
    }
    return user;
  },
};

const actions = { // async|sync
  [SET_LANG]: ({ commit }, payload) => {
    commit(SET_LANG, payload);
  },
  [SIGN_IN]: ({ commit }, payload) => {
    commit(SIGN_IN, payload);
  },
  [SIGN_OUT]: ({ commit }) => {
    commit(SIGN_OUT);
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
  [SIGN_IN]: (state, payload) => {
    state.user = payload;
  },
  [SIGN_OUT]: (state) => {
    state.user = null;
    router.push(ROUTE.SIGNIN);
  },
  someMutation: (state, payload) => {
    console.log('someMutation => ', payload);
  },
  gotOtherData: (state, payload) => {
    console.log('gotOtherData => ', payload);
  },
};

// Add vuex strict mode if environment is not production
if (process.env.NODE_ENV !== 'production') {
  mutations.RESTORE_MUTATION = vuexPersistence.RESTORE_MUTATION;
}

const appVuex = {
  strict: process.env.NODE_ENV !== 'production', // This makes the Vuex store strict if not production mode
  plugins: process.env.NODE_ENV !== 'production'
    ? [
      vuexPersistence.plugin,
      // vuexCookie.plugin,
      logger
    ]
    : [
      vuexPersistence.plugin,
      // vuexCookie.plugin
    ],
  state,
  mutations,
  actions,
  getters,
  modules,
};

export default appVuex;
