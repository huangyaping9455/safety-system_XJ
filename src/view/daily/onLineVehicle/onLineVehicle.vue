<template>
  <div class="daystatis">
    <div class="daystatis-btn">
      <div class="daystatis-search">
        <span>统计日期 :</span>
        <el-date-picker
          v-model="beginDate"
          type="date"
          clearable
          :picker-options="pickerOptions"
          value-format="yyyy-MM-dd"
          placeholder="选择开始日期"
        ></el-date-picker>
        <span style="margin:0 0.5vh;">至</span>
        <el-date-picker
          style=""
          v-model="endData"
          type="date"
          clearable
          :picker-options="pickerOptions"
          value-format="yyyy-MM-dd"
          placeholder="选择结束日期"
        ></el-date-picker>
        <span style="margin-left:0.8rem;">车辆牌照:</span>
        <i-input
          v-model="valueName"
          size="large"
          clearable
          placeholder="请输入车辆牌照..."
        ></i-input>
        <span style="margin-left:0.8rem;">报警状态:</span>
        <i-select
          v-model="alarmType"
          size="large"
          placeholder="请选择报警状态..."
          clearable
        >
          <i-option label="全部" value=""></i-option>
          <i-option label="报警" value="报警"></i-option>
          <i-option label="未报警" value="未报警"></i-option>
        </i-select>
        <span style="margin-left:0.8rem;">定位状态:</span>
        <i-select
          v-model="localType"
          size="large"
          placeholder="请选择定位状态..."
          clearable
        >
          <i-option label="全部" value=""></i-option>
          <i-option label="定位" value="定位"></i-option>
          <i-option label="不定位" value="不定位"></i-option>
        </i-select>
        <i-button
          type="primary"
          shape="circle"
          icon="ios-search"
          @click="statisSearch"
          >搜索</i-button
        >
      </div>
      <div>
        <i-button
          type="primary"
          shape="circle"
          icon="ios-cloud-download-outline"
          @click="exportData"
          :loading="exportLoading"
          >导出</i-button
        >
        <el-tooltip
          class="item"
          effect="dark"
          content="刷新"
          placement="bottom"
        >
          <i-button
            type="primary"
            shape="circle"
            icon="ios-refresh"
            @click="refresh"
          ></i-button>
        </el-tooltip>
      </div>
    </div>
    <div class="daystatis-content">
      <i-table
        border
        :height="caleHeight"
        v-loading="loading"
        :columns="columns"
        :data="data"
        ref="table"
      ></i-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="current"
        :page-sizes="[20, 50, 100, 200]"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
