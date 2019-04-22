// Modules
import Vue from 'vue';
import Router from 'vue-router';

// Layouts
import LoginLayout from '../layouts/loginLayout/LoginLayout.vue';
import AppLayout from '../layouts/appLayout/AppLayout.vue';

// Routes
import routeLogin from './login';
import routeEntryList from './entryList';
import routeAddEntry from './addEntry';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      component: LoginLayout,
      children: [
        ...routeLogin,
      ],
    },
    {
      path: '/',
      component: AppLayout,
      children: [
        ...routeEntryList,
        ...routeAddEntry,
        {
          path: '',
          name: 'index',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "index" */ '../views/Home.vue'),
        },
      ],
    },
    {
      path: '*',
      component: () => import(/* webpackChunkName: "catchAll" */ '../views/Home.vue'),
    },
  ],
});
