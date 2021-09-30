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
              @click="driverDelete"
              >删除</el-button
            >
            <el-upload
              action="/api/blade-platform/platform/jiaShiYuanEnterprise/driverImport_QY"
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
              type="primary"
              icon="el-icon-upload2"
              size="small"
              @click="befoExport"
              :loading="exportLoading"
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
          :data="DriverTableData"
          :height="driverTableHeight"
          border
          style="width: 100%"
          ref="drivertable"
          v-loading="tabloading"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" align="center" width="45">
          </el-table-column>
          <el-table-column
            label="驾驶员姓名"
            prop="jiashiyuanxingming"
            align="center"
            width="100"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="xingbie"
            label="性别"
            align="center"
            width="80"
          >
          </el-table-column>
          <el-table-column
            prop="shenfenzhenghao"
            label="身份证号"
            align="center"
            width="180"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="congyeleibie"
            label="从业资格类别"
            align="center"
            width="130"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="congyerenyuanleixing"
            label="从业人员类型"
            align="center"
            width="130"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="deptName"
            label="所属企业"
            align="center"
            width="180"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="zhunjiachexing"
            label="准驾车型"
            align="center"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="congyezhengchulingri"
            label="从业资格证初次发放日期"
            align="center"
            width="200"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="congyezhengyouxiaoqi"
            label="从业资格证有效截止日期"
            align="center"
            width="200"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="chengxinkaoheshijian"
            label="本次诚信考核日期"
            align="center"
            width="170"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="xiacichengxinkaoheshijian"
            label="下次诚信考核日期"
            align="center"
            width="170"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="jiashizhengyouxiaoqi"
            label="驾驶证有效期"
            align="center"
            width="170"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="shoujihaoma"
            label="联系方式"
            align="center"
            width="110"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="fazhengjiguan"
            label="发证机构"
            align="center"
            width="110"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="jiatingzhuzhi"
            label="籍贯"
            align="center"
            width="110"
          >
          </el-table-column>
          <el-table-column
            prop="beizhu"
            label="备注"
            align="center"
            width="200"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column fixed="right" label="操作" align="center" width="70">
            <template slot-scope="scope">
              <el-button
                @click="updateClick(scope.row)"
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
        <driverupdate
          :vehiclemsgList="vehiclemsgList"
          :typee="typee"
          ref="vehiclemsg"
        ></driverupdate>
        <d-search ref="dsearch"></d-search>
        <driver-import
          ref="driverMsgImport"
          :importSuccessData="importSuccessData"
          @refreshChange="refresh"
        ></driver-import>
      </div>
    </div>
  </div>
</template>

