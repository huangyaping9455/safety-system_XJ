<template>
  <el-dialog
    title="请确认导入信息"
    :visible.sync="driverDialogVisible"
    width="60%"
    top="10vh"
    @close="DialogQuXiao()"
    center
  >
    <el-table
      v-loading="tableUploadLoading"
      :data="tableDialogList"
      border
      :height="caleHeight"
    >
      <el-table-column label="状态" width="55px">
        <template slot-scope="scope">
          <el-popover placement="right" width="200" trigger="hover">
            <img
              slot="reference"
              :src="scope.row.msg2"
              style="width: 1.5rem"
              alt
            />
            <span style="max-height: 50px; color: red">
              {{ scope.row.msg }}
            </span>
          </el-popover>
        </template>
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
        prop="xingbieshow"
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
        prop="congyeleibieshow"
        label="从业资格类别"
        align="center"
        width="130"
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
    </el-table>
    <div class="dialog-message">
      验证信息：<span>{{ dialogMessage }}</span>
    </div>
    <span
      slot="footer"
      class="dialog-footer"
      style="display: flex; justify-content: center"
    >
      <el-button @click="DialogQuXiao">取 消</el-button>
      <el-button
        type="primary"
        @click="TrueClick"
        :loading="uploadtureloading"
        :disabled="disa"
        >确认上传</el-button
      >
    </span>
  </el-dialog>
</template>

<script>
import axios from "axios";
export default {
  props: {
    importSuccessData: {
      type: String,
      default: true,
    },
  },
  data() {
    return {
      driverDialogVisible: false,
      tableUploadLoading: false,
      tableDialogList: [],
      caleHeight: 490,
      dialogMessage: "",
      uploadtureloading: false,
      disa: false,
      datenow: "",
    };
  },
  methods: {
    // 导入弹出层 取消
    DialogQuXiao() {
      this.driverDialogVisible = false;
      this.tableDialogList = [];
      this.dialogMessage = "";
    },
    TrueClick() {
      let dateTimes = new Date().getTime();
      if (dateTimes - this.datenow > 1000) {
        this.uploadtureloading = true;
        if (this.disa == true) {
          this.$message.error("导入信息有误,请校验···");
        } else {
          let formData = new FormData();
          formData.append("userId", this.$store.getters.userInfo.userId);
          formData.append("userName", this.$store.getters.userInfo.userName);
          formData.append("drivers", this.importSuccessData);
          let config = {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
          };
          axios({
            url:
              "/api/blade-platform/platform/jiaShiYuanEnterprise/driverImportOk_QY",
            method: "post",
            data: formData,
            config,
          })
            .then((res) => {
              if (res.status === 200) {
                this.$message.success("导入成功");
                this.uploadtureloading = false;
                this.driverDialogVisible = false;
                this.datenow = new Date().getTime();
                this.tableDialogList = [];
                this.dialogMessage = "";
                this.$parent.getDriverList();
              } else {
                this.uploadtureloading = false;
                this.$message.error(res.statusText);
              }
            })
            .catch(() => {
              this.uploadtureloading = false;
            });
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.dialog-message {
  max-height: 7.5rem;
  overflow-y: auto;
  width: 100%;
  border: 1px solid #ebeef5;
  padding: 3px;
  span {
    color: red;
  }
}
</style>
