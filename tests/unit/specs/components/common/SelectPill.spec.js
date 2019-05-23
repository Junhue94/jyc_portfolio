import { shallowMount, createLocalVue } from '@vue/test-utils';
import sinon from 'sinon';
import { assert } from 'chai';

import SelectPill from '@/components/common/SelectPill';

const localVue = createLocalVue();
const requiredProps = {
  options: ['Buy', 'Sell'],
};
const mocks = {
  activeItem: null,
};

describe('SelectPill.vue', () => {
  describe('Methods', () => {
    describe('onOptionClick', () => {
      it('should set `activeItem` props', () => {
        const updatedActiveItem = 'Dividend';
        const wrapper = shallowMount(SelectPill, {
          localVue,
          mocks,
          propsData: {
            ...requiredProps,
          },
        });

        wrapper.vm.onOptionClick(updatedActiveItem);
        assert.equal(wrapper.vm.activeItem, updatedActiveItem);
      });

      it('should trigger `onChange` props', () => {
        const onChangeSpy = sinon.spy();
        const wrapper = shallowMount(SelectPill, {
          localVue,
          mocks,
          propsData: {
            ...requiredProps,
            onChange: onChangeSpy,
          },
        });

        wrapper.vm.onOptionClick();
        // First call by created lifecycle
        sinon.assert.calledTwice(onChangeSpy);
      });
    });
  });

  describe('Lifecycle', () => {
    describe('created', () => {
      it('should set first item in `options` props as `activeItem` props', () => {
        const wrapper = shallowMount(SelectPill, {
          localVue,
          mocks,
          propsData: {
            ...requiredProps,
          },
        });

        assert.equal(wrapper.vm.activeItem, requiredProps.options[0]);
      });

      it('should trigger `onChange` props', () => {
        const onChangeSpy = sinon.spy();
        shallowMount(SelectPill, {
          localVue,
          mocks,
          propsData: {
            ...requiredProps,
            onChange: onChangeSpy,
          },
        });

        sinon.assert.calledOnce(onChangeSpy);
      });
    });
  });
});
