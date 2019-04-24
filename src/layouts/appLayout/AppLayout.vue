<template>
  <div class="app-layout">
    <app-header></app-header>
    <app-side-nav></app-side-nav>
  </div>
</template>

<script>
import AppHeader from './AppHeader.vue';
import AppSideNav from './AppSideNav.vue';

export default {
  name: 'AppLayout',
  components: {
    appHeader: AppHeader,
    appSideNav: AppSideNav,
  },
};
</script>
