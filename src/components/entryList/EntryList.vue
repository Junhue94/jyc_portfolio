<template>
  <content-page :header="header" :title="title">
    <template slot="content">
      <list-table
        :headerList="stockListHeaders"
        :dataList="entryList"
        :findList="getEntryList"
        :queryParams="entryListParams"
      />
    </template>
  </content-page>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import ContentPage from '../common/ContentPage';
import ListTable from '../common/ListTable.vue';
import { logError } from '../../utils/logger';
import { toastServerError } from '../../utils/toaster';

export default {
  name: 'EntryList',
  components: {
    contentPage: ContentPage,
    listTable: ListTable,
  },
  data() {
    return {
      header: 'Entry List',
      title: 'Entry List with Filters',
      stockListHeaders: [
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

</style>
