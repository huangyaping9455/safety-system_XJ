<template>
  <div class="vehicle">
    <div class="vehicle-body">
      <div class="vehicle-main">
        <div class="vehicle-main-head">
          <div class="vehicle-main-head-left">
            <div class="vehicle-main-head-text">
              <span>驾驶员姓名：</span>
              <el-input
                placeholder="请输入驾驶员姓名"
                autosize
                v-model="jiashiyuanxingming"
                clearable
              >
              </el-input>
            </div>
            <div class="vehicle-main-head-text">
              <el-button
                type="primary"
                @click="refresh"
                size="small"
                icon="el-icon-search"
                round
                >搜索</el-button
              >
            </div>
          </div>
          <div class="vehicle-main-head-right">
            <el-button
              type="primary"
              icon="el-icon-download"
              size="small"
              round
              @click="befoExport"
              :loading="exportLoading"
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
                @click="refresh"
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
            prop="deptName"
            label="企业名称"
            align="center"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="jiashiyuanxingming"
            label="驾驶员姓名"
            align="center"
            width="100"
          >
          </el-table-column>
          <el-table-column
            prop="xingbie"
            label="性别"
            align="center"
            width="100"
          >
          </el-table-column>
          <el-table-column
            prop="shenfenzhenghao"
            label="身份证号"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="shoujihaoma"
            label="手机号码"
            align="center"
            width="110"
          >
          </el-table-column>
          <el-table-column
            prop="createtime"
            label="创建时间"
            align="center"
            width="170"
          >
          </el-table-column>
          <el-table-column fixed="right" label="操作" align="center" width="70">
            <template slot-scope="scope">
              <el-button
                @click="handleClick(scope.row)"
                type="text"
                size="small"
                >查看</el-button
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
        <el-dialog
          title="查看"
          :visible.sync="centerDialogVisible"
          width="80%"
          center
        >
          <div class="dialog-text">
            <div class="dialog-body">
              <span>企业名称</span>
              <el-input
                autosize
                v-model="rowtableList.deptName"
                :disabled="true"
              >
              </el-input>
            </div>
            <div class="dialog-body">
              <span>驾驶员姓名</span>
              <el-input
                autosize
                v-model="rowtableList.jiashiyuanxingming"
                :disabled="true"
              >
              </el-input>
            </div>
            <div class="dialog-body">
              <span>性别</span>
              <el-input
                autosize
                v-model="rowtableList.xingbie"
                :disabled="true"
              >
              </el-input>
            </div>
            <div class="dialog-body">
              <span>身份证号</span>
              <el-input
                autosize
                v-model="rowtableList.shenfenzhenghao"
                :disabled="true"
              >
              </el-input>
            </div>
            <div class="dialog-body">
              <span>手机号码</span>
              <el-input
                autosize
                v-model="rowtableList.shoujihaoma"
                :disabled="true"
              >
              </el-input>
            </div>
            <div class="dialog-body">
              <span>创建时间</span>
              <el-input
                autosize
                v-model="rowtableList.createtime"
                :disabled="true"
              >
              </el-input>
            </div>
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import { driverList } from "@/api/daily/vehicle";
import { export_json_to_excel } from "../../../const/Export2Excel";
export default {
  data() {
    return {
      current: 1,
      size: 20,
      total: 20,
      driverTableHeight: 700,
      deptName: "",
      plate: "",
      zhongduanid: "",
      caozuoshijian: "",
      tabloading: false,
      DriverTableData: [],
      jiashiyuanxingming: "",
      centerDialogVisible: false,
      rowtableList: "",
      exportLoading: false,
    };
  },
  mounted() {
    this.getDriverList();
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
  methods: {
    handleSizeChange(tal) {
      this.size = tal;
      this.getDriverList();
    },
    handleCurrentChange(tal) {
      this.current = tal;
      this.getDriverList();
    },
    getDriverList() {
      this.tabloading = true;
      let data = {
        current: this.current,
        size: this.size,
        jiashiyuanxingming: this.jiashiyuanxingming,
      };
      driverList(data).then((res) => {
        if (res.data.code === 200) {
          this.tabloading = false;
          this.DriverTableData = res.data.data.records;
          this.total = res.data.data.total;
        } else {
          this.tabloading = false;
          this.$message.error("出错了···");
          this.DriverTableData = [];
        }
      });
    },
    refresh() {
      this.current = 1;
      this.getDriverList();
    },
    handleClick(row, index) {
      this.centerDialogVisible = true;
      this.rowtableList = row;
    },
    // 导出表格
    befoExport() {
      this.exportLoading = true;
      let data = {
        current: 0,
        size: 0,
        jiashiyuanxingming: this.jiashiyuanxingming,
      };
      driverList(data).then((res) => {
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
          "驾驶员姓名",
          "性别",
          "身份证号",
          "手机号码",
          "创建时间",
        ];
        const filterVal = [
          "deptName",
          "jiashiyuanxingming",
          "xingbie",
          "shenfenzhenghao",
          "shoujihaoma",
          "createtime",
        ];
        const merges = ["A1:A2", "B1:B2", "C1:C2", "D1:D2", "E1:E2", "F1:F2"];
        // const list = this.goodsItems;
        const data = this.formatJson(filterVal, list);
        export_json_to_excel({
          multiHeader2,
          header: multiHeader2,
          data,
          filename: "驾驶员信息",
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
          .vehicle-main-head-text {
            display: flex;
            align-items: center;
            margin-right: 1rem;
            span {
              font-weight: 600;
            }
            .el-input {
              width: 11.5rem;
            }
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
      .el-dialog {
        .dialog-text {
          display: flex;
          flex-wrap: wrap;
          // flex-direction: column;
          justify-content: space-between;
          .dialog-body {
            display: flex;
            width: 50%;
            margin-bottom: 1.5rem;
            span {
              font-weight: 600;
              width: 20%;
              text-align: center;
              margin-top: 0.7rem;
            }
            .el-input {
              width: 80%;
            }
          }
        }
        .el-dialog__title {
          font-weight: 600;
          font-size: 20px;
        }
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
