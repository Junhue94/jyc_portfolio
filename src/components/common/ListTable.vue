<template>
  <div class="list-table">
    <div class="table-responsive">
      <table class="table table-bordered table-striped">
        <thead>
        <tr>
          <th
            class="header"
            v-for="header in headerList"
            @click="getList({ sortField: header.field, sortSeq: setSortSeq(header.field) })"
          >{{ header.name }}
          </th>
        </tr>
        </thead>
        <tbody>
        <tr
          class="data"
          v-for="data in dataList"
          @click="onDataListClick(data.id)"
        >
          <td
            v-for="header in headerList"
          >{{ dataFilter(header.filter, data[header.field]) }}
          </td>
        </tr>
        </tbody>
      </table>
    </div>

    <div class="entry-count">
      Showing {{ currentEntryFirstIndex }}
      to {{ currentEntryLastIndex }}
      of {{ queryParams.totalRows }} entries
    </div>

    <div class="table-paginate">
      <div class="offset">
        <select-dropdown
          :label="rowPerPageLabel"
          :options="rowPerPageOptions"
          :onChange="handleOffsetChange"
        />
      </div>
      <nav>
        <ul class="pagination">
          <li
            class="page-item"
            :class="{ active: isFirstPage }"
            @click="changePage(1)"
          >
            <a class="page-link">
              <span>&laquo;</span>
            </a>
          </li>
          <li
            class="page-item"
            :class="{ disabled: isFirstPage }"
            @click="changePage('previous')"
          >
            <a class="page-link">
              <span>&nbsp;&lsaquo;</span>
            </a>
          </li>
          <li
            class="page-item"
            v-for="page in pageRange"
            :class="{ active: page === queryParams.currentPage }"
            @click="changePage(page)"
          >
            <a class="page-link">{{ page }}</a>
          </li>
          <li
            class="page-item"
            :class="{ disabled: isLastPage }"
            @click="changePage('next')"
          >
            <a class="page-link">
              <span>&rsaquo;&nbsp;</span>
            </a>
          </li>
          <li
            class="page-item"
            :class="{ active: isLastPage }"
            @click="changePage(queryParams.totalPage)"
          >
            <a class="page-link">
              <span>&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import range from 'lodash/range';
import SelectDropdown from './SelectDropdown';
import {
  ROW_PER_PAGE_LABEL,
  ROW_PER_PAGE_OPTIONS,
} from '../../utils/constants';

export default {
  name: 'ListTable',
  props: {
    headerList: {
      type: Array,
      required: true,
    },
    dataList: {
      type: Array,
      required: true,
    },
    onDataListClick: {
      type: Function,
      default() {
        return null;
      },
    },
    getList: {
      type: Function,
      default() {
        return null;
      },
    },
    queryParams: Object,
  },
  components: {
    selectDropdown: SelectDropdown,
  },
  data() {
    return {
      sortField: null,
      sortSeq: null,
      isFirstPage: true,
      isLastPage: false,
      pageRange: [],
      rowPerPageLabel: ROW_PER_PAGE_LABEL,
      rowPerPageOptions: ROW_PER_PAGE_OPTIONS,
    };
  },
  watch: {
    // initialize pagination after fetch query params from API
    'queryParams.totalPage'() {
      this.changePage(1);
    },
    // watch page offset to fetch data from API
    'queryParams.offset'(newValue, oldValue) {
      if (parseInt(newValue, 10) !== parseInt(oldValue, 10)) {
        // set to first page when offset changes
        this.getList({ offset: parseInt(newValue, 10), currentPage: 1 });
      }
    },
    // watch current page to disable pagination buttons
    'queryParams.currentPage'(newValue) {
      const { totalPage } = this.queryParams;
      if (parseInt(newValue, 10) === 1) {
        this.isFirstPage = true;
      } else if (this.isFirstPage) {
        this.isFirstPage = false;
      }

      if (parseInt(newValue, 10) === totalPage) {
        this.isLastPage = true;
      } else if (this.isLastPage) {
        this.isLastPage = false;
      }
    },
  },
  methods: {
    dataFilter(filter, value) {
      if (filter) {
        return Vue.filter(filter)(value);
      }
      return value;
    },
    handleOffsetChange(value) {
      this.getList({
        ...this.queryParams,
        offset: value,
      });
    },
    setSortSeq(sortField) {
      if (this.sortField === sortField) {
        switch (this.sortSeq) {
          case 'asc':
            this.sortSeq = 'desc';
            break;
          case 'desc':
            this.sortSeq = 'asc';
            break;
          default:
            this.sortSeq = 'asc';
        }
      } else {
        this.sortField = sortField;
        this.sortSeq = 'asc';
      }
      return this.sortSeq;
    },
    setNewPage(page) {
      const { currentPage } = this.queryParams;

      // set page number
      if (page === 'previous') {
        return currentPage - 1;
      }
      if (page === 'next') {
        return currentPage + 1;
      }
      return page;
    },
    changePage(page) {
      const { offset, currentPage, totalPage } = this.queryParams;
      const newPage = this.setNewPage(page);

      // Set page range
      if (totalPage <= 5) {
        this.pageRange = range(1, totalPage + 1);
      } else if (newPage + 2 >= totalPage) {
        const pages = (newPage - 2 <= totalPage - 4) ? newPage - 2 : totalPage - 4;
        this.pageRange = range(pages, totalPage + 1);
      } else if (newPage - 2 <= 1) {
        const pages = (newPage + 3 >= 6) ? newPage + 3 : 6;
        this.pageRange = range(1, pages);
      } else {
        this.pageRange = range(newPage - 2, newPage + 3);
      }

      if (newPage >= 1 && newPage <= totalPage && newPage !== currentPage) {
        this.getList({ offset, currentPage: newPage });
      }
    },
  },
  computed: {
    currentEntryFirstIndex() {
      const { currentPage, offset } = this.queryParams;
      return (currentPage - 1) * offset + 1;
    },
    currentEntryLastIndex() {
      const { currentPage, offset } = this.queryParams;
      return currentPage * offset;
    },
  },
  created() {
    this.changePage(1);
  },
};
</script>

<style scoped lang="scss">
  @import "../../styles/theme";
  table.table.table-bordered {
    margin: 0;

    thead {
      tr {
        th {
          text-align: center;
          vertical-align: middle;
          font-size: $body2-font-size;
          cursor: pointer;
        }
      }
    }

    tbody {
      tr {
        cursor: pointer;

        td {
          text-align: center;
          vertical-align: middle;
          font-size: $body2-font-size;
        }
      }
    }
  }

  .entry-count {
    margin-top: 30px;
    color: $dark-gray-default;
    font-size: $body1-font-size;
  }

  .table-paginate {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 30px;

    .offset {
      span {
        margin-right: 10px;
      }
    }

    nav {
      ul.pagination {
        margin: 0;

        li {
          cursor: pointer;
        }
      }
    }
  }
</style>
