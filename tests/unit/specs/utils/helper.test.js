import { assert } from 'chai';
import { getQueryParams } from '@/utils/helper';

describe('Utils - helper', () => {
  describe('getQueryParams', () => {
    it('should return object with data key omitted', () => {
      const result = getQueryParams({
        data: 'data',
        queryParams: 'queryParams',
      });
      assert.deepEqual(result, { queryParams: 'queryParams' });
    });
  });
});
