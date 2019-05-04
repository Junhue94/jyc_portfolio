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
            <validate-select-single
              :label="currencyLabel"
              :options="currencyEnum"
              :validationRules="'required'"
              :onChange="updateFormData"
            />
            <validate-select-single
              :label="sectorLabel"
              :options="sectorEnum"
              :validationRules="'required'"
              :onChange="updateFormData"
            />
            <hr />
            <validate-input
              :inputType="'number'"
              :label="priceLabel"
              :validationRules="'required'"
              :onChange="updateFormData"
            />
            <validate-input
              :inputType="'number'"
              :label="quantityLabel"
              :validationRules="'required'"
              :onChange="updateFormData"
            />
            <validate-input
              :inputType="'number'"
              :label="profitTargetLabel"
              :onChange="updateFormData"
            />
            <validate-input
              :inputType="'number'"
              :label="stopLossLabel"
              :onChange="updateFormData"
            />
            <hr />
            <div class="actions-container">
              <custom-button
                class="green-fill"
                type="submit"
                text="Create"
              />
            </div>
          </form>
        </div>
      </div>
    </template>
  </content-page>
</template>

<script>
import ContentPage from '../common/ContentPage';
import CustomButton from '../common/CustomButton';
import SelectPill from '../common/SelectPill';
import ValidateInput from '../common/ValidateInput';
import ValidateSelectSingle from '../common/ValidateSelectSingle';
import {
  COUNTRY_ENUM,
  COUNTRY_LABEL,
  COMPANY_LABEL,
  ENTRY_TYPE_ENUM,
  CURRENCY_LABEL,
  CURRENCY_ENUM,
  SECTOR_LABEL,
  SECTOR_ENUM,
  PRICE_LABEL,
  QUANTITY_LABEL,
  PROFIT_TARGET_LABEL,
  STOP_LOSS_LABEL,
} from '../../utils/constants';

export default {
  name: 'AddEntry',
  components: {
    customButton: CustomButton,
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
      currencyEnum: CURRENCY_ENUM,
      sectorEnum: SECTOR_ENUM,
      // Form label
      companyLabel: COMPANY_LABEL,
      countryLabel: COUNTRY_LABEL,
      currencyLabel: CURRENCY_LABEL,
      sectorLabel: SECTOR_LABEL,
      priceLabel: PRICE_LABEL,
      quantityLabel: QUANTITY_LABEL,
      profitTargetLabel: PROFIT_TARGET_LABEL,
      stopLossLabel: STOP_LOSS_LABEL,
      // Form data model
      type: null,
      companyName: null,
      country: null,
      currency: null,
      sector: null,
      price: null,
      quantity: null,
      profitTarget: null,
      stopLoss: null,
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
        case CURRENCY_LABEL:
          this.currency = value;
          break;
        case SECTOR_ENUM:
          this.sector = value;
          break;
        case PRICE_LABEL:
          this.price = value;
          break;
        case QUANTITY_LABEL:
          this.quantity = value;
          break;
        case PROFIT_TARGET_LABEL:
          this.profitTarget = value;
          break;
        case STOP_LOSS_LABEL:
          this.stopLoss = value;
          break;
        default:
          break;
      }
    },
    validateForm() {
      // @TODO $validator.validateAll() does not validate input
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

  hr {
    padding-bottom: 10px;
  }

  .actions-container {
    display: flex;
    justify-content: flex-end;
  }
</style>
