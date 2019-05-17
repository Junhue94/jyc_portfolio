import { assert } from 'chai';

import store from '@/store/entry';
import { CREATE_ENTRY } from '@/api/_mock/entryListResult';

const {
  SET_ENTRY,
  CLEAR_ALL_STATE,
} = store.mutations;

describe('Entry Mutations', () => {
  let state = {};

  beforeEach(() => {
    state = { ...store.state };
  });

  it('should mutate `entry` using SET_ENTRY', () => {
    SET_ENTRY(state, CREATE_ENTRY);
    assert.deepEqual(state.entry, CREATE_ENTRY);
  });

  it('should reset state using CLEAR_ALL_STATE', () => {
    state.entry = CREATE_ENTRY;
    CLEAR_ALL_STATE(state);
    assert.deepEqual(state, store.state);
  });
});
