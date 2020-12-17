<template>
  <div class="white-bg base-table-container wh100">
    <!-- 报警搜索参数 -->
    <table-search
      v-model="isSearch"
      :search="table.search"
      :columns="table.searchColumns"
      @search="getList"
    ></table-search>

    <div class="buttons-panel">
      <i-button
        v-for="item in buttons"
        :key="item.label"
        :disabled="item.disabled"
        size="small"
        type="primary"
        shape="circle"
        :icon="item.icon"
        @click="item.fn"
      >{{item.label}}</i-button>
    </div>
    <div class="table-box">
      <i-table
        border
        :height="table.height"
        :loading="table.loading"
        :data="table.data"
        :columns="tableColumns"
      >
        <template slot="operation" slot-scope="{row}">
          <img src="~A/icon/view.png" @click="view(row)" />
        </template>
        <table-page slot="footer" v-model="table" @change="table.onList"></table-page>
      </i-table>
    </div>
  </div>
</template>
 
<script>
import table from '@/mixin/table';
import { expendTableConfig } from '@/const/operation';
import { getlistZhiChu } from '@/api/operation/report';
export default {
  name: 'expend-stat',
  mixins: [table],
  data() {
    return {
      level: 1,
      isSearch: false,
      table: this.tableInit(expendTableConfig)
    };
  },
  computed: {
    buttons() {
      return [
        { label: '条件查询', icon: 'md-search', fn: this.showSearch },
        { label: '刷新', icon: 'md-sync', fn: this.getList },
        {
          label: '返回',
          icon: 'md-arrow-back',
          fn: this.back,
          disabled: this.level == 1
        }
      ];
    },
    tableColumns() {
      return this.table.columns.filter(v => {
        return v.level == undefined ? true : v.level == this.level;
      });
    }
  },
  mounted() {
    this.getList();
  },
  methods: {
    back() {
      this.level = 1;
      this.table.search.cheliangpaizhao = '';
      this.getList();
    },
    view(row) {
      this.level = 2;
      this.table.search.cheliangpaizhao = row.chepaihao;
      this.getList();
    },
    showSearch() {
      this.isSearch = true;
    },
    getList() {
      let table = this.table;
      table.loading = true;
      let params = {
        type: this.level == 2 ? '1' : '',
        ...table.onParams()
      };
      params.outTimeStart = params.outTime[0];
      params.outTimeEnd = params.outTime[1];
      getlistZhiChu(params).then(res => {
        table.onFill(res.data.data);
      });
    }
  }
};
</script>
 
<style lang="scss" >
.freight-table {
  .ivu-table-cell {
    img {
      cursor: pointer;
    }
  }
}
</style>