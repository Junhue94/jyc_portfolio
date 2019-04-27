<template>
  <content-page :header="header" :title="title">
    <template slot="content">
      <div>{{ entryList }}</div>
    </template>
  </content-page>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
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
  methods: {
    ...mapActions('entryList', {
      getEntryListAction: 'getEntryList',
    }),
  },
  computed: {
    ...mapGetters('entryList', {
      entryListGetter: 'entryList',
    }),
    entryList() {
      return this.entryListGetter;
    },
  },
  created() {
    this.getEntryListAction();
  },
};
</script>

<style scoped lang="scss">

</style>
