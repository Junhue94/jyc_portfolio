import apiService from '../api';

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
    offset: 50,
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
  'SET_STOCK_LIST_PARAMS'(state, entryListParams) {
    state.entryListParams = { ...entryListParams };
  },
  'CLEAR_ALL_STATE'(state) {
    // Merge rather than replace so we don't lose observers
    // https://github.com/vuejs/vuex/issues/1118
    Object.assign(state, getDefaultState());
  },
};

const actions = {
  getEntryList({ commit }) {
    return apiService.get('/entryList')
      .then((res) => {
        console.log('actions res', res);
        commit('SET_ENTRY_LIST', res.data);
        return res;
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
