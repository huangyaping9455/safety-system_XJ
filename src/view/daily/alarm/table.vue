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
      @appeal="detailAppeal"
    ></alarm-detail>

    <!-- 导出 -->
    <export-excel
      v-model="isExprot"
      :columns="tableColumns"
      :name="active.text"
      :export="getList"
    ></export-excel>

    <!-- 报警搜索参数 -->
    <i-modal
      v-model="isSearch"
      title="查询条件"
      :width="600"
      :footer-hide="true"
      class="custom-drawer"
    >
      <div class="drawer-body">
        <div class="sousuocanshu">
          <base-form v-model="table.search" :column="searchColumns">
            <i-dropdown slot="jigouName" class="w100" trigger="click">
              <i-input :value="table.search.jigouName"></i-input>
              <i-dropdown-menu slot="list">
                <i-tree :data="treeData" :render="treeRender"></i-tree>
              </i-dropdown-menu>
            </i-dropdown>
          </base-form>
        </div>
      </div>
      <div class="drawer-footer">
        <i-button @click="isSearch = false">取消</i-button>
        <i-button type="primary" @click="getAlarmList">查询</i-button>
      </div>
    </i-modal>

    <!-- 按钮操作面板 -->
    <div class="buttons-panel">
      <!-- <div v-show="active.text == '超速报警'" class="alarm-tab">
        <div
          v-for="(item, index) in alarmGrade"
          :key="index"
          :class="{ check: index == tabIndex }"
          @click="getCaosuList(item.status, index)"
        >
          <img :src="item.icon" />
          <span>{{ item.label }}</span>
        </div>
      </div> -->
      <div>
        <i-button
          v-for="item in buttons"
          :key="item.label"
          size="small"
          type="primary"
          shape="circle"
          :icon="item.icon"
          @click="item.fn"
          :loading="item.btnloading"
          >{{ item.label }}</i-button
        >
      </div>
    </div>

    <!-- table -->
    <div class="table-box">
      <div style="height:3.7rem;display:flex;justify-content: space-between;">
        <div>
          <alarmList :search="query" @on-click="toggleAlarm" />
        </div>
      </div>
      <i-table
        border
        ref="tableheight"
        :height="caleHeight"
        :loading="table.loading"
        :data="table.data"
        :columns="tableColumns"
        @on-sort-change="table.onSort"
        @on-selection-change="onSelect"
      >
        <template slot="chulizhuangtai" slot-scope="{ row }">
          <img
            v-if="row.chulizhuangtai == '已处理'"
            src="~A/daily/yichuli.png"
            style="height:35px;"
            alt
          />
          <img
            style="height:35px;"
            v-else
            src="~A/daily/alarmweichuli.png"
            alt
          />
        </template>
        <template slot="shensuzhuangtai" slot-scope="{ row }">
          <div v-if="active.text == '超速报警'">
            <span v-if="row.isRegionV == 1">不可申诉</span>
            <img style="height:35px;" v-else :src="appealIcon(row)" />
          </div>
          <img style="height:35px;" v-else :src="appealIcon(row)" />
        </template>
        <template slot="alarmtype" slot-scope="{ row }">
          <span v-if="row.alarmType != '超速报警'">{{ row.alarmType }}</span>
          <span v-else>超速报警（区域已验证）</span>
        </template>
        <template slot="operation" slot-scope="{ row }">
          <img
            src="~A/daily/caozuo.png"
            class="icon"
            @click="showDetail(row)"
          />
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
import alarmList from "./list";
import dayjs from "dayjs";
import { alarmTableConfig, statusOption } from "@/const/alarm";
import {
  getGPSAlarmList,
  getDriverAlarmList,
  getBudingweiAlarmList,
  getNotLineAlarmList,
} from "@/api/daily/alarm";
import table from "@/mixin/table";
import alarmDispose from "./dispose";
import alarmAppeal from "./appeal";
import alarmDetail from "./detail";
import baseForm from "C/base-form";
import { getDeptSubTree } from "@/api/system";
import { export_json_to_excel } from "../../../const/Export2Excel";

