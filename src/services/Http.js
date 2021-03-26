import { HTTP } from './commons';
import { OK } from './commons/http/HTTP_CODE_STATUS';

const Http = new HTTP('http://localhost:8000');

Http.setHeaders({
  'X-Requested-With': 'XMLHttpRequest',
});

Http.interceptors([
  config => {
    console.log('config => ', config);
    return config;
  },
  err => {
    console.log('err => ', err)
  }
], [
  response => {
    switch (response.status) {
      case OK:
        break;
      default:
        break;
    }
    return response;
  },
  err => {
    console.log('err => ', err)
  }
]);

export default Http;