import { getTpvehdataTJ } from "@/api/daily/vehicle";
import { export_json_to_excel } from "../../../const/Export2Excel";
export default {
  data() {
    return {
      current: 1,
      size: 20,
      total: 20,
      valueName: "",
      localType: "",
      alarmType: "",
      loading: false,
      exportLoading: false,
      caleHeight: 700,
      beginDate: dayjs().format("YYYY-MM-DD"),
      endData: dayjs().format("YYYY-MM-DD"),
      pickerOptions: {
        disabledDate(time) {
          return (
            time.getTime() > Date.now()
            //  ||  time.getTime() < Date.now() - 24 * 60 * 60 * 1000 * 30
          );
        },
      },
      columns: [
        {
          type: "index",
          title: "排序",
          width: 50,
          align: "center",
        },
        {
          title: "企业名称",
          key: "deptName",
          minWidth: 100,
          tooltip: true,
        },
        {
          title: "车辆牌照",
          key: "veNumber",
          align: "center",
          width: 100,
        },
        {
          title: "车牌颜色",
          key: "veColor",
          align: "center",
          width: 100,
        },
        {
          title: "终端编号",
          key: "deviceID",
          align: "center",
          width: 130,
        },
        {
          title: "使用性质",
          key: "shiyongxingzhi",
          align: "center",
          width: 130,
          tooltip: true,
        },
        {
          title: "车辆状态",
          key: "cheliangzhuangtai",
          align: "center",
          width: 80,
        },
        {
          title: "报警状态",
          key: "alarm",
          align: "center",
          width: 80,
        },
        {
          title: "报警类型",
          key: "alarmNote",
          align: "center",
        },
        {
          title: "定位状态",
          key: "locate",
          align: "center",
          width: 80,
        },
        {
          title: "定位时间",
          key: "lastLocateTime",
          align: "center",
          width: 160,
          tooltip: true,
        },
        {
          title: "当前速度",
          key: "velocity",
          align: "center",
          width: 90,
        },
        {
          title: "定位地点",
          key: "localName",
          tooltip: true,
          minWidth: 100,
        },
      ],
      data: [],
    };
  },
  mounted() {
    this.getTpvehdataTJ();
    this.$nextTick(function() {
      this.caleHeight =
        window.innerHeight - this.$refs.table.$el.offsetTop - 105;
      // 监听窗口大小变化
      let self = this;
      window.onresize = function() {
        self.caleHeight =
          window.innerHeight - self.$refs.table.$el.offsetTop - 105;
      };
    });
    if (this.$store.state.common.currentMenu.name == "首页") {
      this.$parent.menu.map((el) => {
        if (el.children.length != 0) {
          el.children.map((val) => {
            if (val.name == "在线车辆明细") {
              this.$parent.menuClick(val);
            }
          });
        }
      });
    }
  },
  methods: {
    // 获取列表
    getTpvehdataTJ() {
      this.loading = true;
      let beginTime;
      let endTime;
      if (this.beginDate !== null && this.endData !== null) {
        beginTime = this.beginDate;
        endTime = this.endData;
      } else {
        beginTime = dayjs().format("YYYY-MM-DD");
        endTime = dayjs().format("YYYY-MM-DD");
      }
      let data = {
        current: this.current,
        size: this.size,
        cheliangpaizhao: this.valueName,
        beginTime: beginTime,
        endTime: endTime,
        alarmShow: this.alarmType,
        locateShow: this.localType,
      };
      getTpvehdataTJ(data)
        .then((res) => {
          this.data = res.data.data.records.map((el) => {
            if (el.cheliangzhuangtai === 0) {
              el.cheliangzhuangtai = "在用";
            } else {
              el.cheliangzhuangtai = "停用";
            }
            return el;
          });
          this.total = res.data.data.total;
          this.loading = false;
        })
        .catch((rej) => {
          this.loading = false;
          this.$message("暂无数据···");
        });
    },
    // 搜索
    statisSearch() {
      let begins = new Date(this.beginDate).getTime();
      let ends = new Date(this.endData).getTime();
      if (ends < begins)
        return this.$message.error("结束日期不能大于开始日期，请确认");
      if (ends - begins > 24 * 60 * 60 * 1000 * 31)
        return this.$message.error("统计日期区间不能大于31天，请确认");
      this.getTpvehdataTJ();
    },
    // 每页显示条数改变
    handleSizeChange(val) {
      this.size = val;
      this.getTpvehdataTJ();
    },
    // 当前页改变
    handleCurrentChange(val) {
      this.current = val;
      this.getTpvehdataTJ();
    },
    // 刷新
    refresh() {
      this.current = 1;
      this.getTpvehdataTJ();
    },
    // 导出
    // exportData() {
    //   this.$refs.table.exportCsv({
    //     filename: "在线车辆统计",
    //     original: false,
    //   });
    // },
    //  导出表格
    exportData() {
      this.exportLoading = true;
      let beginTime;
      let endTime;
      if (this.beginDate !== null && this.endData !== null) {
        beginTime = this.beginDate;
        endTime = this.endData;
      } else {
        beginTime = dayjs().format("YYYY-MM-DD");
        endTime = dayjs().format("YYYY-MM-DD");
      }
      let data = {
        current: 0,
        size: 0,
        cheliangpaizhao: this.valueName,
        beginTime: beginTime,
        endTime: endTime,
        alarmShow: this.alarmType,
        locateShow: this.localType,
      };
      getTpvehdataTJ(data).then((res) => {
        if (res.data.success == true) {
          res.data.data = res.data.data.records.map((el, index) => {
            if (el.cheliangzhuangtai === 0) {
              el.cheliangzhuangtai = "在用";
            } else {
              el.cheliangzhuangtai = "停用";
            }
            return {
              ...el,
              index: index + 1,
            };
          });
          this.export2Excel(res.data.data);
          this.exportLoading = false;
        } else {
          this.$message.error(err);
        }
      });
    },
    //处理下载数据
    formatJson(filterVal, jsonData) {
      return jsonData.map((v) => filterVal.map((j) => v[j]));
    },
    export2Excel(list) {
      require.ensure([], () => {
        const multiHeader2 = [
          "排序",
          "企业名称",
          "车辆牌照",
          "车牌颜色",
          "终端编号",
          "使用性质",
          "车辆状态",
          "报警状态",
          "报警类型",
          "定位状态",
          "定位时间",
          "当前速度",
          "定位地点",
        ];
        const filterVal = [
          "index",
          "deptName",
          "veNumber",
          "veColor",
          "deviceID",
          "shiyongxingzhi",
          "cheliangzhuangtai",
          "alarm",
          "alarmNote",
          "locate",
          "lastLocateTime",
          "velocity",
          "localName",
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
        ];
        const data = this.formatJson(filterVal, list);
        export_json_to_excel({
          multiHeader2,
          header: multiHeader2,
          data,
          filename: "在线车辆明细",
          merges,
        });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.daystatis {
  height: calc(100% - 57px);
  padding: 1.5vh;
  background-color: #f2f9ff;
  .daystatis-btn {
    display: flex;
    background: #ffffff;
    height: 3.5rem;
    align-items: center;
    justify-content: space-between;
    padding: 0 0.7rem;
    .daystatis-search {
      display: flex;
      span {
        line-height: 4rem;
        font-size: 14px;
        font-weight: 600;
      }
      .el-date-editor {
        height: 2.9rem;
        width: 14vh;
        margin-top: 0.9vh;
      }
      .ivu-input-wrapper,
      .ivu-select {
        width: 15vh !important;
        margin-top: 0.9vh;
        /deep/ .ivu-select-placeholder {
          font-size: 14px !important;
        }
      }
      .ivu-btn {
        margin: 1.3vh;
      }
    }
  }
  .daystatis-content {
    .el-pagination {
      height: 3rem;
      background: #ffffff;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding: 0 1rem;
    }
  }
}
</style>
<style>
.ivu-table th {
  background-color: #d5ebff;
}
.ivu-input-large {
  font-size: 14px;
}
</style>
