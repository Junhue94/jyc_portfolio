import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { ENTRY_ROUTE } from './constants';
import { PAGE_PARAMS } from './_mock/common';
import {
  CREATE_ENTRY,
  GET_ENTRY_LIST,
} from './_mock/entryListResult';

const apiService = axios.create({
  baseURL: 'http://localhost:3000/api/',
  timeout: 1000,
  headers: { 'X-Custom-Header': 'foobar' },
});

const mockApiService = new MockAdapter(apiService);

mockApiService
  .onPost(ENTRY_ROUTE)
  .reply(200, CREATE_ENTRY);

mockApiService
  .onGet(ENTRY_ROUTE)
  .reply((config) => {
    if (config.params) {
      return [
        200,
        {
          ...PAGE_PARAMS,
          ...config.params,
          data: GET_ENTRY_LIST,
        },
      ];
    }
    return [400];
  });

export default apiService;
