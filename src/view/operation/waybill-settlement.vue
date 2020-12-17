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
        :columns="table.columns"
      >
        <table-page slot="footer" v-model="table" @change="table.onList"></table-page>
      </i-table>
    </div>
  </div>
</template>
 
<script>
import table from '@/mixin/table';
import { waybillTableConfig } from '@/const/operation';
import { getlistReport } from '@/api/operation/report';
export default {
  name: 'freight-table',
  mixins: [table],
  data() {
    return {
      isSearch: false,
      table: this.tableInit(waybillTableConfig),
      buttons: [
        { label: '条件查询', icon: 'md-search', fn: this.showSearch },
        { label: '刷新', icon: 'md-sync', fn: this.getList }
      ]
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    // 获取列表数据
    add() {
      this.$emit('state', 'add');
    },
    view(row) {
      this.$emit('state', 'view', row);
    },
    showSearch() {
      this.isSearch = true;
    },
    getList() {
      let table = this.table;
      table.loading = true;
      let params = table.onParams();
      params.outTimeStart = params.outTime[0];
      params.outTimeEnd = params.outTime[1];
      getlistReport(params).then(res => {
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