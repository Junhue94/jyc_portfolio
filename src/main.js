// All External CSS Files
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'toastr/build/toastr.css';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faSignOutAlt,
  faThLarge,
  faDatabase,
  faUpload,
  faCopy,
} from '@fortawesome/free-solid-svg-icons';

// Modules
import Vue from 'vue';
import VeeValidate from 'vee-validate';

// Local Files
import App from './App';
import router from './router';
import store from './store';
import filters from './filters';
import './registerServiceWorker';

import { veeValidateConfig } from './utils/config';

// Fonts
library.add(faSignOutAlt, faThLarge, faDatabase, faUpload, faCopy);
Vue.component('font-awesome-icon', FontAwesomeIcon);

// Use third-party modules in Vue
Vue.use(VeeValidate, veeValidateConfig);
Vue.use(filters);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
