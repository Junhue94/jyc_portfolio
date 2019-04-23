<template>
  <div class="app-layout">
    <app-header></app-header>
  </div>
</template>

<script>
import AppHeader from './AppHeader.vue';

export default {
  name: 'AppLayout',
  components: {
    appHeader: AppHeader,
  },
};
</script>
