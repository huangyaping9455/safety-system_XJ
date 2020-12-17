<template>
  <div class="base-table-container">
    <!-- 报警处理 -->
    <alarm-dispose
      v-model="isDispose"
      :selection="selection"
      :active="active"
      @dispose="getAlarmList"
    ></alarm-dispose>

    <!-- 报警申诉 -->
    <alarm-appeal
      v-model="isAppeal"
      :selection="selection"
      :active="active"
      @appeal="getAlarmList"
    ></alarm-appeal>

    <!-- 报警详情 -->
    <alarm-detail
      v-if="active.type"
      v-model="isDetail"
      :active="active"
      :row="row"
      @dispose="detailDispose"
    ></alarm-detail>

    <!-- 导出 -->
    <export-excel
      v-model="isExprot"
      :columns="tableColumns"
      :name="active.text"
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
        <base-form v-model="table.search" :column="searchColumns">
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
        <i-button type="primary" @click="getAlarmList">查询</i-button>
      </div>
    </i-drawer>

    <!-- 按钮操作面板 -->
    <div class="buttons-panel">
      <div class="alarm-tab">
        <b>{{ vehicle.plateNumber || "" }}报警记录</b>
      </div>
      <div>
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
        @on-selection-change="onSelect"
      >
        <template slot="operation" slot-scope="{ row }">
          <img src="~A/icon/gps.png" class="icon" @click="showDetail(row)" />
        </template>
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
// import dayjs from 'dayjs';
import { alarmTableConfig, statusOption } from "@/const/serious-alarm";
import { alarmlistSerious, driverlistSerious } from "@/api/daily/serious-alarm";
import table from "@/mixin/table";
import alarmDispose from "./dispose";
import alarmAppeal from "./appeal";
import alarmDetail from "./detail";
import baseForm from "C/base-form";
import { getDeptSubTree } from "@/api/system";

