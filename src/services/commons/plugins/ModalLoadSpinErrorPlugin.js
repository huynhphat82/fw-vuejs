import { Modal, Spinner, Loader, Error as AppError, Pace } from '../../../components';

export const ModalLoadSpinErrorPlugin = {
  install(Vue, options) {
    // For listening and emiting
    this.EventBus = new Vue();
    // Register Modal, Spinner components
    Vue.component('error', AppError);
    Vue.component('modal', Modal);
    Vue.component('spinner', Spinner);
    Vue.component('loader', Loader);
    Vue.component('pace', Pace);
    // Expose $modal object to every component
    Vue.prototype.$modal = {
      // dispatch 'show' event
      show(params) {
        this.EventBus.$emit('show', params);
      },
      EventBus: this.EventBus,
    };
    Vue.prototype.$spinner = {
      // dispatch 'spin' event
      show(params) {
        console.log('dispatch show-spin event');
        this.EventBus.$emit('show-spin', params);
      },
      hide() {
        console.log('dispatch hide-spin event');
        this.EventBus.$emit('hide-spin');
      },
      EventBus: this.EventBus,
    };
    Vue.prototype.$loader = {
      // dispatch 'loading' event
      show(params) {
        console.log('dispatch show-loading event');
        this.EventBus.$emit('show-loading', params);
      },
      hide() {
        console.log('dispatch hide-loading event');
        this.EventBus.$emit('hide-loading');
      },
      EventBus: this.EventBus,
    };
    Vue.prototype.$pace = {
      // dispatch 'pacing' event
      show() {
        console.log('dispatch show-pace event');
        this.EventBus.$emit('show-pace');
      },
      hide() {
        console.log('dispatch hide-pace event');
        this.EventBus.$emit('hide-pace');
      },
      EventBus: this.EventBus,
    };
  }
};
