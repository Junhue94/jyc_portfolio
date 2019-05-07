import apiService from '../api';
import { ENTRY_ROUTE } from '../api/constants';
import { getQueryParams } from '../utils/helper';

const getDefaultState = () => ({
  entryList: [],
  entryListParams: {
    offset: 25,
    totalRows: null,
    currentPage: 1,
    totalPage: null,
    sortField: null,
    sortSeq: null,
    filter: {},
  },
});

const state = getDefaultState();

const mutations = {
  'SET_ENTRY_LIST'(state, entryList) {
    state.entryList = [...entryList];
  },
  'SET_ENTRY_LIST_PARAMS'(state, entryListParams) {
    state.entryListParams = { ...entryListParams };
  },
  'CLEAR_ALL_STATE'(state) {
    // Merge rather than replace so we don't lose observers
    // https://github.com/vuejs/vuex/issues/1118
    Object.assign(state, getDefaultState());
  },
};

const actions = {
  getEntryList({ commit }, options) {
    return apiService.get(ENTRY_ROUTE, { params: options })
      .then(({ data }) => {
        commit('SET_ENTRY_LIST', data.data);
        commit('SET_ENTRY_LIST_PARAMS', getQueryParams(data));
        return data;
      });
  },
  clearState({ commit }) {
    commit('CLEAR_ALL_STATE');
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
