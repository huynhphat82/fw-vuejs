import { HTTP } from './commons';
import { OK } from './commons/http/HTTP_CODE_STATUS';
import { API_URL } from './../router/ENDPOINT';
import { hidePace, hideSpinner, showPace, showSpinner } from './GlobalService';
import store from '~/store';
import Log from './Log';

const Http = new HTTP(API_URL);

Http.setHeaders({
  'X-Requested-With': 'XMLHttpRequest',
  'Locale': store.state.lang,
});

Http.interceptors([
  config => {
    Log.info('[Http][interceptors][req] => ', '[' + config?.method + ']', config?.url, config);
    if (config?.showSpinner === true) {
      showSpinner();
    }
    if (!config.hasOwnProperty('showPace') || config?.showPace === true) {
      showPace();
    }

    return config;
  },
  err => {
    hideSpinner();
    hidePace();
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
    if (!response.config.hasOwnProperty('showPace') || response.config?.showPace === true) {
      hidePace();
    }
    return response;
  },
  err => {
    hideSpinner();
    hidePace();
    Log.warn('[Http][interceptors][res][error] => ', err);
    return Promise.reject(err);
  }
]);

export default Http;