<script>
import { getToken } from "@/util/auth";
import { driverList, driverDelete, getDicData } from "@/api/daily/vehicle";
import { export_json_to_excel } from "../../../../const/Export2Excel";
import driverupdate from "./driverupdate.vue";
import DSearch from "./dSearch.vue";
import DriverImport from "./driverImport.vue";
export default {
  components: { driverupdate, DSearch, DriverImport },
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
      rowtableList: "",
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
    //显示搜索条件
    searchShow() {
      this.$refs.dsearch.searchVisible = true;
    },
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
      let data;
      if (this.$refs.dsearch.searchMsg) {
        data = {
          current: this.current,
          size: this.size,
          ...this.$refs.dsearch.searchMsg,
        };
      } else {
        data = {
          current: this.current,
          size: this.size,
        };
      }
      driverList(data).then((res) => {
        if (res.data.code === 200) {
          this.tabloading = false;
          let obj = {};
          this.DriverTableData = res.data.data.records.map((i, index) => {
            if (i.xingbie == "2") {
              i.xingbie = "女";
            } else if (i.xingbie == "1") {
              i.xingbie = "男";
            } else {
              i.xingbie = i.xingbie;
            }
            if (i.congyeleibie == "0") {
              i.congyeleibie = "经营性道路旅客运输驾驶员";
            } else if (i.congyeleibie == "1") {
              i.congyeleibie = "经营性道路货物运输驾驶员";
            } else if (i.congyeleibie == "2") {
              i.congyeleibie = "危险货物运输驾驶员";
            } else if (i.congyeleibie == "3") {
              i.congyeleibie = "道路危险货物运输押运员";
            } else if (i.congyeleibie == "4") {
              i.congyeleibie = "道路危险货物运输装卸管理人员";
            } else {
              i.congyeleibie = i.congyeleibie;
            }
            return i;
          });
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
      this.$refs.vsearch.searchMsg = {
        jiashiyuanxingming: "",
        xingbie: "",
        shenfenzhenghao: "",
        zhunjiachexing: "",
        congyeleibiestatus: "",
        congyeleibie: "",
        congyerenyuanleixing: "",
        congyezhengchulingristatus: "",
        congyezhengchulingri: "",
        congyezhengyouxiaoqistatus: "",
        congyezhengyouxiaoqi: "",
      };
      this.getDriverList();
    },
    // 多选数据
    handleSelectionChange(val) {
      this.selection = val;
    },
    // 删除
    driverDelete() {
      console.log();
      if (this.selection.length > 0) {
        this.$modal.confirm({
          title: "删除",
          content: "确定要删除选中数据吗？",
          onOk: () => {
            let ids = "";
            this.selection.forEach((v) => (ids += v.id + ","));
            driverDelete({ id: ids }).then((res) => {
              if (res.data.code == 200) {
                this.$message.warning(res.data.msg);
                this.getDriverList();
              }
            });
          },
        });
      } else {
        this.$message.warning("请先勾选要删除的数据！");
      }
    },
    // 下载模板
    download() {
      window.open(
        this.$store.getters.userInfo.urlPrefix +
          "SafetyStandards/模板/企业端导入从业人员资料模板.xlsx"
      );
    },
    // 新增
    add() {
      this.typee = "新增";
      this.vehiclemsgList = {};
      this.$refs.vehiclemsg.vehicleVisible = true;
      this.$refs.vehiclemsg.updatedisable = false;
      this.$refs.vehiclemsg.updateLoading = false;
      // this.$refs.vehiclemsg.getdeptName();
    },
    // 修改
    updateClick(row, index) {
      this.typee = "编辑";
      this.vehiclemsgList = row;
      this.$refs.vehiclemsg.vehicleVisible = true;
      this.$refs.vehiclemsg.updatedisable = false;
      this.$refs.vehiclemsg.updateLoading = false;
    },
    // 上传文件改变时得钩子
    onChange(files, fileList) {
      this.$refs.driverMsgImport.driverDialogVisible = true;
      this.$refs.upload.submit();
      this.$refs.driverMsgImport.tableUploadLoading = true;
      if (files.status === "ready") {
        return;
      } else {
        this.$refs.driverMsgImport.tableUploadLoading = false;
      }
    },
    // 上传校验 成功
    uploadSuccess(res) {
      this.$refs.driverMsgImport.tableDialogList = res.data;
      for (let i in res.data) {
        if (res.data[i].msg !== "") {
          this.$refs.driverMsgImport.tableDialogList[
            i
          ].msg2 = require("A/icon/no.png");
        } else {
          this.$refs.driverMsgImport.tableDialogList[
            i
          ].msg2 = require("A/icon/yes.png");
        }
      }
      if (res.code === 200) {
        this.importSuccessData = JSON.stringify(res.data);
        this.$refs.driverMsgImport.disa = false;
        this.$message.success("数据验证成功···");
      } else {
        this.$refs.driverMsgImport.disa = true;
        this.$message.error("导入数据有误，请重新校验···");
        this.$refs.driverMsgImport.dialogMessage = res.msg;
      }
    },
    // 导出表格
    befoExport() {
      this.exportLoading = true;
      let data;
      if (this.$refs.dsearch.searchMsg) {
        data = {
          current: 0,
          size: 0,
          ...this.$refs.dsearch.searchMsg,
        };
      } else {
        data = {
          current: 0,
          size: 0,
        };
      }
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
          "驾驶员姓名",
          "性别",
          "身份证号",
          "从业资格类别",
          "从业人员类型",
          "所属企业",
          "准驾车型",
          "从业资格证初次发放日期",
          "从业资格证有效截止日期",
          "本次诚信考核日期",
          "下次诚信考核日期",
          "驾驶证有效期",
          "联系方式",
          "发证机构",
          "籍贯",
          "备注",
        ];
        const filterVal = [
          "jiashiyuanxingming",
          "xingbieshow",
          "shenfenzhenghao",
          "congyeleibieshow",
          "congyerenyuanleixing",
          "deptName",
          "zhunjiachexing",
          "congyezhengchulingri",
          "congyezhengyouxiaoqi",
          "chengxinkaoheshijian",
          "xiacichengxinkaoheshijian",
          "jiashizhengyouxiaoqi",
          "shoujihaoma",
          "fazhengjiguan",
          "jiatingzhuzhi",
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
        ];
        const data = this.formatJson(filterVal, list);
        export_json_to_excel({
          multiHeader2,
          header: multiHeader2,
          data,
          filename: "人员档案管理",
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
    // height: calc(100% - 62px);
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
