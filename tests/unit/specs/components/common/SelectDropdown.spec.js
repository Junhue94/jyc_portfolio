import { shallowMount, createLocalVue } from '@vue/test-utils';
import sinon from 'sinon';

import SelectDropdown from '@/components/common/SelectDropdown';
import { mockEvent } from '../../../helpers/utils';

const localVue = createLocalVue();
const requiredProps = {
  label: '',
  options: '',
};

describe('SelectDropdown.vue', () => {
  describe('Methods', () => {
    describe('handleDropdownChange', () => {
      it('should trigger `onChange` props', () => {
        const onChangeSpy = sinon.spy();
        const wrapper = shallowMount(SelectDropdown, {
          localVue,
          propsData: {
            ...requiredProps,
            onChange: onChangeSpy,
          },
        });

        wrapper.vm.handleDropdownChange(mockEvent());
        sinon.assert.calledOnce(onChangeSpy);
      });
    });
  });
});
