import Vue from 'vue';
import { ValidationProvider } from 'vee-validate';

import './rules';

/**
 * Register globally validation component
 */
Vue.component('validator', ValidationProvider);
