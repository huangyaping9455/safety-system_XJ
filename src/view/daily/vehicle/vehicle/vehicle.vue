<template>
  <div class="vehicle">
    <div class="vehicle-body">
      <div class="vehicle-main">
        <div class="vehicle-main-head">
          <div class="vehicle-main-head-left">
            <el-button
              type="primary"
              size="small"
              icon="el-icon-plus"
              @click="add"
              >新增</el-button
            >
            <el-button
              type="primary"
              size="small"
              icon="el-icon-delete"
              @click="delet"
              >删除</el-button
            >
            <el-upload
              action="/api/blade-platform/platform/vehicle/vehicleEnterprise/vehicleImport"
              :data="pdata"
              name="file"
              :show-file-list="false"
              :headers="headers"
              :on-change="onChange"
              :on-success="uploadSuccess"
              :file-list="fileList"
              :auto-upload="false"
              :limit="100"
              ref="upload"
              style="margin-left:10px;"
            >
              <el-button size="small" type="primary" icon="el-icon-download">
                导入
              </el-button>
            </el-upload>
            <el-button
              size="small"
              type="primary"
              icon="el-icon-upload"
              @click="download"
              style="margin-left:10px;"
            >
              下载模板
            </el-button>
            <el-button
              size="small"
              type="primary"
              @click="befoExport"
              :loading="exportLoading"
              icon="el-icon-upload2"
            >
              导出
            </el-button>
            <el-button
              type="primary"
              @click="searchShow"
              size="small"
              icon="el-icon-search"
              >搜索</el-button
            >
          </div>
          <div class="vehicle-main-head-right">
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
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" align="center" width="45">
          </el-table-column>
          <el-table-column
            prop="deptName"
            label="企业名称"
            align="center"
            :show-overflow-tooltip="true"
            width="220"
          >
          </el-table-column>
          <el-table-column
            label="车辆牌照"
            prop="cheliangpaizhao"
            align="center"
            width="110"
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
            label="行业类别"
            align="center"
            width="140"
          >
          </el-table-column>
          <el-table-column
            prop="cheliangzhuangtai"
            label="运营状态"
            align="center"
            width="140"
          >
          </el-table-column>
          <el-table-column
            prop="daoluyunshuzheng"
            label="道路运输证号"
            align="center"
            width="140"
          >
          </el-table-column>
          <el-table-column
            prop="daoluyunshuzhengchulingriqi"
            label="道路运输证首次发放日期"
            align="center"
            width="200"
          >
          </el-table-column>
          <el-table-column
            prop="daoluyunshuzhengyouxiaoqi"
            label="道路运输证有效截至日期"
            align="center"
            width="200"
          >
          </el-table-column>
          <el-table-column
            prop="bencinianshenriqi"
            label="本次年审日期"
            align="center"
            width="200"
          >
          </el-table-column>
          <el-table-column
            prop="xiacinianshenriqi"
            label="下次年审日期"
            align="center"
            width="200"
          >
          </el-table-column>
          <el-table-column
            prop="bencinianjianriqi"
            label="本次年检日期"
            align="center"
            width="200"
          >
          </el-table-column>
          <el-table-column
            prop="xiacinianjianriqi"
            label="下次年检日期"
            align="center"
            width="200"
          >
          </el-table-column>
          <el-table-column
            prop="bencijipingriqi"
            label="本次技评日期"
            align="center"
            width="200"
          >
          </el-table-column>
          <el-table-column
            prop="xiacijipingriqi"
            label="下次技评日期"
            align="center"
            width="200"
          >
          </el-table-column>
          <el-table-column
            prop="baofeiriqi"
            label="报废日期"
            align="center"
            width="200"
          >
          </el-table-column>
          <el-table-column
            prop="cheliangjishudengji"
            label="车辆技术等级"
            align="center"
            width="140"
          >
          </el-table-column>
          <el-table-column
            prop="xinghao"
            label="车辆类型"
            align="center"
            width="140"
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
            prop="hedingdunwei"
            label="核定吨位"
            align="center"
            width="140"
          >
          </el-table-column>
          <el-table-column
            prop="hedingzaike"
            label="核定座位数"
            align="center"
            width="140"
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
            prop="yunyingshangmingcheng"
            label="卫星定位服务商名称"
            align="center"
            width="150"
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
            prop="zongduanid"
            label="终端id"
            align="center"
            width="130"
          >
          </el-table-column>
          <el-table-column
            prop="jiashiyuanxingming"
            label="驾驶员"
            align="center"
            width="100"
          >
          </el-table-column>
          <el-table-column
            prop="jiashiyuandianhua"
            label="随车电话"
            align="center"
            width="150"
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
            prop="area"
            label="所属区县"
            align="center"
            width="160"
          >
          </el-table-column>
          <el-table-column
            prop="suoshuyunguan"
            label="所属运管机构"
            align="center"
            width="160"
          >
          </el-table-column>
          <el-table-column
            prop="beizhu"
            label="备注"
            align="center"
            width="160"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column fixed="right" label="操作" align="center" width="70">
            <template slot-scope="scope">
              <el-button
                @click="handleupdate(scope.row)"
                type="text"
                size="small"
                >编辑</el-button
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
        <vehicle-update
          :vehiclemsgList="vehiclemsgList"
          :typee="typee"
          ref="vehiclemsg"
        ></vehicle-update>
        <v-search ref="vsearch"></v-search>
        <import-dialog
          ref="importdialog"
          :importSuccessData="importSuccessData"
          @refreshChange="refresh"
        ></import-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import { getToken } from "@/util/auth";
