<template>
  <div class="app-header">
    <div class="menu-item">
      <font-awesome-icon icon="sign-out-alt" class="icon" />
      <span>Log Out</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppHeader',
};
</script>

<style scoped lang="scss">
  @import "../../styles/theme.scss";

  .app-header {
    height: 60px;
    width: calc(100% - 220px);
    margin-left: 220px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    position: fixed;
    background-color: $background-light-gray;
  }

  .menu-item {
    display: flex;
    height: 100%;
    align-items: center;
    margin-right: 50px;
    font-size: $body1-font-size;
    color: $semi-dark-gray-default;
    font-weight: $bold;
    cursor: pointer;
  }

  .icon {
    margin-right: 5px;
    color: $semi-dark-gray-default;
    font-size: 20px;
  }
</style>
