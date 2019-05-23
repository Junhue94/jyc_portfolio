import { shallowMount, createLocalVue } from '@vue/test-utils';
import { assert } from 'chai';
import sinon from 'sinon';
import Vuex from 'vuex';
import VeeValidate from 'vee-validate';

import AddEntry from '@/components/addEntry/AddEntry';
import entryStore from '@/store/entry';
import { veeValidateConfig } from '@/utils/config';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VeeValidate, veeValidateConfig);

let state;
let actions;
let store;

describe('AddEntry.vue', () => {
  beforeEach(() => {
    state = { ...entryStore.state };

    actions = {
      createEntry: sinon.fake.resolves(),
      clearState: sinon.spy(),
    };

    store = new Vuex.Store({
      modules: {
        entry: {
          namespaced: true,
          state,
          actions,
        },
      },
    });
  });

  describe('Methods', () => {
    describe('setType', () => {
      it('should set props `type`', () => {
        const updatedType = 'Buy';
        const wrapper = shallowMount(AddEntry, {
          localVue,
          store,
          mocks: {
            type: null,
          },
        });

        wrapper.vm.setType(updatedType);
        assert.equal(wrapper.vm.type, updatedType);
      });
    });

    describe('validateForm', () => {
      let validatorFake;

      beforeEach(async () => {
        const wrapper = shallowMount(AddEntry, {
          localVue,
          store,
        });

        // Fake form validator
        validatorFake = {
          validateAll: sinon.fake.resolves(true),
          reset: sinon.spy(),
        };

        wrapper.setData({
          $validator: validatorFake,
        });
        await wrapper.vm.validateForm();
      });

      it('should trigger `$validator.validateAll`', () => {
        sinon.assert.calledOnce(validatorFake.validateAll);
      });

      it('should trigger `createEntry` action', () => {
        sinon.assert.calledOnce(actions.createEntry);
      });

      it('should trigger `clearState` action', () => {
        sinon.assert.calledOnce(actions.clearState);
      });

      it('should trigger `$validator.reset`', () => {
        sinon.assert.calledOnce(validatorFake.reset);
      });
    });
  });
});
