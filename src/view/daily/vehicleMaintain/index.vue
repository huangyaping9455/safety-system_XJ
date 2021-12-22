<template>
  <div class="daystatis">
    <div class="daystatis-btn">
      <div class="daystatis-search">
        <i-button type="primary" @click="addMain">新增</i-button>
        <span>企业名称 : </span>
        <i-input
          size="large"
          clearable
          v-model="deptNames"
          placeholder="请输入企业名称"
        ></i-input>
        <span style="margin-left:0.8rem;">车辆牌照 : </span>
        <i-input
          size="large"
          clearable
          v-model="cheliangpaizhaos"
          placeholder="请输入车辆牌照"
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
        <template slot-scope="{ row }" slot="cheliangpaizhao">
          <el-tooltip
            class="item"
            effect="dark"
            :content="row.shuoming"
            placement="top"
            v-if="row.shuoming !== ''"
          >
            <img
              v-if="$route.query.tixingleixing === '预警'"
              src="@/assets/new_icon/alarm-y.png"
              style="color:red;font-size:1.6vmin;cursor: pointer;width:20px;margin-bottom:6px;"
            />
            <img
              v-else
              src="@/assets/new_icon/overdue-y.png"
              style="color:red;font-size:1.6vmin;cursor: pointer;width:20px;margin-bottom:6px;"
            />
          </el-tooltip>
          <span>{{ row.cheliangpaizhao }}</span>
        </template>
        <template slot-scope="{ row }" slot="action">
          <el-button type="text" @click="updateMain(row)">
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
    </div>
    <add-maintain
      :mainmsgList="mainmsgList"
      :typee="typee"
      ref="addmain"
    ></add-maintain>
  </div>
</template>

<script>
import dayjs from "dayjs";
import { weihuList } from "@/api/daily/vehicle";
import AddMaintain from "./addMaintain.vue";
export default {
  components: { AddMaintain },
  data() {
    return {
      current: 1,
      size: 20,
      total: 3,
      loading: false,
      caleHeight: 700,
      deptNames: "",
      cheliangpaizhaos: "",
      typee: "新增",
      mainmsgList: {},
      columns: [
        {
          title: "企业名称",
          key: "deptName",
          tooltip: true,
          align: "center",
        },
        {
          title: "车辆牌照",
          slot: "cheliangpaizhao",
          align: "center",
          width: 150,
        },
        {
          title: "车牌颜色",
          key: "chepaiyanse",
          align: "center",
          tooltip: true,
          width: 120,
        },
        {
          title: "车辆维护单位",
          key: "cheliangweihudanwei",
          align: "center",
          tooltip: true,
        },
        {
          title: "维护类别",
          key: "weihuleibie",
          align: "center",
          tooltip: true,
        },
        {
          title: "是否合格",
          key: "shifouhege",
          align: "center",
          tooltip: true,
          width: 120,
        },
        {
          title: "操作",
          slot: "action",
          align: "center",
          width: 80,
        },
      ],
      data: [],
    };
  },
  created() {
    this.getweihuList();
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
    getweihuList() {
      this.loading = true;
      let data = {
        current: this.current,
        size: this.size,
        deptName: this.deptNames,
        cheliangpaizhao: this.cheliangpaizhaos,
        ids: this.$route.query.ids ? this.$route.query.ids : "",
        tixingleixing: this.$route.query.tixingleixing
          ? this.$route.query.tixingleixing
          : "",
        tixingxiangqingid: this.$route.query.tixingxiangqingid
          ? this.$route.query.tixingxiangqingid
          : "",
        tongjiriqi: this.$route.query.tongjiriqi
          ? this.$route.query.tongjiriqi
          : "",
      };
      weihuList(data)
        .then((res) => {
          this.data = res.data.data.records;
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
      this.getweihuList();
    },
    // 每页显示条数改变
    handleSizeChange(val) {
      this.size = val;
      this.getweihuList();
    },
    // 当前页改变
    handleCurrentChange(val) {
      this.current = val;
      this.getweihuList();
    },
    // 刷新
    refresh() {
      this.current = 1;
      this.getweihuList();
    },
    // 新增
    addMain() {
      this.mainmsgList = {};
      this.typee = "新增";
      this.$refs.addmain.mainVisible = true;
      this.$refs.addmain.updateLoading = false;
    },
    // 修改
    updateMain(row) {
      this.mainmsgList = row;
      this.typee = "修改";
      this.$refs.addmain.mainVisible = true;
      this.$refs.addmain.updateLoading = false;
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
    padding-right: 10px;
    .daystatis-search {
      display: flex;
      span {
        line-height: 4rem;
        font-size: 14px;
        font-weight: 600;
        margin-right: 5px;
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
