import Vue from 'vue';
import upperFirst from 'lodash/upperFirst';
import camelCase from 'lodash/camelCase';
import { ValidationObserver, ValidationProvider } from 'vee-validate';

import { GlobalMixin, GlobalPlugin } from './commons';
import { ModalLoadSpinErrorPlugin } from './commons/plugins';

import './commons/directives/index';
import './commons/pipes/index';
import '@validations/index';

const showSpinner = () => ModalLoadSpinErrorPlugin.EventBus.$emit('show-spin');
const hideSpinner = () => ModalLoadSpinErrorPlugin.EventBus.$emit('hide-spin');

const withLoading = (callback = () => {}) => {
  showSpinner();
  callback(hideSpinner);
};

// Register components automatically
const registerComponents = () => {
  // Get all components in components directory
  const requireComponent = require.context(
    // Đường dẫn tương đối của thư mục chứa các components
    '../components',
    // có tìm component trong các thư mục con hay không: true: có | false: không
    true,
    // regular expression để tìm các file component cơ sở (/[A-Z]\w+\.(vue|js)$/)
    /[A-Z]\w+\.(vue)$/
  );
  // Loop and register components
  requireComponent.keys().forEach(fileName => {
    // Lấy cấu hình của component
    const componentConfig = requireComponent(fileName);
    // Bỏ các subfolder nếu có
    fileName = './' + fileName.split('/').pop();
    // Lấy tên của component dùng PascalCase
    const componentName = upperFirst(
      camelCase(
        // Bỏ phần đầu `'./` và đuôi file
        fileName.replace(/^\.\/(.*)\.\w+$/, '$1')
      )
    );
    // Đăng ký các component cấp toàn cục
    Vue.component(componentName, componentConfig.default || componentConfig);
  });
}

const registerGlobal = () => {

  /**
   * Register globally validation component
   */
  Vue.component('validator', ValidationProvider);
  Vue.component('observer', ValidationObserver);

  Vue.use(GlobalPlugin);

  Vue.use(ModalLoadSpinErrorPlugin);

  Vue.mixin(GlobalMixin);

  registerComponents();
};

export {
  registerGlobal,
  showSpinner,
  hideSpinner,
  withLoading,
};
