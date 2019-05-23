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
import { mapActions, mapState } from 'vuex';
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
  SECTOR_ENUM,
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
      header: 'Entry List',
      title: 'Entry List with Filters',
      filterTypeHeader: ENTRY_TYPE_LABEL,
      filterTypeOptions: Object.keys(ENTRY_TYPE_ENUM),
      filterCountryHeader: COUNTRY_LABEL,
      filterCountryOptions: Object.keys(COUNTRY_ENUM),
      filterSectorHeader: SECTOR_LABEL,
      filterSectorOptions: Object.keys(SECTOR_ENUM),
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
      this.getEntryListAction({
        ...this.entryListParams,
        filter: {
          type: value,
        },
      });
    },
    handleCountryChange(value) {
      this.getEntryListAction({
        ...this.entryListParams,
        filter: {
          country: value,
        },
      });
    },
    handleSectorChange(value) {
      this.getEntryListAction({
        ...this.entryListParams,
        filter: {
          sector: value,
        },
      });
    },
  },
  computed: {
    ...mapState('entryList', {
      entryListState: 'entryList',
      entryListParamsState: 'entryListParams',
    }),
    entryList() {
      return this.entryListState;
    },
    entryListParams() {
      return this.entryListParamsState;
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
    border-bottom: 2px solid $background-light-gray;
  }

  .table-container {
    padding: 20px;
  }
</style>
