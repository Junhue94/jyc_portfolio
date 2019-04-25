<template>
  <div class="app-content">
    <transition name="slide-fade">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'AppContent',
};
</script>

<style scoped lang="scss">
  @import "../../styles/theme.scss";

  .app-content {
    min-height: calc(100vh - 60px);
    display: flex;
    flex-direction: column;
  }

  // Transition Class
  .slide-fade-enter-active {
    transition: all 0.6s ease;
  }

  .slide-fade-enter {
    transform: translateZ(10px);
    opacity: 0;
  }
</style>
