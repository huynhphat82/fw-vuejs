import { AnotherHttp, Http } from "../..";

export const GlobalPlugin = {
  install(Vue, options) {
    Vue.prototype.globalFn = () => {
      alert('This is from global function');
    }

    // Inject http to Vue
    Vue.prototype.$http = Http;
    Vue.prototype.$httpAnother = AnotherHttp;
  },
};
