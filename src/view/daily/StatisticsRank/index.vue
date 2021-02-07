<template>
  <div class="daystatis">
    <div class="daystatis-main">
      <div class="daystatis-btn">
        <div class="daystatis-search">
          <span>统计日期 :</span>
          <el-date-picker
            style="height:2.9rem;width:11rem;margin-top:0.6rem;"
            v-model="beginDate"
            type="date"
            :picker-options="pickerOptions"
            value-format="yyyy-MM-dd"
            placeholder="选择开始日期"
          ></el-date-picker>
          <span style="margin-left:0.8rem;">至</span>
          <el-date-picker
            style="height:2.9rem;width:11rem;margin-top:0.6rem;margin-left:0.8rem;"
            v-model="endData"
            type="date"
            :picker-options="pickerOptions"
            value-format="yyyy-MM-dd"
            placeholder="选择结束日期"
          ></el-date-picker>
          <span style="margin-left:0.8rem;">车牌号:</span>
          <i-input
            v-model="valueName"
            size="large"
            placeholder="请输入车牌号..."
            style="width: 10rem;margin-top:0.6rem;"
          ></i-input>
          <span style="margin-left:0.8rem;">营运类型:</span>
          <i-input
            v-model="valueType"
            size="large"
            placeholder="请输入营运类型..."
            style="width: 10rem;margin-right:0.7rem;margin-top:0.6rem;"
          ></i-input>
          <i-button
            type="primary"
            shape="circle"
            icon="ios-search"
            @click="statisSearch"
            style="margin-top:0.9rem;"
            >搜索</i-button
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
          v-loading="loading"
          :columns="columns"
          :data="data"
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
import dayjs from "dayjs";
import { getPaiMingList } from "@/api/daily/Statistics";
import { export_json_to_excel } from "@/const/Export2Excel";
export default {
  data() {
    return {
      current: 1,
      size: 20,
      total: 20,
      valueName: "",
      valueType: "",
      loading: false,
      caleHeight: 700,
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
          type: "index",
          title: "排序",
          width: 60,
          align: "center",
        },
        {
          title: "企业名称",
          key: "company",
          align: "center",
          width: 180,
        },
        {
          title: "统计时间段",
          key: "date",
          align: "center",
          width: 180,
        },
        {
          title: "车牌号",
          key: "cheliangpaizhao",
          align: "center",
          width: 100,
        },
        {
          title: "营运类型",
          key: "shiyongxingzhi",
          align: "center",
          width: 120,
        },
        {
          title: "车牌颜色",
          key: "chepaiyanse",
          align: "center",
          width: 100,
        },
        {
          title: "北斗报警排名",
          key: "beidongpaiming",
          align: "center",
          children: [
            {
              title: "超速报警次数",
              key: "chaosu",
              sortable: true,
              align: "center",
              width: 130,
            },
            {
              title: "疲劳驾驶报警次数",
              key: "pilao",
              sortable: true,
              align: "center",
              width: 150,
            },
            {
              title: "夜间禁行报警次数",
              key: "yejian",
              sortable: true,
              align: "center",
              width: 150,
            },
            {
              title: "异常报警次数",
              key: "yichang",
              sortable: true,
              align: "center",
              width: 130,
            },
          ],
        },
        {
          title: "北斗报警总数",
          key: "beidoubaojingcishu",
          sortable: true,
          align: "center",
          width: 130,
        },
        {
          title: "主动安全报警排名",
          key: "zhudonganquanpaiming",
          align: "center",
          children: [
            {
              title: "接打电话",
              key: "dmsdadianhua",
              sortable: true,
              align: "center",
              width: 100,
            },
            {
              title: "抽烟",
              key: "dmschouyan",
              sortable: true,
              align: "center",
              width: 100,
            },
            {
              title: "分神",
              key: "dmsfenshen",
              sortable: true,
              align: "center",
              width: 100,
            },
            {
              title: "疲劳驾驶",
              key: "dmspilao",
              sortable: true,
              align: "center",
              width: 100,
            },
          ],
        },
        {
          title: "主动安全报警数",
          key: "zhudongbaojingcishu",
          sortable: true,
          align: "center",
          width: 140,
        },
        {
          title: "报警总数",
          key: "baojingcishu",
          sortable: true,
          align: "center",
          width: 100,
        },
      ],
      data: [],
      exportLoading: false,
    };
  },
  mounted() {
    this.getPaiMingList();
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
    // 获取列表
    getPaiMingList() {
      this.loading = true;
      let beginTime;
      let endTime;
      if (this.beginDate !== null && this.endData !== null) {
        beginTime = this.beginDate;
        endTime = this.endData;
      } else {
        beginTime = dayjs()
          .subtract(1, "day")
          .format("YYYY-MM-DD");
        endTime = dayjs().format("YYYY-MM-DD");
      }
      let data = {
        current: this.current,
        size: this.size,
        cheliangpaizhao: this.valueName,
        shiyongxingzhi: this.valueType,
        beginTime: beginTime,
        endTime: endTime,
      };
      getPaiMingList(data)
        .then((res) => {
          this.data = res.data.data.records;
          for (let i in this.data) {
            if (this.data[i].baojingcheliangshu == -1) {
              this.data[i].baojingcheliangshu = 0;
            }
            if (this.data[i].cheliangshu == -1) {
              this.data[i].cheliangshu = 0;
            }
            if (this.data[i].dmschouyan == -1) {
              this.data[i].dmschouyan = 0;
            }
            if (this.data[i].dmsdadianhua == -1) {
              this.data[i].dmsdadianhua = 0;
            }
            if (this.data[i].dmsfenshen == -1) {
              this.data[i].dmsfenshen = 0;
            }
            if (this.data[i].dmspilao == -1) {
              this.data[i].dmspilao = 0;
            }
          }
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
      this.getPaiMingList();
    },
    // 每页显示条数改变
    handleSizeChange(val) {
      this.size = val;
      this.getPaiMingList();
    },
    // 当前页改变
    handleCurrentChange(val) {
      this.current = val;
      this.getPaiMingList();
    },
    // 刷新
    refresh() {
      this.current = 1;
      this.getPaiMingList();
    },
    // 导出
    // exportData() {
    //   this.$refs.table.exportCsv({
    //     filename: "车辆报警排名",
    //     original: false,
    //   });
    // },
    exportData() {
      this.exportLoading = true;
      let beginTime;
      let endTime;
      if (this.beginDate !== null && this.endData !== null) {
        beginTime = this.beginDate;
        endTime = this.endData;
      } else {
        beginTime = dayjs()
          .subtract(1, "day")
          .format("YYYY-MM-DD");
        endTime = dayjs().format("YYYY-MM-DD");
      }
      let data = {
        current: 1,
        size: 10,
        cheliangpaizhao: this.valueName,
        shiyongxingzhi: this.valueType,
        beginTime: beginTime,
        endTime: endTime,
      };
      getPaiMingList(data).then((res) => {
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
        let multiHeader, tHeader, filterVal, merges, filename;
        multiHeader = [
          "排序",
          "企业名称",
          "统计时间段",
          "车辆牌照",
          "营运类型",
          "车牌颜色",
          "超速报警次数",
          "疲劳驾驶报警次数",
          "夜间禁行报警次数",
          "异常报警次数",
          "北斗报警总数",
          "主动安全报警排名",
          "接打电话",
          "抽烟",
          "分神",
          "疲劳驾驶",
          "报警总数",
        ];
        // tHeader = [
        //   "",
        //   "",
        //   "",
        //   "",
        //   "",
        //   "",
        //   "超速报警次数",
        //   "疲劳驾驶报警次数",
        //   "夜间禁行报警次数",
        //   "异常报警次数",
        //   "",
        //   "接打电话",
        //   "抽烟",
        //   "分神",
        //   "疲劳驾驶",
        //   "",
        //   "",
        // ];
        filterVal = [
          "index",
          "company",
          "date",
          "cheliangpaizhao",
          "shiyongxingzhi",
          "chepaiyanse",
          "chaosu",
          "pilao",
          "yejian",
          "yichang",
          "beidoubaojingcishu",
          "dmsdadianhua",
          "dmschouyan",
          "dmsfenshen",
          "dmspilao",
          "zhudongbaojingcishu",
          "baojingcishu",
        ];
        merges = [
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
        ];
        const data = this.formatJson(filterVal, list);
        export_json_to_excel({
          multiHeader,
          header: multiHeader,
          data,
          merges,
          filename: "车辆报警排名",
        });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.daystatis {
  padding: 1.5rem;
  background-color: #f2f9ff;
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
      padding: 0 0.7rem;
      .daystatis-search {
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
.ivu-input-large {
  font-size: 14px;
}
</style>
