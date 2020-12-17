<template>
  <div class="base-table-container">
    <!-- 搜索 -->
    <table-search
      v-model="isSearch"
      :search="table.search"
      :columns="searchColumns"
      :title="active.text + '查询条件'"
      @search="getStatiList"
    ></table-search>

    <!-- 导出 -->
    <export-excel v-model="isExprot" :columns="tableColumns" :name="active.text" :export="getList"></export-excel>

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

    <!-- table -->
    <div class="table-box">
      <i-table
        border
        :height="table.height"
        :loading="table.loading"
        :data="table.data"
        :columns="tableColumns"
        @on-sort-change="table.onSort"
      >
        <template slot="chulizhuangtai" slot-scope="{ row }">
          <img v-if="row.chulizhuangtai == '已处理'" src="~A/daily/yichuli.png" alt />
          <img v-else src="~A/daily/weichuli.png" alt />
        </template>

        <template slot="operation" slot-scope="{ row }">
          <img src="~A/icon/gps.png" class="icon" @click="showDetail(row)" />
        </template>
        <table-page slot="footer" v-model="table" @change="table.onList"></table-page>
      </i-table>
    </div>
  </div>
</template>
 
<script>
import dayjs from 'dayjs';
import { statisTableConfig, statusOption } from '@/const/alarm';
import table from '@/mixin/table';

export default {
  name: 'statis-table',
  mixins: [table],
  props: {
    // 当前激活的预警类型
    active: {
      type: Object
    }
  },
  data() {
    return {
      table: this.tableInit(statisTableConfig),
      // 是否显示详情 处理
      isDetail: false,
      isDispose: false,
      isSearch: false,
      isExprot: false,
      row: {},
      // 按钮配置,处理时间限制
      buttons: [
        { label: '条件查询', icon: 'md-search', fn: this.showSearch },
        { label: '导出', icon: 'md-cloud-download', fn: this.showExprot },
        { label: '刷新', icon: 'md-sync', fn: this.getStatiList }
      ],
      dateLimit: dayjs()
        .subtract(1, 'month')
        .format('YYYY-MM-DD')
    };
  },
  computed: {
    // 动态显示列
    tableColumns() {
      let columns = this.table.columns;
      return columns.filter(item => {
        return item.display === undefined
          ? true
          : this.active.key == item.display || this.active.type == item.display;
      });
    },
    searchColumns() {
      let columns = this.table.searchColumns;
      return columns.filter(item => {
        return item.display === undefined
          ? true
          : this.active.type == item.display;
      });
    }
  },
  watch: {
    active() {
      let beginTime = '';
      let endTime = '';
      if (this.active.type == 'GPS') {
        beginTime = dayjs()
          .subtract(8, 'day')
          .format('YYYY-MM-DD');
        endTime = dayjs()
          .subtract(1, 'day')
          .format('YYYY-MM-DD');
      } else {
        beginTime = dayjs()
          .subtract(1, 'day')
          .format('YYYY-MM-DD');
        endTime = dayjs()
          .subtract(1, 'day')
          .format('YYYY-MM-DD');
      }
      this.table.search.date = this.date ? this.date : [beginTime, endTime];
      this.toggleAlarm(this.active);
    },
    date() {
      this.search.date = this.date;
    }
  },
  created() {},
  methods: {
    //  获取列表
    async getList(params = {}) {
      const table = this.table;
      const search = table.search;
      let res = await this.active.action({
        deptName: this.$store.getters.deptName,
        beginTime: dayjs(search.date[0]).format('YYYY-MM-DD'),
        endTime: dayjs(search.date[1]).format('YYYY-MM-DD'),
        ...table.onParams(),
        ...params
      });
      let data = res.data.data;
      this.$emit('listData', data);
      let statusMap = {};
      statusOption.forEach(item => (statusMap[item.value] = item.label));
      data.records.forEach(item => (item.status = statusMap[item.status]));
      return data;
    },
    // 回填列表
    async getStatiList() {
      const table = this.table;
      table.loading = true;
      let data = await this.getList();
      table.onFill(data);
    },
    // 切换报警
    toggleAlarm() {
      this.table.page = 1;
      this.getStatiList();
    },
    showSearch() {
      this.isSearch = true;
    },
    // 显示下载
    showExprot() {
      this.isExprot = true;
    }
  }
};
</script>
 
<style lang="scss"  >
</style>