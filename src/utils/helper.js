import omit from 'lodash/omit';

export const getQueryParams = res => omit(res, 'data');
