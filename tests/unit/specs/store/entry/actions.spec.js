import store from '@/store/entry';
import { actionHelper } from '../../../helpers/store';
import { CREATE_ENTRY } from '@/api/_mock/entryListResult';

const {
  createEntry,
  clearState,
} = store.actions;

describe('Entry Actions', () => {
  let state = {};

  beforeEach(() => {
    state = { ...store.state };
  });

  describe('createEntry action', () => {
    it('should not dispatch mutations', (done) => {
      actionHelper(createEntry, CREATE_ENTRY, state, [], done);
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
