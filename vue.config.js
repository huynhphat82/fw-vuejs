const path = require('path');

const root = '.';
const src = root + '/src';

const _ = function(dirPath, prefixPath) {
  return path.resolve(__dirname, (prefixPath || src) + (dirPath ? '/' + dirPath : ''));
};

module.exports = {
  css: {
    loaderOptions: {
      // Loading *.scss files automatically for accessing at global
      scss: {
        // prependData: `@import "~@/assets/styles/global.scss";`
        prependData: `@import "@assets/styles/global.scss";`
      }
    }
  },
  configureWebpack: {
    resolve: {
      // Define alias paths of project
      alias: {
        '~~': _('', root),
        '~': _(),
        '@@': _('', root),
        '@': _(),
        '@assets': _('assets'),
        '@components': _('components'),
        '@configs': _('configs'),
        '@locales': _('locales'),
        '@middlewares': _('/middlewares'),
        '@modules': _('modules'),
        '@services': _('services'),
        '@store': _('store'),
        '@validations': _('validations'),
        '@directives': _('services/commons/directives'),
        '@mixins': _('services/commons/mixins'),
        '@plugins': _('services/commons/plugins'),
        '@http': _('services/commons/http'),
        '@api': _('services/api'),
      },
      extensions: ['.js', '.vue', '.json']
    }
  }
};
