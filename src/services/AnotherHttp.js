import { HTTP } from './commons';
import { OK } from './commons/http/HTTP_CODE_STATUS';
import { hideSpinner, showSpinner } from './GlobalService';
import { API_URL_ANOTHER } from './../router/ENDPOINT_ANOTHER';
import Log from './Log';

const AnotherHttp = new HTTP(API_URL_ANOTHER);

AnotherHttp.interceptors([
  config => {
    Log.info('[AnotherHttp][interceptors][req] => ', '[' + config?.method + ']', config?.url, config);
    if (config?.showSpinner === true) {
      showSpinner();
    }
    return config;
  },
  err => {
    hideSpinner();
    Log.warn('[AnotherHttp][interceptors][req][error] => ', err);
    return Promise.reject(err);
  }
], [
  response => {
    Log.info('[AnotherHttp][interceptors][res] => ', '[' + response?.config?.method + ']', response?.config?.url, response);
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
    Log.warn('[AnotherHttp][interceptors][res][error] => ', err);
    return Promise.reject(err);
  }
]);

export default AnotherHttp;
