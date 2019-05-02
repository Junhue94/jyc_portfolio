<template>
  <content-page :header="header" :title="title">
    <template slot="content">
      <div class="container">
        <div class="filter-container">
          <select-dropdown
            :label="filterTypeHeader"
            :options="filterTypeOptions"
            :onChange="handleTypeChange"
          />
          <select-dropdown
            :label="filterCountryHeader"
            :options="filterCountryOptions"
            :onChange="handleCountryChange"
          />
          <select-dropdown
            :label="filterSectorHeader"
            :options="filterSectorOptions"
            :onChange="handleSectorChange"
          />
        </div>
        <div class="table-container">
          <list-table
            :headerList="entryListHeaders"
            :dataList="entryList"
            :getList="getEntryList"
            :queryParams="entryListParams"
          />
        </div>
      </div>
    </template>
  </content-page>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import ContentPage from '../common/ContentPage';
import ListTable from '../common/ListTable';
import SelectDropdown from '../common/SelectDropdown';
import { logError } from '../../utils/logger';
import { toastServerError } from '../../utils/toaster';
import {
  ENTRY_TYPE_LABEL,
  ENTRY_TYPE_ENUM,
  COUNTRY_LABEL,
  COUNTRY_ENUM,
  SECTOR_LABEL,
  ENTRY_SECTOR_ENUM,
} from '../../utils/constants';

export default {
  name: 'EntryList',
  components: {
    contentPage: ContentPage,
    listTable: ListTable,
    selectDropdown: SelectDropdown,
  },
  data() {
    return {
      filterTypeHeader: ENTRY_TYPE_LABEL,
      filterTypeOptions: ENTRY_TYPE_ENUM,
      filterCountryHeader: COUNTRY_LABEL,
      filterCountryOptions: COUNTRY_ENUM,
      filterSectorHeader: SECTOR_LABEL,
      filterSectorOptions: ENTRY_SECTOR_ENUM,
      header: 'Entry List',
      title: 'Entry List with Filters',
      entryListHeaders: [
        {
          field: 'type',
          name: 'Type',
        },
        {
          field: 'name',
          name: 'Stock',
        },
        {
          field: 'country',
          name: 'Country',
        },
        {
          field: 'sector',
          name: 'Sector',
        },
        {
          field: 'date',
          name: 'Date',
          filter: 'fullDate',
        },
        {
          field: 'currency',
          name: 'Currency',
        },
        {
          field: 'price',
          name: 'Price',
          filter: 'price',
        },
        {
          field: 'quantity',
          name: 'Qty',
          filter: 'number',
        },
        {
          field: 'dividend',
          name: 'Dividend',
          filter: 'number',
        },
        {
          field: 'totalCapital',
          name: 'Capital',
          filter: 'money',
        },
        {
          field: 'capitalReturn',
          name: 'Capital Return',
          filter: 'money',
        },
        {
          field: 'totalDividend',
          name: 'Dividend',
          filter: 'money',
        },
        {
          field: 'priceProfitTarget',
          name: 'Profit Target',
          filter: 'price',
        },
        {
          field: 'priceStopLoss',
          name: 'Stop Loss',
          filter: 'price',
        },
      ],
    };
  },
  methods: {
    ...mapActions('entryList', {
      getEntryListAction: 'getEntryList',
    }),
    getEntryList(options) {
      this.getEntryListAction(options)
        .catch((err) => {
          logError(err);
          toastServerError();
        });
    },
    handleTypeChange(value) {
      this.getEntryList({
        ...this.entryListParams,
        filter: {
          type: value,
        },
      });
    },
    handleCountryChange(value) {
      this.getEntryList({
        ...this.entryListParams,
        filter: {
          country: value,
        },
      });
    },
    handleSectorChange(value) {
      this.getEntryList({
        ...this.entryListParams,
        filter: {
          sector: value,
        },
      });
    },
  },
  computed: {
    ...mapGetters('entryList', {
      entryListGetter: 'entryList',
      entryListParamsGetter: 'entryListParams',
    }),
    entryList() {
      return this.entryListGetter;
    },
    entryListParams() {
      return this.entryListParamsGetter;
    },
  },
  created() {
    const { offset, currentPage } = this.entryListParams;
    this.getEntryList({ offset, currentPage });
  },
};
</script>

<style scoped lang="scss">
  @import "../../styles/theme";
  .container {
    padding: 0;
  }

  .filter-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    border-bottom: 2px solid $background-light-gray;;
  }

  .table-container {
    padding: 20px;
  }
</style>
