<template>
  <div class="daystatis">
    <div class="daystatis-btn">
      <div class="daystatis-search">
        <!-- <i-button type="primary">新增</i-button> -->
        <span>车辆 : </span>
        <i-input
          size="large"
          clearable
          v-model="vehId"
          placeholder="请输入车辆..."
        ></i-input>
        <span style="margin-left:0.8rem;">检查人员 : </span>
        <i-input
          size="large"
          clearable
          v-model="checkJcry"
          placeholder="请输入检查人员..."
        ></i-input>
        <span style="margin-left:0.8rem;">检查日期 : </span>
        <i-date
          format="yyyy-MM-dd"
          type="date"
          size="large"
          placement="bottom-end"
          v-model="checkJcrq"
          placeholder="请输入检查日期"
        ></i-date>
        <span style="margin-left:0.8rem;">复检人员 : </span>
        <i-input
          size="large"
          clearable
          v-model="checkFjry"
          placeholder="请输入复检人员..."
        ></i-input>
        <span style="margin-left:0.8rem;">复检日期 : </span>
        <i-date
          format="yyyy-MM-dd"
          type="date"
          size="large"
          placement="bottom-end"
          v-model="checkFjrq"
          placeholder="请输入复检日期"
        ></i-date>
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
        <template slot="operation" slot-scope="{ row }">
          <el-button type="text" @click="views(row)">
            查看
          </el-button>
          <el-button type="text" @click="updates(row)" v-if="row.status == 4">
            处理
          </el-button>
        </template>
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
      <views ref="views" :typee="typee"></views>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
import { carcheckList } from "@/api/daily/trouble";
import Views from "./views";
export default {
  components: { Views },
  data() {
    return {
      current: 1,
      size: 20,
      total: 3,
      loading: false,
      caleHeight: 700,
      beginTime: dayjs().format("YYYY-MM-DD"),
      endTime: dayjs().format("YYYY-MM-DD"),
      dialogVisible: false,
      vehId: "",
      checkJcry: "",
      checkJcrq: "",
      checkFjry: "",
      checkFjrq: "",
      columns: [
        {
          title: "车辆",
          key: "vehNo",
          tooltip: true,
          align: "center",
          width: 120,
        },
        {
          title: "天气情况",
          key: "weather",
          align: "center",
          width: 100,
          tooltip: true,
        },
        {
          title: "检察人员",
          key: "checkJcry",
          align: "center",
          tooltip: true,
          width: 120,
        },
        {
          title: "检查结果",
          key: "checkJcjg",
          align: "center",
          tooltip: true,
        },
        {
          title: "检查日期",
          key: "checkJcrq",
          align: "center",
          tooltip: true,
        },
        {
          title: "复检人员",
          key: "checkFjry",
          align: "center",
          tooltip: true,
          width: 120,
        },
        {
          title: "复检结果",
          key: "checkFjjg",
          align: "center",
          width: 200,
          tooltip: true,
        },
        {
          title: "复检日期",
          key: "checkFjrq",
          align: "center",
          tooltip: true,
        },
        {
          title: "数据状态",
          key: "state",
          align: "center",
          tooltip: true,
        },
        {
          title: "操作",
          slot: "operation",
          fixed: "right",
          align: "center",
          width: 110,
        },
      ],
      data: [],
      typee: "查看",
    };
  },
  created() {
    this.carcheckList();
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
    carcheckList() {
      this.loading = true;
      let data = {
        pageNum: this.current,
        pageSize: this.size,
        vehId: this.vehId,
        comId: this.$store.getters.deptId,
        checkJcry: this.checkJcry,
        checkJcrq:
          this.checkJcrq == ""
            ? this.checkJcrq
            : dayjs(this.checkJcrq).format("YYYY-MM-DD"),
        checkFjry: this.checkFjry,
        checkFjrq:
          this.checkFjrq == ""
            ? this.checkFjrq
            : dayjs(this.checkFjrq).format("YYYY-MM-DD"),
      };
      carcheckList(data)
        .then((res) => {
          this.data = res.data.rows.map((el) => {
            if (el.status == 1) {
              el.state = "出车前安检";
            } else if (el.status == 2) {
              el.state = "行车中安检";
            } else if (el.status == 3) {
              el.state = "收车后安检";
            } else if (el.status == 4) {
              el.state = "复检";
            } else if (el.status == 5) {
              el.state = "整改";
            } else if (el.status == 6) {
              el.state = "整改完成";
            } else {
              el.state = "完结";
            }
            return el;
          });
          this.total = res.data.total;
          this.loading = false;
        })
        .catch((rej) => {
          this.loading = false;
          this.$message("暂无数据···");
        });
    },
    // 搜索
    statisSearch() {
      this.carcheckList();
    },
    // 每页显示条数改变
    handleSizeChange(val) {
      this.size = val;
      this.carcheckList();
    },
    // 当前页改变
    handleCurrentChange(val) {
      this.current = val;
      this.carcheckList();
    },
    // 刷新
    refresh() {
      this.current = 1;
      this.carcheckList();
    },
    // 查看
    views(row) {
      this.$refs.views.getlistByCheck(row.checkId, row.status);
      this.$refs.views.listByCheckIdMsg(row.checkId);
      this.typee = "查看";
      this.$refs.views.editableTabsValue = "0";
      this.$refs.views.hidVisible = true;
    },
    // 编辑
    updates(row) {
      this.$refs.views.getlistByCheck(row.checkId, row.status);
      this.$refs.views.listByCheckIdMsg(row.checkId);
      this.typee = "编辑";
      this.$refs.views.hidVisible = true;
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
    background: #fff;
    padding: 0 10px;
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
