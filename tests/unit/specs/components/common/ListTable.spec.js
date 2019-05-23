import { shallowMount, createLocalVue } from '@vue/test-utils';
import sinon from 'sinon';
import { assert } from 'chai';

import ListTable from '@/components/common/ListTable';
import Filters from '@/filters';
import { PAGE_PARAMS } from '@/api/_mock/common';

const localVue = createLocalVue();
localVue.use(Filters);

const requiredProps = {
  headerList: ['Date', 'Type', 'Name'],
  dataList: ['Date', 'Type', 'Name'],
  queryParams: PAGE_PARAMS,
};

describe('ListTable.vue', () => {
  describe('Watchers', () => {
    describe('queryParams.totalPage', () => {
      it('should trigger `changePage` method', () => {
        const changePageSpy = sinon.spy();
        const wrapper = shallowMount(ListTable, {
          localVue,
          propsData: { ...requiredProps },
          methods: { changePage: changePageSpy },
        });

        // Trigger watcher
        wrapper.setProps({
          queryParams: {
            totalPage: 19,
          },
        });
        // First call is by created lifecycle
        sinon.assert.calledTwice(changePageSpy);
      });
    });

    describe('queryParams.offset', () => {
      it('should trigger `getList` props', () => {
        const getListSpy = sinon.spy();
        const wrapper = shallowMount(ListTable, {
          localVue,
          propsData: {
            ...requiredProps,
            getList: getListSpy,
          },
        });

        // Trigger watcher
        wrapper.setProps({
          queryParams: {
            offset: 19,
          },
        });
        sinon.assert.calledOnce(getListSpy);
      });
    });

    describe('queryParams.currentPage', () => {
      it('should set `isFirstPage` props correctly', () => {
        const wrapper = shallowMount(ListTable, {
          localVue,
          propsData: { ...requiredProps },
        });

        // Case: First page
        wrapper.setProps({
          queryParams: {
            currentPage: 1,
          },
        });
        assert.isTrue(wrapper.vm.isFirstPage);

        // Case: Not first page
        wrapper.setProps({
          queryParams: {
            currentPage: 4,
          },
        });
        assert.isFalse(wrapper.vm.isFirstPage);
      });

      it('should set `isLastPage` props correctly', () => {
        const wrapper = shallowMount(ListTable, {
          localVue,
          propsData: { ...requiredProps },
        });

        // Case: Last page
        wrapper.setProps({
          queryParams: {
            currentPage: 10,
            totalPage: 10,
          },
        });
        assert.isTrue(wrapper.vm.isLastPage);

        // Case: Not last page
        wrapper.setProps({
          queryParams: {
            currentPage: 5,
            totalPage: 10,
          },
        });
        assert.isFalse(wrapper.vm.isLastPage);
      });
    });
  });

  describe('Methods', () => {
    describe('dataFilter', () => {
      it('should trigger Filter plugin method if method exists', () => {
        const wrapper = shallowMount(ListTable, {
          localVue,
          propsData: { ...requiredProps },
        });

        const result = wrapper.vm.dataFilter('number', 10);
        assert.equal(result, '10');
      });

      it('should return input value if Filter plugin method does not exist', () => {
        const wrapper = shallowMount(ListTable, {
          localVue,
          propsData: { ...requiredProps },
        });
        const value = 10;
        const result = wrapper.vm.dataFilter(null, value);
        assert.equal(result, value);
      });
    });

    describe('handleOffsetChange', () => {
      it('should trigger `getList` props', () => {
        const changePageSpy = sinon.spy();
        shallowMount(ListTable, {
          localVue,
          propsData: { ...requiredProps },
          methods: { changePage: changePageSpy },
        });
        sinon.assert.calledOnce(changePageSpy);
      });
    });

    describe('setSortSeq', () => {
      it('should set alternating sort sequence if same `sortField` is clicked', () => {
        const sortField = 'name';
        const wrapper = shallowMount(ListTable, {
          localVue,
          propsData: { ...requiredProps },
        });

        // Switch from asc to desc
        wrapper.setData({ sortField, sortSeq: 'asc' });
        wrapper.vm.setSortSeq(sortField);
        assert.equal(wrapper.vm.sortSeq, 'desc');

        // Switch from desc to asc
        wrapper.setData({ sortField, sortSeq: 'desc' });
        wrapper.vm.setSortSeq(sortField);
        assert.equal(wrapper.vm.sortSeq, 'asc');

        // Default sort set to asc
        wrapper.setData({ sortField, sortSeq: '' });
        wrapper.vm.setSortSeq(sortField);
        assert.equal(wrapper.vm.sortSeq, 'asc');
      });

      it('should set new `sortField` and `sortSeq` to ascending order when `sortField` changed', () => {
        const wrapper = shallowMount(ListTable, {
          localVue,
          propsData: { ...requiredProps },
        });

        wrapper.setData({ sortField: 'name', sortSeq: 'desc' });
        wrapper.vm.setSortSeq('header');
        assert.equal(wrapper.vm.sortField, 'header');
        assert.equal(wrapper.vm.sortSeq, 'asc');
      });
    });

    describe('setNewPage', () => {
      const queryParams = {
        queryParams: {
          currentPage: 3,
        },
      };
      let wrapper;

      beforeEach(() => {
        wrapper = shallowMount(ListTable, {
          localVue,
          propsData: { ...requiredProps },
        });
      });

      it('should return one page higher than `currentPage` for `next` case', () => {
        wrapper.setProps(queryParams);
        const nextPage = wrapper.vm.setNewPage('next');
        assert.equal(nextPage, 4);
      });

      it('should return one page lower than `currentPage` for `previous` case', () => {
        wrapper.setProps(queryParams);
        const nextPage = wrapper.vm.setNewPage('previous');
        assert.equal(nextPage, 2);
      });

      it('should return page number by default', () => {
        wrapper.setProps(queryParams);
        const currentPage = 5;
        const nextPage = wrapper.vm.setNewPage(currentPage);
        assert.equal(nextPage, currentPage);
      });
    });

    describe('changePage', () => {
      it('should return relevant `pageRange`', () => {
        const wrapper = shallowMount(ListTable, {
          localVue,
          propsData: { ...requiredProps },
          mocks: { pageRange: [] },
        });

        // Case: totalPage <= 5
        wrapper.setProps({
          queryParams: {
            currentPage: 1,
            offset: 10,
            totalPage: 4,
          },
        });
        wrapper.vm.changePage(3);
        assert.sameOrderedMembers(wrapper.vm.pageRange, [1, 2, 3, 4]);

        // Setup for all subsequent cases
        wrapper.setProps({
          queryParams: {
            currentPage: 1,
            offset: 10,
            totalPage: 10,
          },
        });

        // Case: newPage + 2 >= totalPage
        wrapper.vm.changePage(8);
        assert.sameOrderedMembers(wrapper.vm.pageRange, [6, 7, 8, 9, 10]);
        wrapper.vm.changePage(9);
        assert.sameOrderedMembers(wrapper.vm.pageRange, [6, 7, 8, 9, 10]);

        // Case: newPage - 2 <= 1
        wrapper.vm.changePage(2);
        assert.sameOrderedMembers(wrapper.vm.pageRange, [1, 2, 3, 4, 5]);
        wrapper.vm.changePage(3);
        assert.sameOrderedMembers(wrapper.vm.pageRange, [1, 2, 3, 4, 5]);

        // Default case
        wrapper.vm.changePage(5);
        assert.sameOrderedMembers(wrapper.vm.pageRange, [3, 4, 5, 6, 7]);
        wrapper.vm.changePage(6);
        assert.sameOrderedMembers(wrapper.vm.pageRange, [4, 5, 6, 7, 8]);
      });

      it('should trigger `getList` props when navigate to different page', () => {
        const getListSpy = sinon.spy();
        const wrapper = shallowMount(ListTable, {
          localVue,
          propsData: {
            ...requiredProps,
            getList: getListSpy,
            queryParams: {
              currentPage: 1,
              offset: 10,
              totalPage: 10,
            },
          },
          mocks: { pageRange: [] },
        });

        wrapper.vm.changePage(2);
        // Created lifecycle wont trigger `getList` props if `currentPage` is the same
        sinon.assert.calledOnce(getListSpy);
      });
    });
  });

  describe('Computed', () => {
    describe('currentEntryFirstIndex', () => {
      let wrapper;

      beforeEach(() => {
        wrapper = shallowMount(ListTable, {
          localVue,
          propsData: {
            ...requiredProps,
            queryParams: {
              currentPage: 5,
              offset: 50,
              totalPage: 20,
            },
          },
        });
      });

      it('should return correct `currentEntryFirstIndex` props', () => {
        assert.equal(wrapper.vm.currentEntryFirstIndex, 201);
      });

      it('should return correct `currentEntryLastIndex` props', () => {
        assert.equal(wrapper.vm.currentEntryLastIndex, 250);
      });
    });
  });

  describe('Lifecycle', () => {
    describe('Created', () => {
      it('should trigger `changePage` method', () => {
        const changePageSpy = sinon.spy();
        shallowMount(ListTable, {
          localVue,
          propsData: { ...requiredProps },
          methods: { changePage: changePageSpy },
        });
        sinon.assert.calledOnce(changePageSpy);
      });
    });
  });
});
