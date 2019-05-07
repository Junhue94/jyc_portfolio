import Vue from 'vue';
import Vuex from 'vuex';

import entry from './entry';
import entryList from './entryList';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    entry,
    entryList,
  },
});
