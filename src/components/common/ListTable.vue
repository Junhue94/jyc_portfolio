<template>
  <div class="list-table">
    <div class="table-responsive">
      <table class="table table-bordered table-striped">
        <thead>
        <tr>
          <th
            class="header"
            v-for="header in headerList"
            @click="findList({ sortField: header.field, sortSeq: setSortSeq(header.field) })"
          >{{ header.name }}
          </th>
        </tr>
        </thead>
        <tbody>
        <tr
          class="data"
          v-for="data in dataList"
          @click="onDataListClick(data._id)"
        >
          <td
            v-for="header in headerList"
          >{{ dataFilter(header.filter, data[header.field]) }}
          </td>
        </tr>
        </tbody>
      </table>
    </div>

    <div class="table-paginate">
      <div class="offset">
        <span>Rows</span>
        <label>
          <select
            class="form-control"
            title="rowOffset"
            v-model="queryParams.offset"
          >
            <option value="50">50</option>
            <option value="100">100</option>
            <option value="200">200</option>
            <option value="0">All</option>
          </select>
        </label>
      </div>
      <div class="">
        <nav class="pull-right">
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
  </div>
</template>

<script>
import Vue from 'vue';
import _ from 'lodash';

export default {
  name: 'ListTable',
  props: [
    'headerList',
    'dataList',
    'onDataListClick',
    'findList',
    'queryParams',
  ],
  data() {
    return {
      sortField: null,
      sortSeq: null,
      isFirstPage: true,
      isLastPage: false,
      pageRange: [],
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
        this.findList({ offset: parseInt(newValue, 10), currentPage: 1 });
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

      // set page range
      if (totalPage <= 5) {
        this.pageRange = _.range(1, totalPage + 1);
      } else if (newPage + 2 >= totalPage) {
        const pages = (newPage - 2 <= totalPage - 4) ? newPage - 2 : totalPage - 4;
        this.pageRange = _.range(pages, totalPage + 1);
      } else if (newPage - 2 <= 1) {
        const pages = (newPage + 3 >= 6) ? newPage + 3 : 6;
        this.pageRange = _.range(1, pages);
      } else {
        this.pageRange = _.range(newPage - 2, newPage + 3);
      }

      if (newPage >= 1 && newPage <= totalPage && newPage !== currentPage) {
        this.findList({ offset, currentPage: newPage });
      }
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

  .table-paginate {
    display: flex;
    justify-content: space-between;
    margin-top: 30px;

    .offset {
      span {
        margin-right: 10px;
      }
    }

    nav {
      ul.pagination {
        li {
          cursor: pointer;
        }
      }
    }
  }
</style>
