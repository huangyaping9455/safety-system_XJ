<template>
  <div class="daystatis">
    <div class="daystatis-btn">
      <div class="daystatis-search">
        <i-button type="primary" @click="adds">新增</i-button>
        <span>隐患名称 : </span>
        <i-input
          size="large"
          clearable
          v-model="troubleMc"
          placeholder="请输入隐患名称..."
        ></i-input>
        <span style="margin-left:0.8rem;">隐患来源 : </span>
        <i-input
          size="large"
          clearable
          v-model="troubleLy"
          placeholder="请输入隐患来源..."
        ></i-input>
        <span style="margin-left:0.8rem;">隐患描述 : </span>
        <i-input
          size="large"
          clearable
          v-model="troubleYhms"
          placeholder="请输入隐患描述..."
        ></i-input>
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
          <el-button type="text" @click="updates(row)">
            编辑
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
      <add ref="add"></add>
      <views ref="views"></views>
      <update ref="update"></update>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
import { getTroubleList } from "@/api/daily/trouble";
import add from "./add";
import views from "./views";
import Update from "./update.vue";
export default {
  components: { add, views, Update },
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
      troubleMc: "",
      troubleLy: "",
      troubleYhms: "",
      columns: [
        {
          title: "隐患等级",
          key: "dengji",
          tooltip: true,
          align: "center",
          width: 80,
        },
        {
          title: "隐患编号",
          key: "troubleBh",
          align: "center",
          width: 120,
        },
        {
          title: "隐患名称",
          key: "troubleMc",
          align: "center",
          tooltip: true,
        },
        {
          title: "隐患来源",
          key: "troubleLy",
          align: "center",
          tooltip: true,
        },
        {
          title: "隐患描述",
          key: "troubleYhms",
          align: "center",
          tooltip: true,
          width: 230,
        },
        {
          title: "发现日期",
          key: "createTime",
          align: "center",
          tooltip: true,
        },
        {
          title: "发现人",
          key: "troubleFxr",
          align: "center",
          width: 100,
        },
        {
          title: "限期整改时间",
          key: "troubleXqzgsj",
          align: "center",
          tooltip: true,
        },
        {
          title: "整改进度",
          key: "jindu",
          align: "center",
          tooltip: true,
        },
        {
          title: "整改完成日期",
          key: "troubleZgwcrq",
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
    };
  },
  created() {
    this.getTroubleList();
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
    getTroubleList() {
      this.loading = true;
      let data = {
        pageNum: this.current,
        pageSize: this.size,
        troubleMc: this.troubleMc,
        troubleLy: this.troubleLy,
        troubleYhms: this.troubleYhms,
        troubleZgjd: this.$route.query.zhenggaijd
          ? this.$route.query.zhenggaijd
          : "",
        comId: this.$store.getters.deptId,
      };
      getTroubleList(data)
        .then((res) => {
          this.data = res.data.rows.map((el) => {
            if (el.troubleDj == 1) {
              el.dengji = "一级";
            } else if (el.troubleDj == 2) {
              el.dengji = "二级";
            } else if (el.troubleDj == 3) {
              el.dengji = "三级";
            } else {
              el.dengji = "四级";
            }
            if (el.troubleZgjd == 1) {
              el.jindu = "待整改";
            } else if (el.troubleZgjd == 2) {
              el.jindu = "整改中";
            } else if (el.troubleZgjd == 3) {
              el.jindu = "整改完成";
            } else {
              el.jindu = "整改延期";
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
      this.getTroubleList();
    },
    // 每页显示条数改变
    handleSizeChange(val) {
      this.size = val;
      this.getTroubleList();
    },
    // 当前页改变
    handleCurrentChange(val) {
      this.current = val;
      this.getTroubleList();
    },
    // 刷新
    refresh() {
      this.current = 1;
      this.getTroubleList();
    },
    // 新增
    adds() {
      this.$refs.add.addVisible = true;
      this.$refs.add.form = {
        troubleMc: "",
        troubleLy: "",
        troubleDj: "",
        troubleFxsj: "",
        troubleFxr: "",
        troubleZrr: "",
        troubleXqzgsj: "",
        troubleYhms: "",
        troubleZgcs: "",
      };
    },
    // 查看
    views(row) {
      this.$refs.views.detailList = {};
      this.$refs.views.troubledetail(row.troubleId);
      this.$refs.views.viewVisible = true;
    },
    // 编辑
    updates(row) {
      this.$refs.update.updateList = {};
      this.$refs.update.troubledetail(row.troubleId);
      this.$refs.update.updateVisible = true;
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
    padding: 0 0.7rem 0 0;
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
