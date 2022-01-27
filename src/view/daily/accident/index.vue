<template>
  <div class="vehicle">
    <div class="vehicle-body">
      <div class="vehicle-main">
        <div class="vehicle-main-head">
          <div class="vehicle-main-head-left">
            <el-button
              type="primary"
              icon="el-icon-plus"
              size="small"
              @click="addAccident"
              >新增</el-button
            >
            <span>车牌号 : </span>
            <i-input
              size="large"
              clearable
              v-model="cheliangpaizhao"
              placeholder="请输入车牌号..."
            ></i-input>
            <span>事故时间 : </span>
            <!-- beginTime -->
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="beginTime"
              value-format="yyyy-MM-dd"
              format="yyyy-MM-dd"
            ></el-date-picker>
            <el-button
              type="primary"
              icon="el-icon-search"
              size="small"
              @click="getAccidentList"
              style="margin-left:10px;"
              >搜索</el-button
            >
          </div>
          <div class="vehicle-main-head-right">
            <el-button
              type="primary"
              size="small"
              icon="el-icon-upload"
              @click="exportData"
              :loading="exportLoading"
              :disabled="DriverTableData.length === 0"
              >导出</el-button
            >
            <el-tooltip
              class="item"
              effect="dark"
              content="刷新"
              placement="bottom"
            >
              <el-button
                type="primary"
                icon="el-icon-refresh"
                circle
                size="small"
                @click="getAccidentList()"
              ></el-button>
            </el-tooltip>
          </div>
        </div>
        <el-table
          :data="DriverTableData"
          :height="driverTableHeight"
          border
          style="width: 100%"
          ref="drivertable"
          v-loading="tabloading"
        >
          <el-table-column
            label="事故车辆"
            prop="chepaihao"
            align="center"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="jiashiyuan"
            label="驾驶员"
            align="center"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="shigufashengshijian"
            label="事故时间"
            align="center"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="shigufenlei"
            label="事故等级"
            align="center"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="shiguxingtai"
            label="事故性质"
            align="center"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="zerenfenxi"
            label="事故责任划分"
            align="center"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="shigufashengdidian"
            label="发生地点"
            align="center"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column align="center" label="操作" width="180">
            <template slot-scope="scope">
              <el-button @click="handleView(scope.row)" type="text" size="small"
                >查看</el-button
              >
              <el-button
                type="text"
                size="small"
                @click="handleUpdate(scope.row)"
                >编辑</el-button
              >
              <el-button
                type="text"
                size="small"
                @click="handleDelete(scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="current"
          :page-sizes="[20, 50, 100, 200]"
          :page-size="size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
        <add-accident ref="accidents" :typee="typee"></add-accident>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
