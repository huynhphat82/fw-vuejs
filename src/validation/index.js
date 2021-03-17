import Vue from 'vue';
import { ValidationObserver, ValidationProvider } from 'vee-validate';

import './rules';

/**
 * Register globally validation component
 */
Vue.component('validator', ValidationProvider);
Vue.component('observer', ValidationObserver);
