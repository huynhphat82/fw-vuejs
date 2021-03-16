
import Vue from 'vue';
import { ValidationProvider } from 'vee-validate';
import './rules';

// Register it globally
Vue.component('validator', ValidationProvider);
