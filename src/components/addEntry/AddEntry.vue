<template>
  <content-page :header="header" :title="title">
    <template slot="content">
      <div class="container">
        <div class="type-container">
          <select-pill
            :options="Object.keys(typeEnum)"
            :onChange="setType"
          />
        </div>
        <div class="form-container">
          <form @submit.prevent="validateForm">
            <div v-if="type === typeEnum.Buy">
              <div class="validate-input">
                <label>{{ companyLabel }}</label>
                <div class="input-container">
                  <input
                    :name="companyLabel"
                    :placeholder="companyLabel"
                    :key="`buy${companyLabel}`"
                    v-model="companyName"
                    v-validate="'required'"
                    type="text"
                    class="form-control"
                    autocomplete="off"
                  />
                  <span>{{ errors.first(companyLabel) }}</span>
                </div>
              </div>
              <div class="validate-select-single">
                <label>{{ countryLabel }}</label>
                <div class="input-container">
                  <select
                    :name="countryLabel"
                    :title="countryLabel"
                    v-model="country"
                    v-validate="'required'"
                    class="form-control"
                  >
                    <option
                      value=""
                      disabled
                      selected
                    >Select a {{ countryLabel }}</option>
                    <option
                      v-for="(value, key) in countryEnum"
                      :value="value"
                    >{{ key }}</option>
                  </select>
                  <span>{{ errors.first(countryLabel) }}</span>
                </div>
              </div>
              <div class="validate-select-single">
                <label>{{ currencyLabel }}</label>
                <div class="input-container">
                  <select
                    :name="currencyLabel"
                    :title="currencyLabel"
                    v-model="currency"
                    v-validate="'required'"
                    class="form-control"
                  >
                    <option
                      value=""
                      disabled
                      selected
                    >Select a {{ currencyLabel }}</option>
                    <option
                      v-for="(value, key) in currencyEnum"
                      :value="value"
                    >{{ key }}</option>
                  </select>
                  <span>{{ errors.first(currencyLabel) }}</span>
                </div>
              </div>
              <div class="validate-select-single">
                <label>{{ sectorLabel }}</label>
                <div class="input-container">
                  <select
                    :name="sectorLabel"
                    :title="sectorLabel"
                    v-model="sector"
                    v-validate="'required'"
                    class="form-control"
                  >
                    <option
                      value=""
                      disabled
                      selected
                    >Select a {{ sectorLabel }}</option>
                    <option
                      v-for="(value, key) in sectorEnum"
                      :value="value"
                    >{{ key }}</option>
                  </select>
                  <span>{{ errors.first(sectorLabel) }}</span>
                </div>
              </div>
              <hr />
              <div class="validate-input">
                <label>Entry {{ dateLabel }}</label>
                <div class="input-container">
                  <input
                    :name="dateLabel"
                    :placeholder="dateFormatLabel"
                    :key="`buy${dateLabel}`"
                    v-model="date"
                    v-validate="'required'"
                    type="text"
                    class="form-control"
                    autocomplete="off"
                  />
                  <span>{{ errors.first(dateLabel) }}</span>
                </div>
              </div>
              <div class="validate-input">
                <label>Entry {{ priceLabel }}</label>
                <div class="input-container">
                  <input
                    :name="priceLabel"
                    :placeholder="priceLabel"
                    :key="`buy${priceLabel}`"
                    v-model="price"
                    v-validate="'required'"
                    type="number"
                    class="form-control"
                    autocomplete="off"
                  />
                  <span>{{ errors.first(priceLabel) }}</span>
                </div>
              </div>
              <div class="validate-input">
                <label>Entry {{ quantityLabel }}</label>
                <div class="input-container">
                  <input
                    :name="quantityLabel"
                    :placeholder="quantityLabel"
                    :key="`buy${quantityLabel}`"
                    v-model="quantity"
                    v-validate="'required'"
                    type="number"
                    class="form-control"
                    autocomplete="off"
                  />
                  <span>{{ errors.first(quantityLabel) }}</span>
                </div>
              </div>
              <div class="validate-input">
                <label>{{ profitTargetLabel }}</label>
                <div class="input-container">
                  <input
                    :name="profitTargetLabel"
                    :placeholder="profitTargetLabel"
                    :key="`buy${profitTargetLabel}`"
                    v-model="profitTarget"
                    type="number"
                    class="form-control"
                    autocomplete="off"
                  />
                  <span>{{ errors.first(profitTargetLabel) }}</span>
                </div>
              </div>
              <div class="validate-input">
                <label>{{ stopLossLabel }}</label>
                <div class="input-container">
                  <input
                    :name="stopLossLabel"
                    :placeholder="stopLossLabel"
                    :key="`buy${stopLossLabel}`"
                    v-model="stopLoss"
                    type="number"
                    class="form-control"
                    autocomplete="off"
                  />
                  <span>{{ errors.first(stopLossLabel) }}</span>
                </div>
              </div>
            </div>
            <div v-else-if="type === typeEnum.Sell">
              <div class="validate-input">
                <label>{{ companyLabel }}</label>
                <div class="input-container">
                  <input
                    :name="companyLabel"
                    :placeholder="companyLabel"
                    :key="`sell${companyLabel}`"
                    v-model="companyName"
                    v-validate="'required'"
                    type="text"
                    class="form-control"
                    autocomplete="off"
                  />
                  <span>{{ errors.first(companyLabel) }}</span>
                </div>
              </div>
              <div class="validate-input">
                <label>Exit {{ dateLabel }}</label>
                <div class="input-container">
                  <input
                    :name="dateLabel"
                    :placeholder="dateFormatLabel"
                    :key="`sell${dateLabel}`"
                    v-model="date"
                    v-validate="'required'"
                    type="text"
                    class="form-control"
                    autocomplete="off"
                  />
                  <span>{{ errors.first(dateLabel) }}</span>
                </div>
              </div>
              <div class="validate-input">
                <label>Exit {{ priceLabel }}</label>
                <div class="input-container">
                  <input
                    :name="priceLabel"
                    :placeholder="priceLabel"
                    :key="`sell${priceLabel}`"
                    v-model="price"
                    v-validate="'required'"
                    type="number"
                    class="form-control"
                    autocomplete="off"
                  />
                  <span>{{ errors.first(priceLabel) }}</span>
                </div>
              </div>
              <div class="validate-input">
                <label>Exit {{ quantityLabel }}</label>
                <div class="input-container">
                  <input
                    :name="quantityLabel"
                    :placeholder="quantityLabel"
                    :key="`sell${quantityLabel}`"
                    v-model="quantity"
                    v-validate="'required'"
                    type="number"
                    class="form-control"
                    autocomplete="off"
                  />
                  <span>{{ errors.first(quantityLabel) }}</span>
                </div>
              </div>
              <div class="validate-input">
                <label>{{ quantityLabel }} On Hand</label>
                <div class="input-container">
                  <input
                    class="form-control"
                    disabled
                  />
                </div>
              </div>
            </div>
            <div v-else>
              <div class="validate-input">
                <label>{{ companyLabel }}</label>
                <div class="input-container">
                  <input
                    :name="companyLabel"
                    :placeholder="companyLabel"
                    :key="`dividend${companyLabel}`"
                    v-model="companyName"
                    v-validate="'required'"
                    type="text"
                    class="form-control"
                    autocomplete="off"
                  />
                  <span>{{ errors.first(companyLabel) }}</span>
                </div>
              </div>
              <div class="validate-input">
                <label>Payment {{ dateLabel }}</label>
                <div class="input-container">
                  <input
                    :name="dateLabel"
                    :placeholder="dateFormatLabel"
                    :key="`dividend${dateLabel}`"
                    v-model="date"
                    v-validate="'required'"
                    type="text"
                    class="form-control"
                    autocomplete="off"
                  />
                  <span>{{ errors.first(dateLabel) }}</span>
                </div>
              </div>
              <div class="validate-input">
                <label>{{ dividendLabel }}</label>
                <div class="input-container">
                  <input
                    :name="dividendLabel"
                    :placeholder="dividendLabel"
                    :key="`dividend${dividendLabel}`"
                    v-model="dividend"
                    v-validate="'required'"
                    type="number"
                    class="form-control"
                    autocomplete="off"
                  />
                  <span>{{ errors.first(dividendLabel) }}</span>
                </div>
              </div>
            </div>
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
  DATE_LABEL,
  DATE_FORMAT_LABEL,
  DIVIDEND_LABEL,
} from '../../utils/constants';

export default {
  name: 'AddEntry',
  components: {
    customButton: CustomButton,
    contentPage: ContentPage,
    selectPill: SelectPill,
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
      dateLabel: DATE_LABEL,
      dateFormatLabel: DATE_FORMAT_LABEL,
      priceLabel: PRICE_LABEL,
      quantityLabel: QUANTITY_LABEL,
      profitTargetLabel: PROFIT_TARGET_LABEL,
      stopLossLabel: STOP_LOSS_LABEL,
      dividendLabel: DIVIDEND_LABEL,
      // Form data model
      type: null,
      companyName: null,
      country: null,
      currency: null,
      sector: null,
      date: null,
      price: null,
      quantity: null,
      profitTarget: null,
      stopLoss: null,
      dividend: null,
    };
  },
  methods: {
    setType(type) {
      this.type = type;
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
            console.log('validateForm date', this.date);
          }
        });
    },
  },
};
</script>

<style scoped lang="scss">
  @import "../../styles/theme";
  @import "../../styles/form";

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
