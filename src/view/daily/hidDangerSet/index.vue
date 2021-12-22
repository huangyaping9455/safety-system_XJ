<template>
  <div class="daystatis">
    <div class="daystatis-btn">
      <div class="daystatis-search">
        <i-button type="primary" @click="add()">新增</i-button>
        <span>制度名称 : </span>
        <i-input
          size="large"
          clearable
          v-model="ruleName"
          placeholder="请输入制度名称..."
        ></i-input>
        <span style="margin-left:0.8rem;">制度来源 : </span>
        <i-input
          size="large"
          clearable
          v-model="ruleSource"
          placeholder="请输入制度来源..."
        ></i-input>
        <span style="margin-left:0.8rem;">隐患等级 : </span>
        <i-select
          size="large"
          placeholder="请选择隐患等级..."
          v-model="ruleLevel"
          clearable
        >
          <i-option label="一级" value="1"></i-option>
          <i-option label="二级" value="2"></i-option>
          <i-option label="三级" value="3"></i-option>
          <i-option label="四级" value="4"></i-option>
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
        <template slot="operation" slot-scope="{ row }">
          <el-button type="text" @click="update(row)">编辑</el-button>
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
      <add ref="addset"></add>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
import { getTroubleSetList } from "@/api/daily/trouble";
import Add from "./add.vue";
export default {
  components: { Add },
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
      ruleName: "",
      ruleSource: "",
      ruleLevel: "",
      columns: [
        {
          title: "制度名称",
          key: "ruleName",
          tooltip: true,
          align: "center",
          width: 110,
        },
        {
          title: "制度来源",
          key: "ruleSource",
          align: "center",
          width: 100,
          tooltip: true,
        },
        {
          title: "制度说明",
          key: "ruleText",
          align: "center",
          tooltip: true,
        },
        {
          title: "隐患等级",
          key: "dengji",
          align: "center",
          tooltip: true,
          width: 90,
        },
        {
          title: "开始阈值",
          key: "ruleStartnum",
          align: "center",
          tooltip: true,
        },
        {
          title: "结束阈值",
          key: "ruleEndnum",
          align: "center",
          tooltip: true,
        },
        {
          title: "判断符号",
          key: "fuhao",
          align: "center",
          width: 100,
        },
        {
          title: "判断单位",
          key: "danwei",
          align: "center",
          tooltip: true,
        },
        {
          title: "操作",
          slot: "operation",
          fixed: "right",
          align: "center",
          width: 90,
        },
      ],
      data: [],
    };
  },
  created() {
    this.getTroubleSetList();
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
    getTroubleSetList() {
      this.loading = true;
      let data = {
        current: this.current,
        size: this.size,
        ruleName: this.ruleName,
        ruleSource: this.ruleSource,
        ruleLevel: this.ruleLevel,
      };
      getTroubleSetList(data)
        .then((res) => {
          this.data = res.data.rows.map((el) => {
            if (el.ruleLevel == 1) {
              el.dengji = "一级";
            } else if (el.ruleLevel == 2) {
              el.dengji = "二级";
            } else if (el.ruleLevel == 3) {
              el.dengji = "三级";
            } else {
              el.dengji = "四级";
            }
            if (el.ruleSymbol == 1) {
              el.fuhao = "小于";
            } else if (el.ruleSymbol == 2) {
              el.fuhao = "小于等于";
            } else if (el.ruleSymbol == 3) {
              el.fuhao = "大于";
            } else if (el.ruleSymbol == 4) {
              el.fuhao = "大于等于";
            } else {
              el.fuhao = "至";
            }
            if (el.ruleUnit == 1) {
              el.danwei = "日";
            } else {
              el.danwei = "月";
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
      this.getTroubleSetList();
    },
    // 每页显示条数改变
    handleSizeChange(val) {
      this.size = val;
      this.getTroubleSetList();
    },
    // 当前页改变
    handleCurrentChange(val) {
      this.current = val;
      this.getTroubleSetList();
    },
    // 刷新
    refresh() {
      this.current = 1;
      this.getTroubleSetList();
    },
    // 新增
    add() {
      this.$refs.addset.isadd = true;
      this.$refs.addset.form = {};
      this.$refs.addset.addVisible = true;
    },
    // 编辑
    update(row) {
      this.$refs.addset.isadd = false;
      this.$refs.addset.form = {};
      this.$refs.addset.troubleruledetail(row.ruleId);
      this.$refs.addset.addVisible = true;
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
