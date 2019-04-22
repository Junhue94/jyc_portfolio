const baseUri = '/login';

export default [
  {
    path: baseUri,
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
  },
];
