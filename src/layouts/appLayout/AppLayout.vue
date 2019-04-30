<template>
  <div class="app-layout">
    <app-side-nav></app-side-nav>
    <div class="content">
      <app-header></app-header>
      <app-Content></app-Content>
    </div>
  </div>
</template>

<script>
import AppSideNav from './AppSideNav';
import AppHeader from './AppHeader';
import AppContent from './AppContent';

export default {
  name: 'AppLayout',
  components: {
    appSideNav: AppSideNav,
    appHeader: AppHeader,
    appContent: AppContent,
  },
};
</script>

<style scoped lang="scss">
  .content {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    width: calc(100% - 220px);
    margin-left: 220px;
  }
</style>
