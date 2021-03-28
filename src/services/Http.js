import { HTTP } from './commons';
import { OK } from './commons/http/HTTP_CODE_STATUS';
import { API_URL } from './../router/ENDPOINT';
import { hideSpinner, showSpinner } from './GlobalService';
import store from '~/store';
import Log from './Log';

const Http = new HTTP(API_URL);

Http.setHeaders({
  'X-Requested-With': 'XMLHttpRequest',
  'Locale': store.state.lang,
});

Http.interceptors([
  config => {
    // console.log('[Http][interceptors][req] => ', '[' + config?.method + ']', config?.url, config);
    Log.info('[Http][interceptors][req] => ', '[' + config?.method + ']', config?.url, config);
    if (config?.showSpinner === true) {
      showSpinner();
    }
    return config;
  },
  err => {
    hideSpinner();
    Log.warn('[Http][interceptors][req][error] => ', err);
    return Promise.reject(err);
  }
], [
  response => {
    Log.info('[Http][interceptors][res] => ', '[' + response?.config?.method + ']', response?.config?.url, response);
    switch (response.status) {
      case OK:
        break;
      default:
        break;
    }
    if (response?.config?.showSpinner === true) {
      hideSpinner();
    }
    return response;
  },
  err => {
    hideSpinner();
    Log.warn('[Http][interceptors][res][error] => ', err);
    return Promise.reject(err);
  }
]);

export default Http;
