import apiService from '../api';

const state = {
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
};

const mutations = {
  'SET_ENTRY_ID'(state, entryId) {
    state.entryId = entryId;
  },
  'SET_ENTRY_LIST'(state, entryList) {
    state.entryList = [...entryList];
  },
};

const actions = {
  getEntryList({ commit }) {
    return apiService.get('/entryList')
      .then((res) => {
        commit('SET_ENTRY_LIST', res.data);
        return res;
      });
  },
};

const getters = {
  entryId(state) {
    return state.entryId;
  },
  entryList(state) {
    return state.entryList;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
