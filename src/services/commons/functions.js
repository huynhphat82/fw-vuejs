import i18n from '../i18n';

/**
 * Define globally functions
 */
const methods = {};

methods.globalHelper = function () {
  alert('Hello world');
};

methods.__ = function (...args) {
  return i18n.t(...args);
};

methods.trans = methods.__;
methods.lang = methods.__;
methods.t = methods.__;

export default methods;
