import { HTTP } from './commons';
import { OK } from './commons/http/HTTP_CODE_STATUS';
import { API_URL } from './../router/ENDPOINT';
import { ModalLoadSpinErrorPlugin } from './commons/plugins/ModalLoadSpinErrorPlugin';

const Http = new HTTP(API_URL);

const _showSpinner = () => ModalLoadSpinErrorPlugin.EventBus.$emit('show-spin');
const _hideSpinner = () => ModalLoadSpinErrorPlugin.EventBus.$emit('hide-spin');

export const withLoading = (callback = () => {}) => {
  _showSpinner();
  callback(_hideSpinner);
};

Http.setHeaders({
  'X-Requested-With': 'XMLHttpRequest',
});

Http.interceptors([
  config => {
    console.log('[interceptors][req] => ', '[' + config?.method + ']', config?.url, config);
    if (config?.showSpinner === true) {
      _showSpinner();
    }
    return config;
  },
  err => {
    _hideSpinner();
    console.warn('[interceptors][req][error] => ', err);
    return Promise.reject(err);
  }
], [
  response => {
    console.log('[interceptors][res] => ', '[' + response?.config?.method + ']', response?.config?.url, response);
    switch (response.status) {
      case OK:
        break;
      default:
        break;
    }
    if (response?.config?.showSpinner === true) {
      _hideSpinner();
    }
    return response;
  },
  err => {
    _hideSpinner();
    console.warn('[interceptors][res][error] => ', err);
    return Promise.reject(err);
  }
]);

export default Http;
