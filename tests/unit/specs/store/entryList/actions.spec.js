import store from '@/store/entryList';
import { actionHelper } from '../../../helpers/store';
import { GET_ENTRY_LIST } from '@/api/_mock/entryListResult';
import { PAGE_PARAMS } from '@/api/_mock/common';

const {
  getEntryList,
  clearState,
} = store.actions;

describe('Entry List Actions', () => {
  let state = {};

  beforeEach(() => {
    state = { ...store.state };
  });

  describe('getEntryList action', () => {
    it('should dispatch the correct mutations', (done) => {
      actionHelper(getEntryList, PAGE_PARAMS, state, [
        { type: 'SET_ENTRY_LIST', payload: GET_ENTRY_LIST },
        { type: 'SET_ENTRY_LIST_PARAMS', payload: PAGE_PARAMS },
      ], done);
    });
  });

  describe('clearState action', () => {
    it('should dispatch the correct mutations', (done) => {
      actionHelper(clearState, null, state, [
        { type: 'CLEAR_ALL_STATE' },
      ], done);
    });
  });
});
