<template>
  <div class="fuel-subsidies">
    <!-- 导出 -->
    <export-excel
      v-model="isExprot"
      :columns="table.columns"
      name="燃油补贴"
      :export="getList"
    ></export-excel>

    <!-- 报警搜索参数 -->
    <i-drawer
      v-model="isSearch"
      title="查询条件"
      :width="400"
      class="custom-drawer"
    >
      <div class="drawer-body">
        <base-form v-model="table.search" :column="table.searchColumns">
          <i-dropdown slot="jigouName" class="w100" trigger="click">
            <i-input :value="table.search.jigouName"></i-input>
            <i-dropdown-menu slot="list">
              <i-tree :data="treeData" :render="treeRender"></i-tree>
            </i-dropdown-menu>
          </i-dropdown>
        </base-form>
      </div>
      <div class="drawer-footer">
        <i-button @click="isSearch = false">取消</i-button>
        <i-button type="primary" @click="getFuelList">查询</i-button>
      </div>
    </i-drawer>
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
        >{{ item.label }}</i-button
      >
    </div>

    <!-- table -->
    <div class="table-box">
      <i-table
        border
        :height="table.height"
        :loading="loading"
        :data="table.data"
        :columns="table.columns"
        @on-sort-change="table.onSort"
      >
        <table-page
          slot="footer"
          v-model="table"
          @change="table.onList"
        ></table-page>
      </i-table>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
import { fuelTableConfig } from "@/const/fuel-subsidies";
import { getFuelSubsidies } from "@/api/daily/fuel";
import { getDeptSubTree } from "@/api/system";
import table from "@/mixin/table";
import baseForm from "C/base-form";
export default {
  name: "fuelSubsidies",
  components: {
    baseForm,
  },
  mixins: [table],
  data() {
    return {
      table: this.tableInit(fuelTableConfig),
      isSearch: false,
      isExprot: false,
      loading: false,
      buttons: [
        { label: "条件查询", icon: "md-search", fn: this.showSearch },
        { label: "导出", icon: "md-cloud-download", fn: this.showExprot },
        { label: "燃油补贴详情", icon: "md-create", fn: this.goDetail },
        { label: "刷新", icon: "md-sync", fn: this.getFuelList },
      ],
      // 多选，企业树，搜索，当前行，
      selection: [],
      treeData: [],
      row: {},
      listData: [],
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    // 获取列表数据
    getList(params = {}) {
      const table = this.table;
      const search = table.search;
      this.loading = true;
      let query = {
        ...params,
        deptName: this.$store.getters.deptName,
        beginTime: dayjs(search.date[0]).format("YYYY-MM-DD"),
        endTime: dayjs(search.date[1]).format("YYYY-MM-DD"),
        ...table.onParams(),
      };
      getFuelSubsidies(query).then((res) => {
        this.listData = res.data.data;
        table.onFill(this.listData);
        this.loading = false;
      });
      return this.listData;
    },
    // 回填到列表
    async getFuelList() {
      const table = this.table;
      table.loading = true;
      this.isDetail = false;
      let data = this.getList();
      table.onFill(data);
    },
    // 获取企业机构树
    getTreeData() {
      getDeptSubTree(this.$store.getters.deptId).then((res) => {
        this.treeData = res.data.data;
      });
    },
    treeRender(h, { data }) {
      let clickEvent = () => {
        this.table.search.jigouName = data.deptName;
      };
      let className = [
        "ivu-tree-title",
        {
          "ivu-tree-title-selected":
            data.deptName == this.table.search.jigouName,
        },
      ];
      return (
        <span class={className} onClick={clickEvent}>
          {data.deptName}
        </span>
      );
    },
    // 显示搜素
    showSearch() {
      this.isSearch = true;
      if (this.treeData.length == 0) {
        this.getTreeData();
      }
    },
    goDetail() {
      this.$router.replace({
        path: "/daily/fuel-detail",
      });
    },
    // 显示下载
    showExprot() {
      this.isExprot = true;
    },
  },
};
</script>

<style lang="scss">
.ivu-btn-primary {
  margin: 0 10px;
}
.ivu-table th {
  background-color: #d5ebff;
}
.fuel-subsidies {
  width: 100%;
  height: 100%;
  .buttons-panel {
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    background: #fff;
  }
  .table-box {
    height: calc(100% - 40px);
    width: 100%;
  }
}
</style>
