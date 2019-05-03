<template>
  <content-page :header="header" :title="title">
    <template slot="content">
      <div class="container">
        <div class="type-container">
          <select-pill :options="typeOptions" />
        </div>
        <div class="form-container">
        </div>
      </div>
    </template>
  </content-page>
</template>

<script>
import ContentPage from '../common/ContentPage';
import SelectPill from '../common/SelectPill';
import { ENTRY_TYPE_ENUM } from '../../utils/constants';

export default {
  name: 'AddEntry',
  components: {
    contentPage: ContentPage,
    selectPill: SelectPill,
  },
  data() {
    return {
      header: 'Add Entry',
      title: 'Fill in data for new entry',
      typeOptions: ENTRY_TYPE_ENUM,
    };
  },
};
</script>

<style scoped lang="scss">
  @import "../../styles/theme";

  .container {
    padding: 0;
  }

  .type-container {
    padding: 20px;
    border-bottom: 2px solid $background-light-gray;
  }

  .form-container {
  }
</style>