export default {
  name: "alarm-table",
  components: {
    alarmDispose,
    alarmDetail,
    alarmAppeal,
    baseForm,
  },
  mixins: [table],
  props: {
    // 当前激活的预警类型
    active: {
      type: Object,
    },
    vehicle: {
      type: Object,
    },
    // 指定推送时间
    // date: {
    //   type: Array
    // }
  },
  data() {
    return {
      table: this.tableInit(alarmTableConfig),
      // 是否显示详情 处理,搜素，导出，申诉
      isDetail: false,
      isDispose: false,
      isSearch: false,
      isExprot: false,
      isAppeal: false,
      // 多选，企业树，搜索，当前行，
      selection: [],
      treeData: [],
      row: {},
      // 按钮配置,处理时间限制
      buttons: [
        { label: "条件查询", icon: "md-search", fn: this.showSearch },
        /*  { label: '申诉', icon: 'md-create', fn: this.showAppeal },
        { label: '处理', icon: 'md-create', fn: this.showDispose }, */
        { label: "导出", icon: "md-cloud-download", fn: this.showExprot },
        { label: "刷新", icon: "md-sync", fn: this.getAlarmList },
      ],
    };
  },
  computed: {
    // 动态显示列
    tableColumns() {
      return this.table.columns.filter((item) => {
        return item.display === undefined
          ? true
          : this.active.type == item.display ||
              this.active.key == item.display ||
              this.active.text == item.display;
      });
    },
    // 动态显示搜索
    searchColumns() {
      return this.table.searchColumns.filter((item) => {
        return item.display == undefined
          ? true
          : this.active.key == item.display;
      });
    },
    // 接口方法
    listAction() {
      let isApi;
      if (this.active.type == "GPS") {
        isApi = alarmlistSerious;
      } else if (this.active.type == "driver") {
        isApi = driverlistSerious;
      }
      return isApi;
    },
  },
  watch: {
    vehicle() {
      this.toggleAlarm();
    },
  },

  methods: {
    // 获取列表数据
    async getList(params = {}) {
      const table = this.table;
      const search = table.search;
      let query = {
        ...table.onParams(),
        ...params,
        alarmType: this.active.text,
        company: this.$store.getters.deptName,
        beginTime: this.active.beginTime,
        endTime: this.active.endTime,
        color: this.vehicle.color,
        plateNumber: this.vehicle.plateNumber,
        type: this.active.type == "driver" ? 1 : 0,
        chaosubi: search.chaosubi[0],
        chaosubiMax: search.chaosubi[1],
      };
      this.$emit("getQuery", query);
      let res = await this.listAction(query);
      let data = res.data.data;
      this.$emit("getData", {
        statis: data.baojingTongji,
        data: data.records,
      });
      let statusMap = {};
      statusOption.forEach((item) => (statusMap[item.value] = item.label));
      // data.baojingTongji.date = search.date;
      data.records.forEach((item) => {
        // let date = item.gpsTime || item.cutoffTime;
        // let a = dayjs(date).unix() < dayjs(this.dateLimit).unix();
        let b = item.chulizhuangtai == "已处理";
        let c = item.shensuzhuangtai == "已申诉";
        item._disabled = b || c;
        item.status = statusMap[item.status];
      });
      return data;
    },
    // 判断是否申诉
    appealIcon(row) {
      let url = null;
      if (row.shensuzhuangtai == "未申诉") {
        url = require("@/assets/daily/wss.png");
      }
      if (row.shensuzhuangtai == "已申诉") {
        url = require("@/assets/daily/yss.png");
      }
      if (row.shensuzhuangtai == "审核中") {
        url = require("@/assets/daily/ssshz.png");
      }
      if (row.shensuzhuangtai == "申诉通过") {
        url = require("@/assets/daily/ssshtg.png");
      }
      if (row.shensuzhuangtai == "申诉驳回") {
        url = require("@/assets/daily/ssshbh.png");
      }
      return url;
    },
    // 回填到列表
    async getAlarmList() {
      const table = this.table;
      table.loading = true;
      this.isDetail = false;
      let data = await this.getList();
      table.onFill(data);
      this.$emit("getData", {
        statis: data.baojingTongji,
        data: data.records,
      });
    },
    async refresh() {
      const table = this.table;
      table.loading = true;
      this.isDetail = false;
      let data = await this.getList("refresh");
      table.onFill(data);
      // this.$emit('getData', {
      //   statis: data.baojingTongji,
      //   data: data.records
      // });
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
    // 切换报警
    async toggleAlarm() {
      this.table.page = 1;
      this.getAlarmList();
    },
    // 多选
    onSelect(selection) {
      this.selection = selection;
    },
    // 详情处理
    detailDispose(rows) {
      this.onSelect(rows);
      this.showDispose();
    },
    // 是否选中数据
    testSelection(call) {
      if (this.selection.length == 0) {
        this.$message.warning("请先选择数据");
      } else {
        call();
      }
    },
    // 显示处理
    showDispose() {
      this.testSelection(() => (this.isDispose = true));
    },
    // 显示详情
    showDetail(row) {
      this.row = row;
      this.isDetail = true;
    },
    // 显示申诉
    showAppeal() {
      this.testSelection(() => (this.isAppeal = true));
    },
    // 显示搜素
    showSearch() {
      this.isSearch = true;
      if (this.treeData.length == 0) {
        this.getTreeData();
      }
    },
    // 显示下载
    showExprot() {
      this.isExprot = true;
    },
  },
};
</script>

<style lang="scss">
.ivu-slider-wrap {
  margin: 46px 0;
}
.buttons-panel {
  position: relative;
  .alarm-tab {
    display: flex;
    position: absolute;
    left: 14px;
    color: #333;
    font-size: 16px;
    & > div {
      cursor: pointer;
      margin-right: 10px;
      span {
        margin: 0;
      }
      img {
        width: 20px;
        vertical-align: bottom;
        margin: 0 4px;
      }
    }
    .check {
      color: #2e81ec;
    }
  }
}
</style>
