<template>
  <content-page :header="header" :title="title">
    <template slot="content">
      <div class="container">
        <div class="type-container">
          <select-pill :options="typeOptions" />
        </div>
        <div class="form-container">
          <form @submit.prevent="validateForm">
            <validate-input
              :inputType="'text'"
              :label="typeLabel"
              :validationRules="'required'"
              :onChange="updateFormData"
            />
            <validate-input
              :inputType="'text'"
              :label="companyLabel"
              :validationRules="'required'"
              :onChange="updateFormData"
            />
            <button class="button" type="submit">Submit</button>
          </form>
        </div>
      </div>
    </template>
  </content-page>
</template>

<script>
import ContentPage from '../common/ContentPage';
import SelectPill from '../common/SelectPill';
import ValidateInput from '../common/ValidateInput';
import {
  COMPANY_LABEL,
  ENTRY_TYPE_ENUM,
  ENTRY_TYPE_LABEL,
} from '../../utils/constants';

export default {
  name: 'AddEntry',
  components: {
    contentPage: ContentPage,
    selectPill: SelectPill,
    validateInput: ValidateInput,
  },
  data() {
    return {
      header: 'Add Entry',
      title: 'Fill in data for new entry',
      typeOptions: ENTRY_TYPE_ENUM,
      // Form label
      typeLabel: ENTRY_TYPE_LABEL,
      companyLabel: COMPANY_LABEL,
      // Form data model
      type: null,
      companyName: null,
    };
  },
  methods: {
    updateFormData(label, value) {
      switch (label) {
        case ENTRY_TYPE_LABEL:
          this.type = value;
          break;
        case COMPANY_LABEL:
          this.companyName = value;
          break;
        default:
          break;
      }
    },
    validateForm() {
      this.$validator
        .validateAll()
        .then((result) => {
          if (result) {
            console.log('validateForm result', result);
          }
        });
    },
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
    padding: 20px;
  }
</style>
