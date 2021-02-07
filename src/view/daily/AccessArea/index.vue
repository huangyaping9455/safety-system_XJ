<template>
  <div class="daystatis">
    <div class="daystatis-main">
      <div class="daystatis-btn">
        <div class="daystatis-serch">
          <div class="searchBody">
            <span>统计日期 :</span>
            <el-date-picker
              v-model="beginDate"
              type="date"
              clearable
              :picker-options="pickerOptions"
              value-format="yyyy-MM-dd"
              placeholder="选择开始日期"
            ></el-date-picker>
            <span>至</span>
            <el-date-picker
              v-model="endData"
              type="date"
              clearable
              :picker-options="pickerOptions"
              value-format="yyyy-MM-dd"
              placeholder="选择结束日期"
            ></el-date-picker>
          </div>
          <div class="searchBody">
            <span>所属企业：</span>
            <i-input
              v-model="deptName"
              size="large"
              clearable
              placeholder="请输入..."
            ></i-input>
          </div>
          <div class="searchBody">
            <span>车牌号码：</span>
            <i-input
              class="chepai"
              v-model="cheliangpaizhao"
              size="large"
              clearable
              placeholder="请输入..."
            ></i-input>
          </div>
          <div class="searchBody">
            <span>区域名称：</span>
            <i-input
              v-model="areaName"
              size="large"
              placeholder="请输入..."
            ></i-input>
          </div>
          <div class="searchBody">
            <span>停留时间(秒)：</span>
            <i-input
              class="tingliu"
              v-model="keeptime"
              size="large"
              clearable
              placeholder="请输入..."
            ></i-input>
          </div>
          <i-button
            type="primary"
            shape="circle"
            class="searchbtn"
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
import { getQYInOutAreaTJ } from "@/api/daily/Statistics";
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
      cheliangpaizhao: "",
      deptName: "",
      keeptime: "",
      areaName: "",
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
          key: "deptName",
          align: "center",
          width: 220,
        },
        {
          title: "车辆牌照",
          key: "cheliangpaizhao",
          align: "center",
          width: 110,
        },
        {
          title: "车牌颜色",
          key: "chepaiyanse",
          align: "center",
          width: 100,
        },
        {
          title: "运营类型",
          key: "operatType",
          align: "center",
        },
        {
          title: "区域名称",
          key: "areaName",
          align: "center",
        },
        {
          title: "区域类型",
          key: "areaType",
          align: "center",
          width: 90,
        },
        {
          title: "进出次数",
          key: "inOutTimes",
          align: "center",
          width: 90,
        },
        {
          title: "进区域时间",
          key: "inTime",
          align: "center",
        },
        {
          title: "出区域时间",
          key: "outTime",
          align: "center",
        },
        {
          title: "停留时间",
          key: "keeptimeShow",
          align: "center",
        },
      ],
      data: [],
      exportLoading: false,
    };
  },
  mounted() {
    this.getQYInOutAreaTJ();
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
    getQYInOutAreaTJ() {
      this.loading = true;
      let data = {
        current: this.current,
        size: this.size,
        beginTime: this.beginDate,
        endTime: this.endData,
        deptName: this.deptName,
        cheliangpaizhao: this.cheliangpaizhao,
        keepTime: this.keeptime,
        areaName: this.areaName,
        order: 1,
        orderColumns: "",
      };
      getQYInOutAreaTJ(data).then((res) => {
        this.loading = false;
        this.data = res.data.data.records;
        this.total = res.data.data.total;
      });
    },
    // 每页显示条数改变
    handleSizeChange(val) {
      this.size = val;
      this.getQYInOutAreaTJ();
    },
    // 当前页改变
    handleCurrentChange(val) {
      this.current = val;
      this.getQYInOutAreaTJ();
    },
    // 刷新
    refresh() {
      this.current = 1;
      this.getQYInOutAreaTJ();
    },
    // 搜索
    statisSearch() {
      this.getQYInOutAreaTJ();
    },
    // 导出
    // exportData() {
    //   this.$refs.table.exportCsv({
    //     // type: "xlsx",
    //     filename: "进出区域汇总",
    //     columns: this.columns,
    //     data: this.data,
    //     original: false,
    //   });
    // },
    exportData() {
      this.exportLoading = true;
      let data = {
        current: 0,
        size: 0,
        beginTime: this.beginDate,
        endTime: this.endData,
        deptName: this.deptName,
        cheliangpaizhao: this.cheliangpaizhao,
        keepTime: this.keeptime,
        areaName: this.areaName,
        order: 1,
        orderColumns: "",
      };
      getQYInOutAreaTJ(data).then((res) => {
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
          "车辆牌照",
          "车牌颜色",
          "营运类型",
          "区域名称",
          "区域类型",
          "进出次数",
          "进区域时间",
          "出区域时间",
          "停留时间",
        ];
        const filterVal = [
          "deptName",
          "cheliangpaizhao",
          "chepaiyanse",
          "operatType",
          "areaName",
          "areaType",
          "inOutTimes",
          "inTime",
          "outTime",
          "keeptimeShow",
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
        ];
        const data = this.formatJson(filterVal, list);
        export_json_to_excel({
          multiHeader2,
          header: multiHeader2,
          data,
          filename: "进出区域汇总",
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
        line-height: 4rem;
        .searchBody {
          display: flex;
          span {
            margin-left: 1rem;
            font-size: 14px;
            font-weight: 600;
          }
          .ivu-input-wrapper {
            width: 130px;
            margin-top: 0.6rem;
          }
          .tingliu {
            width: 80px;
          }
          .chepai {
            width: 100px;
          }
        }
        .searchBody:first-child {
          display: flex;
          .el-date-editor {
            height: 2.8rem;
            width: 135px;
          }
          span {
            margin: 0;
            font-size: 14px;
            font-weight: 600;
          }
        }
        .searchbtn {
          margin-top: 1rem;
          margin-left: 0.5rem;
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
