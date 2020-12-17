<template>
  <div class="checkpost">
    <!-- <div class="checkpost-head">
      <span>通知公告</span>
    </div> -->
    <div class="checkpost-main">
      <div class="checkpost-search">
        <div class="checkpost-search-left">
          <span>统计日期: </span>
          <el-date-picker
            style="height:2.9rem;width:11rem;"
            v-model="beginDate"
            type="date"
            :picker-options="pickerOptions"
            value-format="yyyy-MM-dd"
            placeholder="选择开始日期"
          ></el-date-picker>
          <span>至</span>
          <el-date-picker
            style="height:2.9rem;width:11rem;margin-left:0.3rem;"
            v-model="endDate"
            type="date"
            :picker-options="pickerOptions"
            value-format="yyyy-MM-dd"
            placeholder="选择结束日期"
          ></el-date-picker>
          <span style="margin-left:1rem;">主题名称:</span>
          <i-input
            v-model="zhutimingcheng"
            size="large"
            placeholder="请输入主题名称..."
            style="width: 10rem;"
          ></i-input>
          <i-button
            type="primary"
            shape="circle"
            icon="ios-search"
            @click="noticeSearch"
            style="margin-left:0.7rem;"
            >搜索</i-button
          >
        </div>
        <div class="checkpost-search-right">
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
      <i-table
        :columns="columns"
        border
        :height="caleHeight"
        v-loading="loading"
        :data="data"
        ref="table"
      ></i-table>
      <el-pagination
        style="height:3rem;background: #ffffff;display: flex;align-items: center;justify-content: flex-end;padding:0 1rem;"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="current"
        :page-sizes="[10, 50, 100, 200]"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { noticeList } from "@/api/daily/notice";
export default {
  data() {
    return {
      current: 1,
      size: 10,
      total: 10,
      loading: false,
      zhutimingcheng: "",
      beginDate: "",
      endDate: "",
      caleHeight: 705,
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },
      columns: [
        {
          title: "企业名称",
          key: "deptName",
          align: "center",
        },
        {
          title: "主题名称",
          key: "zhutimingcheng",
          align: "center",
        },
        {
          title: "发起单位",
          key: "fasongdanwei",
          align: "center",
        },
        {
          title: "发起时间",
          key: "faqishijian",
          align: "center",
        },
        {
          title: "回复有效期",
          key: "huifuyouxiaoqi",
          align: "center",
        },
        {
          title: "状态",
          key: "zhuangtai",
          align: "center",
        },
      ],
      data: [],
    };
  },
  mounted() {
    this.noticeList();
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
    // 获取列表信息
    noticeList() {
      let data = {
        current: this.current,
        size: this.size,
        zhutimingcheng: this.zhutimingcheng,
        beginTime: this.beginDate,
        endTime: this.endDate,
        type: 1,
      };
      noticeList(data).then((res) => {
        this.data = res.data.data.records;
        this.total = res.data.data.total;
      });
    },
    //当前显示总页数改变
    handleSizeChange(val) {
      this.size = val;
      this.noticeList();
    },
    // 当前页改变
    handleCurrentChange(val) {
      this.current = val;
      this.noticeList();
    },
    // 刷新
    noticeSearch() {
      this.noticeList();
    },
    // 刷新
    refresh() {
      this.current = 1;
      this.noticeList();
    },
    // 导出
    exportData() {
      this.$refs.table.exportCsv({
        filename: "安全查岗",
        original: false,
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.checkpost {
  padding: 1.5rem;
  background-color: #f2f9ff;
  height: 100%;
  // .checkpost-head {
  //   height: 4rem;
  //   line-height: 4rem;
  //   font-size: 18px;
  //   color: #ffffff;
  //   text-align: center;
  //   background: url(/img/popu-head.33d4cda5.png) no-repeat top center;
  //   background-size: 100% 100%;
  // }
  .checkpost-main {
    padding: 0.2rem 1rem;
    background-color: white;
    .checkpost-search {
      display: flex;
      background: #ffffff;
      height: 3.5rem;
      align-items: center;
      justify-content: space-between;
      padding: 0 0.7rem;
      .checkpost-search-left {
        display: flex;
        align-items: center;
        span {
          font-size: 14px;
          margin-left: 0.3rem;
          font-weight: 600;
        }
      }
    }
  }
}
</style>
<style>
.checkpost .ivu-table th {
  background-color: #ecf8ff;
  color: #01a0ff;
}
.ivu-input-large {
  font-size: 14px;
}
</style>
