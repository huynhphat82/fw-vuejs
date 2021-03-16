import { i18n } from "../globals";

const Helper = {};

Helper.__ = (...args) => {
  return i18n.t(...args);
}

Helper.t = Helper.trans = Helper.$t = Helper.__;

export default Helper;