export default {
  name: "alarm-table",
  components: {
    alarmDispose,
    alarmDetail,
    alarmAppeal,
    baseForm,
    alarmList,
  },
  mixins: [table],
  props: {
    // 当前激活的预警类型
    // active: {
    //   type: Object,
    // },
    // 指定推送时间
    date: {
      type: Array,
    },
  },
  data() {
    return {
      active: {},
      query: {},
      caleHeight: 700,
      load: false,
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
        {
          label: "条件查询",
          icon: "md-search",
          fn: this.showSearch,
          btnloading: false,
        },
        {
          label: "申诉",
          icon: "md-create",
          fn: this.showAppeal,
          btnloading: false,
        },
        {
          label: "处理",
          icon: "md-create",
          fn: this.showDispose,
          btnloading: false,
        },
        {
          label: "导出",
          icon: "md-cloud-download",
          fn: this.showExprot,
          btnloading: false,
        },
        {
          label: "刷新",
          icon: "md-sync",
          fn: this.getAlarmList,
          btnloading: false,
        },
      ],
      alarmGrade: [
        { icon: require("A/daily/all.png"), label: "全部", status: "" },
        { icon: require("A/daily/general.png"), label: "普通超速", status: 0 },
        { icon: require("A/daily/yiji.png"), label: "严重一级", status: 1 },
        { icon: require("A/daily/erji.png"), label: "严重二级", status: 2 },
        { icon: require("A/daily/sanji.png"), label: "严重三级", status: 3 },
      ],
      tabIndex: 0,
      dateLimit: dayjs()
        .subtract(1, "month")
        .format("YYYY-MM-DD"),
      //     dateLimitE: dayjs()
      // .subtract(1, 'day')
      // .format('YYYY-MM-DD'),
    };
  },
  computed: {
    // 动态显示列
    tableColumns() {
      return this.table.columns.filter((item) => {
        if (this.active.type === "GPS" && this.active.text === "疲劳驾驶报警") {
          return item.display === undefined || item.dis
            ? true
            : this.active.type == item.display ||
                this.active.key == item.display ||
                this.active.text == item.display;
        } else {
          return item.display === undefined
            ? true
            : this.active.type == item.display ||
                this.active.key == item.display ||
                this.active.text == item.display;
        }
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
        isApi = getGPSAlarmList;
      } else if (this.active.type == "driver") {
        isApi = getDriverAlarmList;
      } else if (this.active.type == "notLocation") {
        isApi = getBudingweiAlarmList;
      } else {
        isApi = getNotLineAlarmList;
      }
      return isApi;
    },
  },
  watch: {
    active() {
      // this.toggleAlarm(this.active);
    },
    date() {
      this.table.search.date = this.date;
    },
  },
  created() {
    let dateLimit = "";
    let dateLimitE = "";
    if (this.$route.query.alarmType != undefined) {
      dateLimit = dayjs()
        .subtract(1, "day")
        .format("YYYY-MM-DD");
      dateLimitE = dayjs()
        .subtract(0, "day")
        .format("YYYY-MM-DD");
    } else {
      dateLimit = dayjs()
        .subtract(1, "day")
        .format("YYYY-MM-DD");
      dateLimitE = dayjs()
        .subtract(0, "day")
        .format("YYYY-MM-DD");
    }
    this.table.search.date = this.date ? this.date : [dateLimit, dateLimitE];
  },
  mounted() {
    this.showAlarmshu();
    this.$nextTick(function() {
      this.caleHeight = window.innerHeight - 270;
      // 监听窗口大小变化
      let self = this;
      window.onresize = function() {
        self.caleHeight =
          window.innerHeight - self.$refs.tableheight.$el.offsetTop - 10;
      };
    });
  },
  methods: {
    // 传入query(参数) 渲染不同用页面
    getQuery(query) {
      if (this.load == false) {
        if (this.$route.query.alarmType == undefined) {
          this.load = true;
          this.query = query;
        } else {
          this.load = true;
          query.alarmType = this.$route.query.alarmType;
          this.query = query;
        }
      }
    },
    // 获取列表数据
    async getList(params = {}) {
      const table = this.table;
      const search = table.search;
      let query = {
        ...table.onParams(),
        ...params,
        alarmType: this.active.text,
        deptName: this.$store.getters.deptName,
        beginTime: dayjs(search.date[0]).format("YYYY-MM-DD"),
        endTime: dayjs(search.date[1]).format("YYYY-MM-DD"),
        chaosubi: search.chaosubi[0],
        chaosubiMax: search.chaosubi[1],
      };
      this.$emit("getQuery", query);
      let res = await this.listAction(query);
      let data = res.data.data;
      // this.$emit("getData", {
      // statis: data.baojingTongji,
      // data: data.records,
      // });
      let statusMap = {};
      statusOption.forEach((item) => (statusMap[item.value] = item.label));
      data.baojingTongji.date = search.date;
      data.records.forEach((item) => {
        let date = item.gpsTime || item.cutoffTime;
        // let a = dayjs(date).unix() < dayjs(this.dateLimit).unix();
        let b = item.chulizhuangtai == "已处理";
        let c = item.shensuzhuangtai == "已申诉";
        let d = item.shensuzhuangtai == "审核中";
        let e = item.shensuzhuangtai == "申诉通过";
        // let f = item.shensuzhuangtai == "申诉驳回";
        item._disabled = b || c || d || e;
        item.status = statusMap[item.status];
        if (item.calctime) {
          item.calctime = item.calctime.replace(/\.0$/g, "");
        }
      });
      return data;
    },
    async getCaosuList(mark, index) {
      this.tabIndex = index;
      const table = this.table;
      const search = table.search;
      let params = {};
      let query = {
        ...table.onParams(),
        ...params,
        alarmType: this.active.text,
        deptName: this.$store.getters.deptName,
        beginTime: dayjs(search.date[0]).format("YYYY-MM-DD"),
        endTime: dayjs(search.date[1]).format("YYYY-MM-DD"),
        chaosubi: search.chaosubi[0],
        chaosubiMax: search.chaosubi[1],
        status: mark,
      };
      let res = await this.listAction(query);
      let data = res.data.data;
      table.onFill(data);
      let statusMap = {};
      statusOption.forEach((item) => (statusMap[item.value] = item.label));
      data.baojingTongji.date = search.date;
      data.records.forEach((item) => {
        let date = item.gpsTime || item.cutoffTime;
        // let a = dayjs(date).unix() < dayjs(this.dateLimit).unix();
        let b = item.chulizhuangtai == "已处理";
        let c = item.shensuzhuangtai == "已申诉";
        let d = item.shensuzhuangtai == "审核中";
        let e = item.shensuzhuangtai == "申诉通过";
        // let f = item.shensuzhuangtai == "申诉驳回";
        item._disabled = b || c || d || e;
        item.status = statusMap[item.status];
        if (item.calctime) {
          item.calctime = item.calctime.replace(/\.0$/g, "");
        }
      });
      return data;
    },
    // 判断是否申诉
    appealIcon(row) {
      let url = null;
      if (row.shensuzhuangtai == "未申诉") {
        url = require("@/assets/daily/alarmweishensu.png");
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
      //ssshz.png  ssshtg.png ssshbh.png
      // let url =
      //   row.shensuzhuangtai == '未申诉'
      //     ? require('@/assets/daily/wss.png')
      //     : require('@/assets/daily/yss.png');
      return url;
    },
    // 回填到列表
    async getAlarmList() {
      // this.table.search.shifouchuli = "";
      // this.table.search.shifoushenshu = "";
      const table = this.table;
      this.isSearch = false;
      table.loading = true;
      this.isDetail = false;
      let data = await this.getList();
      table.onFill(data);
      // this.$emit("getData", {
      //   statis: data.baojingTongji,
      //   data: data.records,
      // });
    },
    async refresh() {
      const table = this.table;
      table.loading = true;
      this.isDetail = false;
      let data = await this.getList("refresh");
      table.onFill(data);
      this.$emit("getData", {
        statis: data.baojingTongji,
        data: data.records,
      });
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
    // async toggleAlarm() {
    //   this.table.page = 1;
    //   this.getAlarmList();
    // },
    // // 按钮点击 切换表格
    toggleAlarm(item) {
      this.active = item;
      this.getAlarmList();
      this.showAlarmshu();
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
    detailAppeal(rows) {
      this.onSelect(rows);
      this.showAppeal();
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
    // // 显示详情
    showDetail(row) {
      this.row = row;
      this.isDetail = true;
      for (let i in this.$children) {
        if (this.$children[i].QKclick !== undefined) {
          this.$children[i].QKclick();
        }
      }
    },
    // 显示申诉
    showAppeal() {
      let isDispose = this.selection.every((item) => {
        return item.isRegionV != "1" && item.shensuzhuangtai !== "申诉驳回";
      });
      if (isDispose) {
        this.testSelection(() => (this.isAppeal = true));
      } else {
        this.$message.warning("勾选的数据包含‘申诉驳回’的数据");
      }
    },
    // 显示搜素
    showSearch() {
      let input = document.getElementsByClassName("ivu-form-item-content")[20];
      if (input) {
        input.style.display = "block";
      }
      this.isSearch = true;
      if (this.treeData.length == 0) {
        this.getTreeData();
      }
    },
    // // 报警数  报警车辆 处理率
    async showAlarmshu() {
      const table = this.table;
      const search = table.search;
      let query = {
        current: 1,
        size: 20,
        shifouchuli: "",
        shifoushensu: "",
        alarmType: this.active.text,
        deptName: this.$store.getters.deptName,
        beginTime: dayjs(search.date[0]).format("YYYY-MM-DD"),
        endTime: dayjs(search.date[1]).format("YYYY-MM-DD"),
        chaosubi: search.chaosubi[0],
        chaosubiMax: search.chaosubi[1],
      };
      this.$emit("getQuery", query);
      let res = await this.listAction(query);
      this.$emit("getData", {
        statis: res.data.data.baojingTongji,
        data: res.data.data.records,
      });
    },
    // 显示下载
    async showExprot() {
      this.buttons[3].btnloading = true;
      const table = this.table;
      const search = table.search;
      let query = {
        current: 0,
        size: 0,
        shifouchuli: table.onParams().shifouchuli,
        shifoushensu: table.onParams().shifoushensu,
        alarmType: this.active.text,
        deptName: this.$store.getters.deptName,
        beginTime: dayjs(search.date[0]).format("YYYY-MM-DD"),
        endTime: dayjs(search.date[1]).format("YYYY-MM-DD"),
        chaosubi: search.chaosubi[0],
        chaosubiMax: search.chaosubi[1],
      };
      this.$emit("getQuery", query);
      let res = await this.listAction(query);
      if (res.data.success == true) {
        res.data.data = res.data.data.records.map((el, index) => {
          return {
            ...el,
            index: index + 1,
          };
        });
        this.export2Excel(res.data.data);
        this.buttons[3].btnloading = false;
      } else {
        this.$message.error(err);
      }
    },
    //处理下载数据
    formatJson(filterVal, jsonData) {
      return jsonData.map((v) => filterVal.map((j) => v[j]));
    },
    export2Excel(list) {
      require.ensure([], () => {
        const multiHeader2 = [
          "是否处理",
          "是否申诉",
          "车牌",
          "报警类型",
          "车牌颜色",
          "开始行驶时间",
          "报警开始时间",
          "报警结束时间",
          "报警位置",
          "持续时间",
          "报警速度（公里/小时）",
          "限速值（公里/小时）",
          "车辆类型",
          "经度",
          "纬度",
          "处理人/申诉人",
          "处理时间/申诉时间",
          "处理形式",
          "处理描述",
          "申诉形式",
          "申诉描述",
        ];
        const filterVal = [
          "chulizhuangtai",
          "shensuzhuangtai",
          "plate",
          "alarmType",
          "color",
          "calctime",
          "beginTime",
          "endTime",
          "roadName",
          "keeptimeShow",
          "maxSpeed",
          "limited",
          "operatType",
          "longitude",
          "latitude",
          "chuliren",
          "chulishijian",
          "chulixingshi",
          "chulimiaoshu",
          "shensuxingshi",
          "shensumiaoshu",
        ];
        const merges = [
          "A1:A2",
          "B1:B2",
          "C1:C2",
          "D1:D2",
          "E1:E2",
          "F1:F2",
          "G1:G2",
          "H1:H2",
          "I1:I2",
          "J1:J2",
          "K1:K2",
          "L1:L2",
          "M1:M2",
          "N1:N2",
          "O1:O2",
          "P1:P2",
          "Q1:Q2",
          "R1:R2",
          "S1:S2",
          "T1:T2",
          "U1:U2",
        ];
        const data = this.formatJson(filterVal, list);
        export_json_to_excel({
          multiHeader2,
          header: multiHeader2,
          data,
          filename: "车辆报警信息",
          merges,
        });
      });
    },
  },
};
</script>

<style lang="scss">
.ivu-slider-wrap {
  margin: 46px 0;
}
.ivu-modal {
  top: 190px;
}
.buttons-panel {
  position: relative;
  .alarm-tab {
    display: flex;
    position: absolute;
    left: 14px;
    color: #999999;
    font-size: 12px;
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
@media screen and (min-width: 1276px) and (max-width: 1528px) {
  .base-table-container {
    .buttons-panel {
      height: 50px;
      flex-wrap: wrap;
      .alarm-tab {
        position: static;
      }
    }
  }
}
.buttons-panel .ivu-btn-primary {
  background-color: #37a9f7;
}
.ivu-table-tip table td {
  width: auto !important;
}
</style>
