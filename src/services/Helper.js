import i18n from './i18n';

const Helper = {};

Helper.__ = (...args) => {
  return i18n.t(...args);
}

Helper.t = Helper.trans = Helper.$t = Helper.__;

Helper.isFn = f => typeof f === 'function';
Helper.isStr = v => typeof v === 'string';
Helper.isBool = v => typeof v === 'boolean';
Helper.isArray = v => Array.isArray(v);
Helper.isArrayNotEmpty = v => Helper.isArray(v) && v.length > 0;
Helper.isObject = v => !!v && !Helper.isArray(v) && typeof v === 'object';
Helper.isObjectNotEmpty = v => Helper.isObject(v) && Object.keys(v).length > 0;
Helper.isInt = v => (typeof value === 'number') && (value % 1 === 0);
Helper.isSafeInt = v => v == parseInt(v);

Helper.isJsonStr = v => {
  if (!Helper.isStr(v)) {
    return false;
  }
  try {
    return Helper.isObject(JSON.parse(v));
  } catch (err) {
    return false;
  }
};

Helper.json = v => {
  if (Helper.isObject(v)) {
    return v;
  }
  if (!Helper.isStr(v)) {
    return false;
  }
  try {
    return JSON.parse(v);
  } catch (err) {
    return false;
  }
};

Helper.toJsonStr = v => {
  return JSON.stringify(v);
};

Helper.chunk = (arr, n) => {
  if (!Helper.isInt(n) || n < 1) {
    return [];
  }
  return arr.slice(0, (arr.length + n-1)/n|0).map((c, i) => arr.slice(n*i, n*i+n));
};

export default Helper;
