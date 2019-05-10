import { assert } from 'chai';
import { fullDate } from '@/filters/date';

describe('Filters - Date', () => {
  describe('fullDate', () => {
    it('should return correct date format if input is valid', () => {
      const validDate = new Date(2018, 11, 11);
      const result = fullDate(validDate);
      assert.equal(result, '11 Dec 18');
    });

    it('should return "-" if input is invalid', () => {
      const invalidDate = '2011-10-10T10:20:90';
      const result = fullDate(invalidDate);
      assert.equal(result, '-');
    });
  });
});
