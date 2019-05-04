<template>
  <content-page :header="header" :title="title">
    <template slot="content">
      <div class="container">
        <div class="type-container">
          <select-pill
            :options="typeEnum"
            :onChange="setType"
          />
        </div>
        <div class="form-container">
          <form @submit.prevent="validateForm">
            <validate-input
              :inputType="'text'"
              :label="companyLabel"
              :validationRules="'required'"
              :onChange="updateFormData"
            />
            <validate-select-single
              :label="countryLabel"
              :options="countryEnum"
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
import ValidateSelectSingle from '../common/ValidateSelectSingle';
import {
  COUNTRY_ENUM,
  COUNTRY_LABEL,
  COMPANY_LABEL,
  ENTRY_TYPE_ENUM,
} from '../../utils/constants';

export default {
  name: 'AddEntry',
  components: {
    contentPage: ContentPage,
    selectPill: SelectPill,
    validateInput: ValidateInput,
    validateSelectSingle: ValidateSelectSingle,
  },
  data() {
    return {
      header: 'Add Entry',
      title: 'Fill in data for new entry',
      // Enums
      typeEnum: ENTRY_TYPE_ENUM,
      countryEnum: COUNTRY_ENUM,
      // Form label
      companyLabel: COMPANY_LABEL,
      countryLabel: COUNTRY_LABEL,
      // Form data model
      type: null,
      companyName: null,
      country: null,
    };
  },
  methods: {
    setType(type) {
      this.type = type;
    },
    updateFormData(label, value) {
      switch (label) {
        case COMPANY_LABEL:
          this.companyName = value;
          break;
        case COUNTRY_LABEL:
          this.country = value;
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
            console.log('validateForm type', this.type);
            console.log('validateForm country', this.country);
            console.log('validateForm companyName', this.companyName);
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
