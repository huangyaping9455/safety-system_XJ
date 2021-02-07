<template>
  <div class="daystatis">
    <!-- <div class="daystatis-head">
      <span>车辆日运行统计</span>
    </div> -->
    <div class="daystatis-main">
      <div class="daystatis-btn">
        <div class="daystatis-serch">
          <span>统计日期 :</span>
          <el-date-picker
            style="height:2.8rem;width:11rem;margin-top:0.6rem;margin-left:0.8rem;"
            v-model="beginDate"
            type="date"
            :picker-options="pickerOptions"
            value-format="yyyy-MM-dd"
            placeholder="选择开始日期"
          ></el-date-picker>
          <span style="margin-left:0.8rem;">至</span>
          <el-date-picker
            style="height:2.8rem;width:11rem;margin-top:0.6rem;margin-left:0.8rem;"
            v-model="endData"
            type="date"
            :picker-options="pickerOptions"
            value-format="yyyy-MM-dd"
            placeholder="选择结束日期"
          ></el-date-picker>
          <i-button
            style="margin-top:0.9rem;margin-left:0.6rem;"
            type="primary"
            shape="circle"
            icon="ios-search"
            @click="statisSearch"
            >筛选</i-button
          >
        </div>
        <div>
          <i-button
            type="primary"
            shape="circle"
            icon="ios-cloud-download-outline"
            style="margin:0 0.5rem"
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
          :columns="columns"
          :data="data"
          v-loading="loading"
          ref="table"
        ></i-table>
        <el-pagination
          style="height:3rem;background: #ffffff;display: flex;align-items: center;justify-content: flex-end;padding:0 1rem;"
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
  </div>
</template>
<script>
import { getRYXTJList } from "@/api/daily/Statistics";
import { export_json_to_excel } from "@/const/Export2Excel";
import dayjs from "dayjs";
export default {
  data() {
    return {
      current: 1,
      size: 20,
      total: 20,
      loading: false,
      caleHeight: 705,
      beginDate: dayjs()
        .subtract(1, "day")
        .format("YYYY-MM-DD"),
      endData: dayjs().format("YYYY-MM-DD"),
      pickerOptions: {
        disabledDate(time) {
          return (
            time.getTime() > Date.now() ||
            time.getTime() < Date.now() - 24 * 60 * 60 * 1000 * 30
          );
        },
      },
      columns: [
        {
          title: "企业名称",
          key: "company",
          align: "center",
          width: 220,
        },
        {
          title: "统计日期",
          key: "date",
          // sortable: true,
          align: "center",
          width: 180,
        },
        {
          title: "车辆总数",
          key: "vehicleCount",
          sortable: true,
          align: "center",
        },
        {
          title: "今日上线车辆数",
          key: "onlineCount",
          sortable: true,
          align: "center",
        },
        {
          title: "今日离线车辆数",
          key: "offlineCount",
          sortable: true,
          align: "center",
        },
        {
          title: "今日上线率",
          key: "onlineRate",
          sortable: true,
          align: "center",
        },
        {
          title: "定位车辆数",
          key: "locateCount",
          sortable: true,
          align: "center",
        },
        {
          title: "定位率",
          key: "locateRate",
          sortable: true,
          align: "center",
        },
        {
          title: "轨迹漂移率",
          key: "driftPositionRate",
          sortable: true,
          align: "center",
        },
        {
          title: "轨迹完整率",
          key: "intactPositionRate",
          sortable: true,
          align: "center",
        },
        {
          title: "数据合格率",
          key: "qualifiedPositionRate",
          sortable: true,
          align: "center",
        },
      ],
      data: [],
      exportLoading: false,
    };
  },
  mounted() {
    this.getRYXTJList();
    this.$nextTick(function() {
      this.caleHeight =
        window.innerHeight - this.$refs.table.$el.offsetTop - 100;
      // 监听窗口大小变化
      let self = this;
      window.onresize = function() {
        self.caleHeight =
          window.innerHeight - self.$refs.table.$el.offsetTop - 100;
      };
    });
  },
  methods: {
    getRYXTJList() {
      this.loading = true;
      let data = {
        // deptId:this.deptId,
        current: this.current,
        size: this.size,
        beginTime: this.beginDate,
        endTime: this.endData,
        order: 1,
        orderColumns: "",
      };
      getRYXTJList(data).then((res) => {
        this.loading = false;
        this.data = res.data.data.records;
        this.total = res.data.data.total;
      });
    },
    // 每页显示条数改变
    handleSizeChange(val) {
      this.size = val;
      this.getRYXTJList();
    },
    // 当前页改变
    handleCurrentChange(val) {
      this.current = val;
      this.getRYXTJList();
    },
    // 刷新
    refresh() {
      this.current = 1;
      this.getRYXTJList();
    },
    // 搜索
    statisSearch() {
      this.getRYXTJList();
    },
    // 导出
    // exportData() {
    //   this.$refs.table.exportCsv({
    //     filename: "车辆日运行情况统计",
    //     original: false,
    //   });
    // },
    //  导出表格
    exportData() {
      this.exportLoading = true;
      let data = {
        current: 0,
        size: 0,
        beginTime: this.beginDate,
        endTime: this.endData,
        order: 1,
        orderColumns: "",
      };
      getRYXTJList(data).then((res) => {
        if (res.data.success == true) {
          res.data.data = res.data.data.records.map((el, index) => {
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
          "企业名称",
          "统计日期",
          "车辆总数",
          "今日上线车辆数",
          "今日离线车辆数",
          "今日上线率",
          "定位车辆数",
          "定位率",
          "轨迹漂移率",
          "轨迹完整率",
          "数据合格率",
        ];
        const filterVal = [
          "company",
          "date",
          "vehicleCount",
          "onlineCount",
          "offlineCount",
          "onlineRate",
          "locateCount",
          "locateRate",
          "driftPositionRate",
          "intactPositionRate",
          "qualifiedPositionRate",
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
        ];
        const data = this.formatJson(filterVal, list);
        export_json_to_excel({
          multiHeader2,
          header: multiHeader2,
          data,
          filename: "车辆日运行统计",
          merges,
        });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.daystatis {
  padding: 1.5rem;
  background: #f2f9ff;
  height: 100%;
  // .daystatis-head {
  //   height: 4rem;
  //   line-height: 4rem;
  //   font-size: 18px;
  //   color: #ffffff;
  //   text-align: center;
  //   background: url(/img/popu-head.33d4cda5.png) no-repeat top center;
  //   background-size: 100% 100%;
  // }
  .daystatis-main {
    padding: 0.2rem 1rem;
    background-color: white;
    .daystatis-btn {
      display: flex;
      background: #ffffff;
      height: 3.5rem;
      align-items: center;
      justify-content: space-between;
      padding: 0 1rem;
      .daystatis-serch {
        display: flex;
        span {
          line-height: 4rem;
          font-size: 14px;
          font-weight: 600;
        }
      }
    }
  }
}
</style>
<style>
.daystatis-content .ivu-table th {
  background-color: #ecf8ff;
  color: #01a0ff;
}
</style>
