import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);

// Loading built-in validation messages
const localesValidation = {
  en: () => require('vee-validate/dist/locale/en.json'),
  vn: () => require('vee-validate/dist/locale/vi.json'),
  jp: () => require('vee-validate/dist/locale/ja.json'),
};

/**
 * Loading automatically contents of locale files
 * {
 *    [key]: {any}
 *    "validations": {
 *      "messages": {
 *        "<rule>": "{_field_} do something here",
 *        ...
 *      },
 *      "names": {
 *        "<fieldname>": "do something here",
 *        ...
 *      },
 *      /=== custom messages for fields ===/
 *      "fields": {
 *        "<filename>": {
 *          "<rule>": "{_field_} do something here",
 *          ...
 *        }
 *      }
 *    }
 * }
 *
 * @return json
 */
function getLocaleMessages () {
  const locales = require.context('../locales', true, /[A-Za-z0-9-_,\s]+\.json$/i);
  return locales.keys().reduce((messages, key) => {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i);
    if (matched && matched.length > 1) {
      const locale = matched[1];
      const _messages = locales(key);
      // add validation messages automatically
      if (typeof _messages === 'object' && !_messages.hasOwnProperty('validations')) {
        _messages.validations.messages = {};
        _messages.validations.names = {};
        _messages.validations.fields = {};
      }
      if (localesValidation.hasOwnProperty(locale)) {
        const _m = localesValidation[locale]();
        _messages.validations.messages = { ..._m.messages, ..._messages.validations.messages };
        _messages.validations.names = { ...(_m.names || {}), ..._messages.validations.names };
        _messages.validations.fields = { ...(_m.fields || {}), ..._messages.validations.fields };
      }
      messages[locale] = _messages;
    }
    return messages;
  }, {});
}

const i18n = new VueI18n({
  locale: process.env.VUE_APP_I18N_LOCALE || 'en',
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'en',
  messages: getLocaleMessages(),
});

export default i18n;
