<template
  ><el-dialog
    title="请确认导入信息"
    :visible.sync="centerDialogVisible"
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
      <el-table-column prop="changpai" label="厂牌" align="center" width="120">
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
      <el-table-column prop="yayunyuanxingming" label="押运员" align="center">
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
      <el-table-column prop="area" label="所属区县" align="center" width="160">
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
      centerDialogVisible: false,
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
      this.centerDialogVisible = false;
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
          formData.append("vehicles", this.importSuccessData);
          let config = {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
          };
          axios({
            url:
              "api/blade-platform/platform/vehicle/vehicleEnterprise/vehicleImportOk",
            method: "post",
            data: formData,
            config,
          })
            .then((res) => {
              if (res.status === 200) {
                this.$message.success("导入成功");
                this.uploadtureloading = false;
                this.centerDialogVisible = false;
                this.datenow = new Date().getTime();
                this.tableDialogList = [];
                this.dialogMessage = "";
                this.$emit("refreshChange");
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
