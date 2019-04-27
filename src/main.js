// All External CSS Files
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
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

// Local Files
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';

// Fonts
library.add(faSignOutAlt, faThLarge, faDatabase, faUpload, faCopy);

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
