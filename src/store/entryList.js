import apiService from '../api';
import { ENTRY_LIST_ROUTE } from '../api/constants';
import { getQueryParams } from '../utils/helper';

const getDefaultState = () => ({
  entryId: null,
  entryBuy: {
    type: null,
    name: null,
    country: null,
    currency: null,
    sector: null,
    buyDate: null,
    buyPrice: null,
    buyQuantity: null,
    profitTarget: null,
    stopLoss: null,
  },
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
  'SET_ENTRY_ID'(state, entryId) {
    state.entryId = entryId;
  },
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
    return apiService.get(ENTRY_LIST_ROUTE, { params: options })
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

const getters = {
  entryId(state) {
    return state.entryId;
  },
  entryList(state) {
    return state.entryList;
  },
  entryListParams(state) {
    return state.entryListParams;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
