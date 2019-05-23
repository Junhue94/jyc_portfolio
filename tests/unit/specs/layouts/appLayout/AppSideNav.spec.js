import { shallowMount, createLocalVue } from '@vue/test-utils';
import { assert } from 'chai';

import AppSideNav from '@/layouts/appLayout/AppSideNav';

const localVue = createLocalVue();
// Stubs child components
const stubs = ['router-link', 'font-awesome-icon'];
const mocks = {
  activeItem: null,
};

describe('AppSideNav.vue', () => {
  describe('Methods', () => {
    describe('onMenuItemClick', () => {
      it('should set props `activeItem`', () => {
        const updatedActiveItem = 'entry';
        const wrapper = shallowMount(AppSideNav, {
          localVue,
          stubs,
          mocks,
        });

        wrapper.vm.onMenuItemClick(updatedActiveItem);
        assert.equal(wrapper.vm.activeItem, updatedActiveItem);
      });
    });
  });

  describe('Lifecycle', () => {
    describe('created', () => {
      it('should set props `activeItem` based on router name', () => {
        const routerName = 'entry';
        const wrapper = shallowMount(AppSideNav, {
          localVue,
          stubs,
          mocks: {
            ...mocks,
            $router: {
              history: {
                current: {
                  name: routerName,
                },
              },
            },
          },
        });
        assert.equal(wrapper.vm.activeItem, routerName);
      });
    });
  });
});
