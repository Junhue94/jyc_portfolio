import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { ENTRY_LIST_ROUTE } from './constants';
import { GET_ENTRY_LIST } from './_mock/entryListResult';

const apiService = axios.create({
  baseURL: 'http://localhost:3000/api/',
  timeout: 1000,
  headers: { 'X-Custom-Header': 'foobar' },
});

const mockApiService = new MockAdapter(apiService);

mockApiService
  .onGet(ENTRY_LIST_ROUTE)
  .reply(200, GET_ENTRY_LIST);

// Handle Params
// mock.onGet('/api').reply(function(config) {
//   if (config.params.name === 'Bob') { // or check for deep equality with config.params
//     return [200, 'Hello'];
//   } else {
//     return [400];
//   }
// });

export default apiService;
