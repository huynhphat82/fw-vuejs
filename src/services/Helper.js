import i18n from './i18n';

const Helper = {};

Helper.__ = (...args) => {
  return i18n.t(...args);
}

Helper.t = Helper.trans = Helper.$t = Helper.__;

export default Helper;
