<template>
  <div class="base-table-container vehicle-tables wh100">
    <!-- 导出 -->
    <export-excel
      v-model="isExprot"
      :columns="table.columns"
      :name="active.title"
      :export="getList"
    ></export-excel>
    <table-search
      v-model="isSearch"
      :search="table.search"
      :columns="table.searchColumns"
      @search="getList"
    ></table-search>
    <!-- 按钮操作面板 -->
    <div class="buttons-panel">
      <i-button
        v-for="item in buttons"
        :key="item.label"
        size="small"
        type="primary"
        shape="circle"
        :icon="item.icon"
        @click="item.fn"
      >{{ item.label }}</i-button>
    </div>
    <div class="table-box">
      <i-table
        border
        :height="table.height"
        :loading="table.loading"
        :data="table.data"
        :columns="table.columns"
        @on-sort-change="table.onSort"
      >
        <template slot="type" slot-scope="{ row }">
          <img v-if="row.zhuangtai == '合格'" src="~A/operation/hege.png" class="type" />
          <img v-else src="~A/operation/buhege.png" class="type" />
        </template>
        <template slot="operation" slot-scope="{ row }">
          <img class="pointer" src="~A/icon/view.png" @click="view(row)" />
        </template>
        <table-page slot="footer" v-model="table" @change="table.onList"></table-page>
      </i-table>
    </div>
  </div>
</template>
<script>
import dayjs from 'dayjs';
import table from '@/mixin/table';
import { zaiyunTableConfig } from '@/const/operation';
import { getListJianKong } from '@/api/operation/home';
export default {
  name: 'vehicle-table',
  mixins: [table],
  props: {
    // 当前激活的预警类型
    active: {
      type: Object
    },
    date: {
      type: Number
    }
  },
  data() {
    zaiyunTableConfig.onList = this.getList;
    return {
      table: this.tableInit(zaiyunTableConfig),
      isExprot: false, //导出
      isSearch: false,
      buttons: [
        { label: '条件查询', icon: 'md-search', fn: this.showSearch },
        { label: '导出', icon: 'md-cloud-download', fn: this.showExprot }
      ]
    };
  },
  watch: {
    date() {
      this.getList();
    }
  },
  mounted() {
    this.getList();
  },
  methods: {
    // 获取列表数据
    async getList(params = {}) {
      const table = this.table;
      table.loading = true;
      let query = {
        ...table.onParams(),
        ...params,
        month: this.date,
        year: dayjs().format('YYYY')
      };
      let res = await getListJianKong(query);
      let data = res.data.data;
      table.onFill(data);
      return data;
    },
    // 显示下载
    showExprot() {
      this.isExprot = true;
    },
    showSearch() {
      this.isSearch = true;
    },
    view() {}
  }
};
</script>
