import apiService from '../api';
import { ENTRY_ROUTE } from '../api/constants';

const getDefaultState = () => ({
  entry: {
    id: null,
    type: null,
    companyName: null,
    country: null,
    currency: null,
    sector: null,
    date: null,
    price: null,
    quantity: null,
    profitTarget: null,
    stopLoss: null,
    dividend: null,
    createdAt: null,
    updatedAt: null,
  },
});

const state = getDefaultState();

const mutations = {
  'SET_ENTRY'(state, entry) {
    state.entry = { ...entry };
  },
  'CLEAR_ALL_STATE'(state) {
    Object.assign(state, getDefaultState());
  },
};

const actions = {
  createEntry(context, entry) {
    return apiService.post(ENTRY_ROUTE, entry);
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
