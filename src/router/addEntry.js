const baseUri = '/addEntry';

export default [
  {
    path: baseUri,
    name: 'addEntry',
    component: () => import(/* webpackChunkName: "addEntry" */ '../views/AddEntry'),
  },
];
