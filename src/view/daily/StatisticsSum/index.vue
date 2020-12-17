<template>
  <div class="daystatis">
    <!-- <div class="daystatis-head">
      <span>报警统计汇总</span>
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
import { getAllSumList } from "@/api/daily/Statistics";
export default {
  data() {
    return {
      current: 1,
      size: 20,
      total: 20,
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
      loading: false,
      columns: [
        {
          title: " 企业名称",
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
          title: "车辆总数",
          key: "cheliangshu",
          align: "center",
          width: 90,
        },
        {
          title: "报警总数",
          key: "baojingcishu",
          align: "center",
          width: 90,
        },
        {
          title: "报警车辆数",
          key: "baojingcheliangshu",
          align: "center",
          width: 120,
        },
        {
          title: "单车报警比",
          key: "danchebaojingbi",
          align: "center",
          width: 120,
        },
        {
          title: "北斗报警总数",
          key: "beidoubaojingcishu",
          align: "center",
          width: 130,
        },
        {
          title: "北斗报警",
          key: "beidoubaojing",
          align: "center",
          children: [
            {
              title: "超速报警",
              key: "chaosu",
              align: "center",
              width: 90,
            },
            {
              title: "疲劳驾驶报警",
              key: "pilao",
              align: "center",
              width: 130,
            },
            {
              title: "异常报警",
              key: "yichang",
              align: "center",
              width: 90,
            },
            {
              title: "夜间禁行报警",
              key: "yejian",
              align: "center",
              width: 130,
            },
          ],
        },
        {
          title: "主动安全报警数",
          key: "zhudongbaojingcishu",
          align: "center",
          width: 130,
        },
        {
          title: "主动安全报警",
          key: "zhudong",
          align: "center",
          children: [
            {
              title: "接打电话",
              key: "dmsdadianhua",
              align: "center",
              width: 90,
            },
            {
              title: "抽烟",
              key: "dmschouyan",
              align: "center",
              width: 70,
            },
            {
              title: "分神",
              key: "dmsfenshen",
              align: "center",
              width: 70,
            },
            {
              title: "疲劳驾驶",
              key: "dmspilao",
              align: "center",
              width: 90,
            },
          ],
        },
      ],
      data: [
        // {
        //   deptName: "安徽省森储运输有限公司",
        //   date: "2020.8.20-2020.8.26",
        //   cheliang: "106",
        //   baojing: "106",
        //   cheliangshu: "100",
        //   baojingbi: "100",
        //   beidouzong: "100",
        //   chaosu: "20",
        //   pilao: "20",
        //   yejian: "20",
        //   yichang: "20",
        //   jinxing: "20",
        //   zhudong: "6",
        //   dianhua: "1",
        //   chouyan: "2",
        //   fenshen: "2",
        //   pilaojiashi: "2",
        // },
      ],
    };
  },
  mounted() {
    this.getAllSumList();
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
    getAllSumList() {
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
        beginTime: beginTime,
        endTime: endTime,
      };
      getAllSumList(data)
        .then((res) => {
          this.data = res.data.data.records;
          this.total = res.data.data.total;
          this.loading = false;
        })
        .catch((rej) => {
          this.loading = false;
        });
    },
    // 搜索
    statisSearch() {
      this.getAllSumList();
    },
    // 刷新
    refresh() {
      this.current = 1;
      this.getAllSumList();
    },
    // 每页显示条数改变
    handleSizeChange(val) {
      this.size = val;
      this.getAllSumList();
    },
    // 当前页改变
    handleCurrentChange(val) {
      this.current = val;
      this.getAllSumList();
    },
    // 导出
    exportData() {
      this.$refs.table.exportCsv({
        filename: "报警统计汇总",
        original: false,
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
.el-date-editor .el-range-separator {
  padding: 0;
}
.daystatis-content .ivu-table th {
  background-color: #ecf8ff;
  color: #01a0ff;
}
</style>
