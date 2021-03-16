import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);

// Loading built-in validation messages
const localesValidation = {
  en: () => require('vee-validate/dist/locale/en.json').messages,
  vn: () => require('vee-validate/dist/locale/vi.json').messages,
  jp: () => require('vee-validate/dist/locale/ja.json').messages,
};

/**
 * Loading automatically contents of locale files
 *
 * @return json
 */
function loadLocaleMessages () {
  const locales = require.context('../locales', true, /[A-Za-z0-9-_,\s]+\.json$/i);
  return locales.keys().reduce((messages, key) => {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i);
    if (matched && matched.length > 1) {
      const locale = matched[1];
      const _messages = locales(key);
      // add validation messages automatically
      if (typeof _messages === 'object' && !_messages.hasOwnProperty('validations')) {
        _messages.validations = {};
      }
      if (localesValidation.hasOwnProperty(locale)) {
        _messages.validations = { ...localesValidation[locale](), ..._messages.validations };
      }
      messages[locale] = _messages;
    }
    return messages;
  }, {});
}

export default new VueI18n({
  locale: process.env.VUE_APP_I18N_LOCALE || 'en',
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'en',
  messages: loadLocaleMessages(),
});
