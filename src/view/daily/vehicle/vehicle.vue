<template>
  <div class="vehicle">
    <div class="vehicle-body">
      <div class="vehicle-main">
        <div class="vehicle-main-head">
          <div class="vehicle-main-head-left">
            <div class="vehicle-main-head-text">
              <span>企业名称：</span>
              <el-input
                placeholder="请输入企业名称"
                autosize
                v-model="deptName"
                clearable
              >
              </el-input>
            </div>
            <div class="vehicle-main-head-text">
              <span>车辆牌照：</span>
              <el-input
                placeholder="请输入车辆牌照"
                autosize
                v-model="plate"
                clearable
              >
              </el-input>
            </div>
            <div class="vehicle-main-head-text">
              <span>操作时间：</span>
              <el-date-picker
                v-model="caozuoshijian"
                type="date"
                placeholder="选择操作时间"
                value-format="yyyy-MM-dd"
              >
              </el-date-picker>
            </div>
            <div class="vehicle-main-head-text">
              <span>终端id：</span>
              <el-input
                placeholder="请输入终端id"
                autosize
                v-model="zhongduanid"
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
          :data="VehicleTableData"
          :height="vehicleTableHeight"
          border
          style="width: 100%"
          ref="vehicletable"
          v-loading="tabloading"
        >
          <el-table-column
            prop="deptName"
            label="企业名称"
            align="center"
            :show-overflow-tooltip="true"
            width="220"
          >
          </el-table-column>
          <el-table-column
            prop="cheliangpaizhao"
            label="车辆牌照"
            align="center"
            width="100"
          >
          </el-table-column>
          <el-table-column
            prop="chepaiyanse"
            label="车牌颜色"
            align="center"
            width="80"
          >
          </el-table-column>
          <el-table-column
            prop="shiyongxingzhi"
            label="使用性质"
            align="center"
            width="140"
          >
          </el-table-column>
          <el-table-column
            prop="jiashiyuanxingming"
            label="驾驶员名称"
            align="center"
            width="100"
          >
          </el-table-column>
          <el-table-column
            prop="xinghao"
            label="车辆类型"
            align="center"
            width="120"
          >
          </el-table-column>
          <el-table-column
            prop="changpai"
            label="厂牌"
            align="center"
            width="120"
          >
          </el-table-column>
          <el-table-column
            prop="yunyingshangmingcheng"
            label="运营商"
            align="center"
            :show-overflow-tooltip="true"
            width="180"
          >
          </el-table-column>
          <el-table-column
            prop="zongduanid"
            label="终端id"
            align="center"
            width="130"
          >
          </el-table-column>
          <el-table-column
            prop="chejiahao"
            label="车架号"
            align="center"
            width="130"
          >
          </el-table-column>
          <el-table-column
            prop="yunyingshang"
            label="4G视频地址"
            align="center"
            :show-overflow-tooltip="true"
            width="200"
          >
          </el-table-column>
          <el-table-column
            prop="jiashiyuandianhua"
            label="驾驶员电话"
            align="center"
            width="130"
          >
          </el-table-column>
          <el-table-column
            prop="yayunyuanxingming"
            label="押运员"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="yayunyuandianhua"
            label="押运员电话"
            align="center"
            width="130"
          >
          </el-table-column>
          <el-table-column prop="chezhu" label="车主" align="center">
          </el-table-column>
          <el-table-column
            prop="chezhudianhua"
            label="车主电话"
            align="center"
            width="130"
          >
          </el-table-column>
          <el-table-column
            prop="caozuoshijian"
            label="创建时间"
            align="center"
            width="160"
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
          :title="rowtableList.cheliangpaizhao"
          :visible.sync="centerDialogVisible"
          width="45%"
          center
        >
          <vehicle-dialog :rowtableList="rowtableList"></vehicle-dialog>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import { vehicleList } from "@/api/daily/vehicle";
