const baseUri = '/entryList';

export default [
  {
    path: baseUri,
    name: 'entryList',
    component: () => import(/* webpackChunkName: "entryList" */ '../views/EntryList'),
  },
];