import { vehicleList, delet } from "@/api/daily/vehicle";
import { export_json_to_excel } from "@/const/Export2Excel";
import VehicleUpdate from "./vehiclupdate.vue";
import vSearch from "./vSearch.vue";
import ImportDialog from "./ImportDialog.vue";
export default {
  components: { VehicleUpdate, vSearch, ImportDialog },
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
      exportLoading: false,
      vehiclemsgList: {},
      typee: "新增",
      // 上传 附加参数
      pdata: {
        deptId: this.$store.getters.deptId,
        userId: this.$store.getters.userInfo.userId,
        userName: this.$store.getters.userInfo.userName,
      },
      // 表格附加请求头
      headers: {
        "blade-auth": "Bearer " + getToken(),
      },
      fileList: [],
      importSuccessData: "",
      selection: [],
    };
  },
  mounted() {
    this.getVehicleList();
    this.$nextTick(function() {
      this.vehicleTableHeight =
        window.innerHeight - this.$refs.vehicletable.$el.offsetTop - 110;
      // 监听窗口大小变化
      let self = this;
      window.onresize = function() {
        self.vehicleTableHeight =
          window.innerHeight - self.$refs.vehicletable.$el.offsetTop - 110;
      };
    });
  },
  methods: {
    //显示搜索条件
    searchShow() {
      this.$refs.vsearch.searchVisible = true;
    },
    // 列表数据
    getVehicleList() {
      this.tabloading = true;
      let data;
      if (this.$refs.vsearch.searchMsg) {
        data = {
          current: this.current,
          size: this.size,
          ...this.$refs.vsearch.searchMsg,
        };
      } else {
        data = {
          current: this.current,
          size: this.size,
        };
      }
      vehicleList(data).then((res) => {
        if (res.data.code === 200) {
          this.tabloading = false;
          this.VehicleTableData = res.data.data.records.map((el) => {
            if (el.daoluyunshuzheng === "null") {
              el.daoluyunshuzheng = "";
            }
            if (el.cheliangjishudengji === "null") {
              el.cheliangjishudengji = "";
            }
            if (el.hedingdunwei === "null") {
              el.hedingdunwei = "";
            }
            if (el.hedingzaike === "null") {
              el.hedingzaike = "";
            }
            if (el.chejiahao === "null") {
              el.chejiahao = "";
            }
            if (el.yunyingshangmingcheng === "null") {
              el.yunyingshangmingcheng = "";
            }
            if (el.yunyingshang === "null") {
              el.yunyingshang = "";
            }
            if (el.yayunyuandianhua === "null") {
              el.yayunyuandianhua = "";
            }
            return el;
          });
          this.total = res.data.data.total;
        } else {
          this.tabloading = false;
          this.$message.error("出错了···");
          this.VehicleTableData = [];
        }
      });
    },
    handleSizeChange(tal) {
      this.size = tal;
      this.getVehicleList();
    },
    handleCurrentChange(tal) {
      this.current = tal;
      this.getVehicleList();
    },
    refresh() {
      this.current = 1;
      this.$refs.vsearch.searchMsg = {
        deptName: "",
        cheliangpaizhao: "",
        chepaiyanse: "",
        shiyongxingzhi: "",
        daoluyunshuzhengchulingriqistatus: "",
        daoluyunshuzhengchulingriqi: "",
        daoluyunshuzhengyouxiaoqistatus: "",
        daoluyunshuzhengyouxiaoqi: "",
        bencinianjianriqistatus: "",
        bencinianjianriqi: "",
        xiacinianjianriqistatus: "",
        xiacinianjianriqi: "",
      };
      this.getVehicleList();
    },
    // 新增
    add() {
      this.typee = "新增";
      this.vehiclemsgList = {};
      this.$refs.vehiclemsg.vehicleVisible = true;
      this.$refs.vehiclemsg.updatedisable = false;
      this.$refs.vehiclemsg.updateLoading = false;
      this.$refs.vehiclemsg.getDriverByDeptIdList(this.$store.getters.deptId);
    },
    // 修改
    handleupdate(row, index) {
      this.typee = "编辑";
      this.vehiclemsgList = row;
      this.$refs.vehiclemsg.vehicleVisible = true;
      this.$refs.vehiclemsg.updatedisable = false;
      this.$refs.vehiclemsg.updateLoading = false;
      this.$refs.vehiclemsg.getDriverByDeptIdList(row.deptId);
    },
    // 下载模板
    download() {
      window.open(
        this.$store.getters.userInfo.urlPrefix +
          "SafetyStandards/模板/企业端导入车辆资料模板.xlsx"
      );
    },
    // 上传文件改变时得钩子
    onChange(files, fileList) {
      this.$refs.importdialog.centerDialogVisible = true;
      this.$refs.upload.submit();
      this.$refs.importdialog.tableUploadLoading = true;
      if (files.status === "ready") {
        return;
      } else {
        this.$refs.importdialog.tableUploadLoading = false;
      }
    },
    // 上传校验 成功
    uploadSuccess(res) {
      this.$refs.importdialog.tableDialogList = res.data;
      for (let i in res.data) {
        if (res.data[i].msg !== "") {
          this.$refs.importdialog.tableDialogList[
            i
          ].msg2 = require("A/icon/no.png");
        } else {
          this.$refs.importdialog.tableDialogList[
            i
          ].msg2 = require("A/icon/yes.png");
        }
      }
      if (res.code === 200) {
        this.importSuccessData = JSON.stringify(res.data);
        this.$refs.importdialog.disa = false;
        this.$message.success("数据验证成功···");
      } else {
        this.$refs.importdialog.disa = true;
        this.$message.error("导入数据有误，请重新校验···");
        this.$refs.importdialog.dialogMessage = res.msg;
      }
    },
    // 多选数据
    handleSelectionChange(val) {
      this.selection = val;
    },
    // 删除
    delet() {
      if (this.selection.length > 0) {
        this.$modal.confirm({
          title: "删除",
          content: "确定要删除选中数据吗？",
          onOk: () => {
            let ids = "";
            this.selection.forEach((v) => (ids += v.id + ","));
            delet(ids).then((res) => {
              if (res.data.code == 200) {
                this.$message.warning(res.data.msg);
                this.getVehicleList();
              }
            });
          },
        });
      } else {
        this.$message.warning("请先勾选要删除的数据！");
      }
    },
    //  导出表格
    befoExport() {
      this.exportLoading = true;
      let data;
      if (this.$refs.vsearch.searchMsg) {
        data = {
          current: 0,
          size: 0,
          ...this.$refs.vsearch.searchMsg,
        };
      } else {
        data = {
          current: 0,
          size: 0,
        };
      }
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
          "行业类别",
          "运营状态",
          "道路运输证号",
          "道路运输证首次发放日期",
          "道路运输证有效截至日期",
          "本次年审日期",
          "下次年审日期",
          "本次年检日期",
          "下次年检日期",
          "本次技评日期",
          "下次技评日期",
          "报废日期",
          "车辆技术等级",
          "车辆类型",
          "厂牌",
          "核定吨位",
          "核定座位数",
          "车架号",
          "卫星定位服务商名称",
          "4G视频地址",
          "终端id",
          "驾驶员",
          "随车电话",
          "押运员",
          "押运员电话",
          "车主",
          "车主电话",
          "所属区县",
          "所属运管机构",
          "备注",
        ];
        const filterVal = [
          "deptName",
          "cheliangpaizhao",
          "chepaiyanse",
          "shiyongxingzhi",
          "cheliangzhuangtai",
          "daoluyunshuzheng",
          "daoluyunshuzhengchulingriqi",
          "daoluyunshuzhengyouxiaoqi",
          "bencinianshenriqi",
          "xiacinianshenriqi",
          "bencinianjianriqi",
          "xiacinianjianriqi",
          "bencijipingriqi",
          "xiacijipingriqi",
          "baofeiriqi",
          "cheliangjishudengji",
          "xinghao",
          "changpai",
          "hedingdunwei",
          "hedingzaike",
          "chejiahao",
          "yunyingshangmingcheng",
          "yunyingshang",
          "zongduanid",
          "jiashiyuanxingming",
          "jiashiyuandianhua",
          "yayunyuanxingming",
          "yayunyuandianhua",
          "chezhu",
          "chezhudianhua",
          "area",
          "suoshuyunguan",
          "beizhu",
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
          "R1:R2",
          "S1:S2",
          "T1:T2",
          "U1:U2",
          "V1:V2",
          "W1:W2",
          "X1:X2",
          "Y1:Y2",
          "Z1:Z2",
          "AA1:AA2",
          "AB1:AB2",
          "AC1:AC2",
          "AD1:AD2",
          "AE1:AE2",
          "AF1:AF2",
          "AG1:AG2",
        ];
        const data = this.formatJson(filterVal, list);
        export_json_to_excel({
          multiHeader2,
          header: multiHeader2,
          data,
          filename: "车辆档案管理",
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
        background: #fff;
        .el-dialog__body {
          padding: 1rem;
        }
        .el-dialog__header {
          padding: 10px !important;
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
