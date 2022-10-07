import VuexPersistence from 'vuex-persist';
import Cookies from 'js-cookie';

const vuexCookie = new VuexPersistence({
  restoreState: (key, storage) => Cookies.get(key),
  saveState: (key, state, storage) => Cookies.set(key, JSON.stringify(state), { expires: 3 /* 3 days */ }),
  // modules: ['user'], //only save user module
  // filter: (mutation) => mutation.type == 'logIn' || mutation.type == 'logOut'
});

export default vuexCookie;
