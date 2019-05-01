<template>
  <div class="content-page">
    <div class="header">{{ header }}</div>
    <div class="panel">
      <div class="title">{{ title }}</div>
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContentPage',
  props: [
    'header',
    'title',
  ],
};
</script>

<style scoped lang="scss">
  @import "../../styles/theme";

  .content-page {
    display: flex;
    flex-direction: column;
    flex: 1;
    background: $background-light-gray;
  }

  .header {
    height: 60px;
    padding: 0 30px;
    display: flex;
    align-items: center;
    font-size: $h2-font-size;
    background: $background-white;
  }

  .panel {
    display: flex;
    flex: 1;
    flex-direction: column;
    margin: 30px;
    border-radius: $border-radius-default;
    background: $background-white;
  }

  .title {
    display: flex;
    align-items: center;
    padding: 0 20px;
    height: 40px;
    border-bottom: 2px solid $background-light-gray;
    font-size: $body1-font-size;
    font-weight: $bold;
  }
</style>
