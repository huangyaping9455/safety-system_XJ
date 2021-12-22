<template>
  <div class="daystatis">
    <div class="daystatis-btn">
      <div class="daystatis-search">
        <span>姓名 : </span>
        <i-input
          size="large"
          clearable
          v-model="usernames"
          placeholder="请输入姓名..."
        ></i-input>
        <span style="margin-left:0.8rem;">学习月份 : </span>
        <i-date
          format="MM"
          type="month"
          size="large"
          placement="bottom-end"
          v-model="lmonths"
          placeholder="请选择学习月份"
        ></i-date>
        <span style="margin-left:0.8rem;">完成情况 : </span>
        <i-select
          size="large"
          placeholder="请选择完成情况..."
          v-model="statusshow"
          clearable
        >
          <i-option label="全部" value=""></i-option>
          <i-option label="达标" value="达标"></i-option>
          <i-option label="未达标" value="未达标"></i-option>
          <i-option label="未学习" value="未学习"></i-option>
        </i-select>
        <span style="margin-left:0.8rem;">学习方式 : </span>
        <i-select
          size="large"
          placeholder="请选择学习方式..."
          v-model="learnStudys"
          clearable
        >
          <i-option label="全部" value=""></i-option>
          <i-option label="线上学习" value="线上学习"></i-option>
          <i-option label="线下学习" value="线下学习"></i-option>
        </i-select>
        <i-button type="primary" @click="statisSearch">搜索</i-button>
      </div>
      <div>
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
      >
      </i-table>
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
import { selectPersonLearnInfoAll } from "@/api/daily/education";
export default {
  data() {
    return {
      current: 1,
      size: 20,
      total: 3,
      loading: false,
      caleHeight: 700,
      dialogVisible: false,
      usernames: "",
      lmonths: dayjs().format("MM"),
      statusshow: "",
      learnStudys: "",
      columns: [
        {
          title: "姓名",
          key: "username",
          tooltip: true,
          align: "center",
          width: 120,
        },
        {
          title: "身份证号",
          key: "usercard",
          align: "center",
        },
        {
          title: "手机号",
          key: "userphone",
          align: "center",
          tooltip: true,
          width: 120,
        },
        {
          title: "学习方式",
          key: "learnStudy",
          align: "center",
          tooltip: true,
        },
        {
          title: "学习月份",
          key: "lmonth",
          align: "center",
          tooltip: true,
        },
        {
          title: "学习时长(分钟)",
          key: "learntime",
          align: "center",
          tooltip: true,
        },
        {
          title: "学习平台",
          key: "luser",
          align: "center",
          tooltip: true,
        },
        {
          title: "完成情况",
          key: "statusshow",
          align: "center",
          tooltip: true,
        },
      ],
      data: [],
    };
  },
  created() {
    this.selectPersonLearnInfoAll();
  },
  mounted() {
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
  },
  methods: {
    // 获取列表
    selectPersonLearnInfoAll() {
      this.loading = true;
      let data = {
        current: this.current,
        size: this.size,
        lmonth: dayjs(this.lmonths).format("MM"),
        lyear: dayjs().format("YYYY"),
        user_name: this.usernames,
        status: this.statusshow,
        learnStudy: this.learnStudys,
      };
      selectPersonLearnInfoAll(data)
        .then((res) => {
          this.data = res.data.data.records.map((el) => {
            if (el.lmonth == "-1") {
              el.lmonth = "";
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
      this.selectPersonLearnInfoAll();
    },
    // 每页显示条数改变
    handleSizeChange(val) {
      this.size = val;
      this.selectPersonLearnInfoAll();
    },
    // 当前页改变
    handleCurrentChange(val) {
      this.current = val;
      this.selectPersonLearnInfoAll();
    },
    // 刷新
    refresh() {
      this.current = 1;
      this.selectPersonLearnInfoAll();
    },
  },
};
</script>

<style lang="scss" scoped>
.daystatis {
  height: calc(100% - 57px);
  padding: 1.5rem;
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
      .ivu-select,
      .ivu-date-picker {
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
  background-color: #ecf8ff;
  color: #01a0ff;
}
.ivu-input-large {
  font-size: 14px;
}
</style>
