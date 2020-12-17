<template>
  <div class="sub-tables wh100">
    <div class="tabs">
      <span>附表类型：</span>
      <i-select v-model="tabIndex">
        <i-option v-for="(item,index) in subTabs" :key="item.label" :value="index">{{ item.label }}</i-option>
      </i-select>
    </div>
    <div class="tables-list">
      <i-table
        border
        :loading="table.loading"
        :height="table.height"
        :columns="active.column"
        :data="table.data"
        @on-sort-change="table.onSort"
      >
        <!-- slot-scope="{ row,index } -->
        <template slot="index" slot-scope="{ index }">
          <strong>{{table.size * (table.page-1) + index+1 }}</strong>
        </template>
        <table-page slot="footer" v-model="table" @change="table.onList"></table-page>
      </i-table>
    </div>
  </div>
</template>
 
<script>
import { subTabs, subTable } from "@/const/security-report";
// import { getList } from "@/api/daily/report";
import table from "@/mixin/table";
export default {
  name: "sub-tables",
  mixins: [table],
  props: {
    // 是否显示
    show: {
      type: Boolean,
      default: false,
    },
    row: {
      type: Object,
      default: () => new Object(),
    },
  },
  data() {
    subTable.onList = this.getList;
    return {
      table: this.tableInit(subTable),
      subTabs,
      tabIndex: 0,
    };
  },

  computed: {
    // 当前附表
    active() {
      return this.subTabs[this.tabIndex];
    },
  },
  watch: {
    // 如果显示，调用表格自适应，
    // 如果未加载，获取列表数据
    show() {
      if (!this.show) return;
      this.table.onResize();
      if (!this.load) {
        this.getList();
        this.load = true;
      }
    },
    // 操作项发生变化
    row() {
      this.load = false;
    },
    tabIndex() {
      this.table.page = 1;
      this.getList();
    },
  },
  methods: {
    // 获取列表数据
    getList() {
      if (!this.active.action) return;
      let table = this.table;
      table.loading = true;
      let params = {
        company: this.row.deptName,
        date: this.row.countdate,
        ...table.onParams(),
      };
      this.active.action(params).then((res) => {
        table.onFill(res.data.data);
      });
    },
  },
};
</script>
 
<style lang="scss" >
</style>