import { export_json_to_excel } from "@/const/Export2Excel";
import VehicleDialog from "./VehicleDialog.vue";
export default {
  components: { VehicleDialog },
  data() {
    return {
      current: 1,
      size: 20,
      total: 20,
      vehicleTableHeight: 700,
      deptName: "",
      plate: "",
      zhongduanid: "",
      caozuoshijian: "",
      tabloading: false,
      VehicleTableData: [],
      centerDialogVisible: false,
      rowtableList: "",
      exportLoading: false,
    };
  },
  mounted() {
    this.getVehicleList();
    this.$nextTick(function() {
      this.vehicleTableHeight =
        window.innerHeight - this.$refs.vehicletable.$el.offsetTop - 100;
      // 监听窗口大小变化
      let self = this;
      window.onresize = function() {
        self.vehicleTableHeight =
          window.innerHeight - self.$refs.vehicletable.$el.offsetTop - 100;
      };
    });
  },
  methods: {
    handleSizeChange(tal) {
      this.size = tal;
      this.getVehicleList();
    },
    handleCurrentChange(tal) {
      this.current = tal;
      this.getVehicleList();
    },
    getVehicleList() {
      this.tabloading = true;
      let data = {
        current: this.current,
        size: this.size,
        deptName: this.deptName,
        cheliangpaizhao: this.plate,
        caozuoshijian: this.caozuoshijian,
        zongduanid: this.zhongduanid,
      };
      vehicleList(data).then((res) => {
        if (res.data.code === 200) {
          this.tabloading = false;
          this.VehicleTableData = res.data.data.records;
          this.total = res.data.data.total;
        } else {
          this.tabloading = false;
          this.$message.error("出错了···");
          this.VehicleTableData = [];
        }
      });
    },
    refresh() {
      this.current = 1;
      this.getVehicleList();
    },
    handleClick(row, index) {
      this.centerDialogVisible = true;
      this.rowtableList = row;
    },
    //  导出表格
    befoExport() {
      this.exportLoading = true;
      let data = {
        current: 0,
        size: 0,
        deptName: this.deptName,
        cheliangpaizhao: this.plate,
        caozuoshijian: this.caozuoshijian,
        zongduanid: this.zhongduanid,
      };
      vehicleList(data).then((res) => {
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
          "车辆牌照",
          "车牌颜色",
          "使用性质",
          "驾驶员名称",
          "车辆类型",
          "厂牌",
          "运营商",
          "终端id",
          "车架号",
          "4G视频地址",
          "驾驶员电话",
          "押运员",
          "押运员电话",
          "车主",
          "车主电话",
          "创建时间",
        ];
        const filterVal = [
          "deptName",
          "cheliangpaizhao",
          "chepaiyanse",
          "shiyongxingzhi",
          "jiashiyuanxingming",
          "xinghao",
          "changpai",
          "yunyingshangmingcheng",
          "zongduanid",
          "chejiahao",
          "yunyingshang",
          "jiashiyuandianhua",
          "yayunyuanxingming",
          "yayunyuandianhua",
          "chezhu",
          "chezhudianhua",
          "caozuoshijian",
        ];
        const merges = [
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
          multiHeader2,
          header: multiHeader2,
          data,
          filename: "车辆信息",
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
    height: 100%;
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
              width: 10.3rem;
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
      /deep/ .el-dialog {
        background: none;
        .el-dialog__header {
          padding: 0;
          height: 70px;
          line-height: 80px;
          border-bottom: 1px solid gainsboro;
          background: url("~A/daily/popu-head.png") no-repeat top;
          background-size: 100% 100%;
          .el-dialog__title {
            font-size: 25px;
            color: #3383ef;
            font-weight: 700;
          }
          .el-dialog__headerbtn {
            top: 15px;
            right: 5px;
            i {
              font-size: 33px;
              color: rgb(55, 169, 247);
            }
          }
        }
        .el-dialog__body {
          // background: #fff;
          background-color: #f5f5f5;
          padding: 1rem;
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
