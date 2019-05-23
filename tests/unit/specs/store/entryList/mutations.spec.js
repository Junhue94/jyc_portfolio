import { assert } from 'chai';

import store from '@/store/entryList';
import { PAGE_PARAMS } from '@/api/_mock/common';
import { GET_ENTRY_LIST } from '@/api/_mock/entryListResult';

const {
  SET_ENTRY_LIST,
  SET_ENTRY_LIST_PARAMS,
  CLEAR_ALL_STATE,
} = store.mutations;

describe('Entry List Mutations', () => {
  let state = {};

  beforeEach(() => {
    state = { ...store.state };
  });

  it('should mutate `entryList` using SET_ENTRY_LIST', () => {
    SET_ENTRY_LIST(state, GET_ENTRY_LIST);
    assert.deepEqual(state.entryList, GET_ENTRY_LIST);
  });

  it('should mutate `entryListParams` using SET_ENTRY_LIST_PARAMS', () => {
    SET_ENTRY_LIST_PARAMS(state, PAGE_PARAMS);
    assert.deepEqual(state.entryListParams, PAGE_PARAMS);
  });

  it('should reset state using CLEAR_ALL_STATE', () => {
    state.entryList = GET_ENTRY_LIST;
    state.entryListParams = PAGE_PARAMS;
    CLEAR_ALL_STATE(state);
    assert.deepEqual(state, store.state);
  });
});
