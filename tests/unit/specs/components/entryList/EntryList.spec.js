import { shallowMount, createLocalVue } from '@vue/test-utils';
import sinon from 'sinon';
import Vuex from 'vuex';

import EntryList from '@/components/entryList/EntryList';
import entryListStore from '@/store/entryList';

const localVue = createLocalVue();
localVue.use(Vuex);

let state;
let actions;
let store;

describe('EntryList.vue', () => {
  beforeEach(() => {
    state = { ...entryListStore.state };

    actions = {
      getEntryList: sinon.spy(),
    };

    store = new Vuex.Store({
      modules: {
        entryList: {
          namespaced: true,
          state,
          actions,
        },
      },
    });
  });

  describe('Methods', () => {
    describe('getEntryList', () => {
      it('should trigger `getEntryList` action', () => {
        const wrapper = shallowMount(EntryList, {
          localVue,
          store,
        });
        wrapper.vm.getEntryList();
        // First call by 'created' lifecycle
        sinon.assert.calledTwice(actions.getEntryList);
      });
    });

    describe('handleTypeChange', () => {
      it('should trigger `getEntryList` action', () => {
        const wrapper = shallowMount(EntryList, {
          localVue,
          store,
        });
        wrapper.vm.handleTypeChange();
        // First call by 'created' lifecycle
        sinon.assert.calledTwice(actions.getEntryList);
      });
    });

    describe('handleCountryChange', () => {
      it('should trigger `getEntryList` action', () => {
        const wrapper = shallowMount(EntryList, {
          localVue,
          store,
        });
        wrapper.vm.handleTypeChange();
        // First call by 'created' lifecycle
        sinon.assert.calledTwice(actions.getEntryList);
      });
    });

    describe('handleSectorChange', () => {
      it('should trigger `getEntryList` action', () => {
        const wrapper = shallowMount(EntryList, {
          localVue,
          store,
        });
        wrapper.vm.handleTypeChange();
        // First call by 'created' lifecycle
        sinon.assert.calledTwice(actions.getEntryList);
      });
    });
  });

  describe('Lifecycle', () => {
    describe('created', () => {
      it('should trigger `getEntryList` action', () => {
        shallowMount(EntryList, {
          localVue,
          store,
        });
        sinon.assert.calledOnce(actions.getEntryList);
      });
    });
  });
});
