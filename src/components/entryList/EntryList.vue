<template>
  <content-page :header="header" :title="title">
    <template slot="content">
      <div>Test</div>
    </template>
  </content-page>
</template>

<script>
import ContentPage from '../common/ContentPage.vue';

export default {
  name: 'EntryList',
  components: {
    contentPage: ContentPage,
  },
  data() {
    return {
      header: 'Entry List',
      title: 'Entry List with Filters',
    };
  },
};
</script>

<style scoped lang="scss">

</style>
