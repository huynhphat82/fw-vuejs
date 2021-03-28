import store, { SET_LANG } from '~/store';
import AnotherHttp from '../../AnotherHttp';
import Http from '../../Http';
import ApiService from './../../api/ApiService';
import ApiAnotherService from './../../api/ApiAnotherService';
import router from '~/router';

export const GlobalPlugin = {
  install(Vue, options) {
    Vue.prototype.globalFn = () => {
      alert('This is from global function');
    }

    // Define navigate function
    Vue.prototype.navigate = function (routeName, onResolve = () => {}, onReject = () => {}) {
      router.push(routeName, onResolve, onReject);
    };
    Vue.prototype.$navigate = function (routeName, onResolve = () => {}, onReject = () => {}) {
      router.push(routeName, onResolve, onReject);
    };

    // Define setLang function
    Vue.prototype.$setLang = function(lang) {
      store.dispatch(SET_LANG, lang);
    };

    // Define get/set property as $lang
    Object.defineProperty(Vue.prototype, "$lang", {
      get() {
        return store.state.lang;
      },
      set(lang) {
        store.dispatch(SET_LANG, lang);
      }
    });

    // Inject http to Vue
    Vue.prototype.$http = Http;
    Vue.prototype.$httpAnother = AnotherHttp;
    Vue.prototype.$api = ApiService;
    Vue.prototype.$apiAnother = ApiAnotherService;
  },
};