import { getAccidentList, accidentDelete } from "@/api/daily/accident";
import addAccident from "./addAccident.vue";
import { export_json_to_excel } from "../../../const/Export2Excel";
export default {
  components: { addAccident },
  data() {
    return {
      current: 1,
      size: 20,
      total: 20,
      driverTableHeight: 700,
      tabloading: false,
      DriverTableData: [],
      typee: "新增",
      cheliangpaizhao: "",
      beginTime: dayjs().format("YYYY-MM-DD"),
      exportLoading: false,
    };
  },
  mounted() {
    this.$nextTick(function() {
      this.driverTableHeight =
        window.innerHeight - this.$refs.drivertable.$el.offsetTop - 100;
      // 监听窗口大小变化
      let self = this;
      window.onresize = function() {
        self.driverTableHeight =
          window.innerHeight - self.$refs.drivertable.$el.offsetTop - 100;
      };
    });
  },
  created() {
    this.getAccidentList();
  },
  methods: {
    getAccidentList() {
      this.tabloading = true;
      if (this.beginTime === null) {
        this.beginTime = "";
      }
      let data = {
        cheliangpaizhao: this.cheliangpaizhao,
        current: this.current,
        beginTime: this.beginTime,
        size: this.size,
      };
      getAccidentList(data).then((res) => {
        if (res.data.code == 200) {
          this.DriverTableData = res.data.data.records;
          this.total = res.data.data.total;
          this.tabloading = false;
        } else {
          this.$message.error(res.data.msg);
          this.DriverTableData = [];
          this.tabloading = false;
        }
      });
    },
    handleSizeChange(tal) {
      this.size = tal;
      this.getAccidentList();
    },
    handleCurrentChange(tal) {
      this.current = tal;
      this.getAccidentList();
    },
    // 新增
    addAccident() {
      this.typee = "新增";
      this.$refs.accidents.init();
      this.$refs.accidents.accidentVisible = true;
    },
    // 查看
    handleView(row) {
      this.typee = "查看";
      this.$refs.accidents.init();
      this.$refs.accidents.getAccidentDetail(row.id);
      this.$refs.accidents.disabledForm = true;
      this.$refs.accidents.updatedisable = true;
      this.$refs.accidents.accidentVisible = true;
    },
    // 编辑
    handleUpdate(row) {
      this.typee = "编辑";
      this.$refs.accidents.init();
      this.$refs.accidents.getAccidentDetail(row.id);
      this.$refs.accidents.accidentVisible = true;
    },
    // 删除
    handleDelete(row) {
      this.$confirm("此操作将永久删除该项, 是否继续?", "删除", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        accidentDelete(row.id).then((res) => {
          let type = res.data.code == 200 ? "success" : "error";
          this.$message({
            type: type,
            message: res.data.msg,
          });
          this.getAccidentList();
        });
      });
    },
    // 导出
    exportData() {
      this.exportLoading = true;
      if (this.beginTime === null) {
        this.beginTime = "";
      }
      let data = {
        cheliangpaizhao: this.cheliangpaizhao,
        current: 0,
        beginTime: this.beginTime,
        size: 0,
      };
      getAccidentList(data)
        .then((res) => {
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
            this.$message.error(res.data.msg);
            this.exportLoading = false;
          }
        })
        .catch(() => {
          this.exportLoading = false;
        });
    },
    //处理下载数据
    formatJson(filterVal, jsonData) {
      return jsonData.map((v) => filterVal.map((j) => v[j]));
    },
    export2Excel(list) {
      require.ensure([], () => {
        const multiHeader2 = [
          "事故车辆",
          "驾驶员",
          "事故时间",
          "事故等级",
          "事故性质",
          "事故责任划分",
          "发生地点",
        ];
        const filterVal = [
          "chepaihao",
          "jiashiyuan",
          "shigufashengshijian",
          "shigufenlei",
          "shiguxingtai",
          "zerenfenxi",
          "shigufashengdidian",
        ];
        const merges = [
          "A1:A2",
          "B1:B2",
          "C1:C2",
          "D1:D2",
          "E1:E2",
          "F1:F2",
          "G1:G2",
        ];
        const data = this.formatJson(filterVal, list);
        export_json_to_excel({
          multiHeader2,
          header: multiHeader2,
          data,
          filename: "车辆事故",
          merges,
        });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.vehicle {
  width: 100%;
  height: calc(100% - 57px);
  padding: 1.5rem;
  background-color: #f2f9ff;
  .vehicle-body {
    width: 100%;
    .vehicle-main {
      width: 100%;
      height: calc(100%);
      padding: 0.2rem 1rem;
      background-color: #fff;
      .vehicle-main-head {
        height: 3.5rem;
        width: 100%;
        display: flex;
        justify-content: space-between;
        .vehicle-main-head-left {
          display: flex;
          align-items: center;
          margin-right: 1rem;
          width: 100%;
          .ivu-input-wrapper,
          .ivu-select,
          .el-date-editor {
            width: 200px;
          }
          span {
            font-size: 14px;
            font-weight: 600;
            margin-left: 10px;
          }
        }
        .vehicle-main-head-right {
          display: flex;
          align-items: center;
        }
      }
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
}
</style>
<style>
.vehicle-main .el-table th {
  background-color: #ecf8ff;
  color: #01a0ff;
}
</style>
