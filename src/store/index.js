import Vue from 'vue';
import Vuex from 'vuex';

import entryList from './entryList';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    entryList,
  },
});
