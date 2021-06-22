<template>
  <el-dialog
    title="编辑"
    :visible.sync="vehicleVisible"
    width="70%"
    top="5vh"
    center
  >
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      label-width="110px"
      style="padding:2vh;height:680px;"
    >
      <el-col :span="8">
        <el-form-item label="企业名称：" prop="deptName">
          <el-select
            v-model="form.deptName"
            placeholder="请选择企业名称"
            style="width:100%;"
            filterable
            disabled
          >
            <el-option
              :label="item.label"
              :value="item.value"
              v-for="(item, index) in deptNameList"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="车辆牌照：" prop="cheliangpaizhao">
          <el-input
            v-model="form.cheliangpaizhao"
            disabled
            placeholder="请输入车辆牌照"
          />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="车牌颜色：" prop="chepaiyanse">
          <el-select
            v-model="form.chepaiyanse"
            placeholder="请选择车牌颜色"
            style="width:100%;"
            disabled
          >
            <el-option
              :label="item.label"
              :value="item.value"
              v-for="(item, index) in chepaiyanselist"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="使用性质：" prop="shiyongxingzhi">
          <el-select
            v-model="form.shiyongxingzhi"
            placeholder="请选择使用性质"
            style="width:100%;"
          >
            <el-option
              :label="item.label"
              :value="item.value"
              v-for="(item, index) in shiyongxingzhilist"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="所属车队：">
          <el-input v-model="form.suoshuchedui" placeholder="请输入所属车队" />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="厂牌：">
          <el-input v-model="form.changpai" placeholder="请输入厂牌" />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="车身颜色：">
          <el-select
            v-model="form.cheshenyanse"
            placeholder="请选择车身颜色"
            style="width:100%;"
          >
            <el-option
              :label="item.label"
              :value="item.value"
              v-for="(item, index) in chepaiyanselist"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="车辆类型：">
          <el-select
            v-model="form.xinghao"
            placeholder="请选择车辆类型"
            style="width:100%;"
          >
            <el-option
              :label="item.label"
              :value="item.value"
              v-for="(item, index) in xinghaolist"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="车架号：">
          <el-input v-model="form.chejiahao" placeholder="请输入车架号" />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="登记证书编号：">
          <el-input
            v-model="form.dengjizhengshubianhao"
            placeholder="请输入登记证书编号"
          />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="核定载客：">
          <el-input v-model="form.hedingzaike" placeholder="请输入核定载客" />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="驾驶员名称：">
          <el-select
            v-model="form.jiashiyuanxingming"
            placeholder="请选择驾驶员名称"
            style="width:100%;"
          >
            <el-option
              :label="item.label"
              :value="item.value"
              v-for="(item, index) in jiahsiyuanlist"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="强制报废时间：">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="form.qiangzhibaofeishijian"
            style="width: 100%;"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="接驳运输证号：">
          <el-input
            v-model="form.jieboyunshuzhenghao"
            placeholder="请输入接驳运输证号"
          />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="原车辆牌照：">
          <el-input
            v-model="form.yuancheliangpaizhao"
            placeholder="请输入原车辆牌照"
          />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="车辆状态：" prop="cheliangzhuangtai">
          <el-select
            v-model="form.cheliangzhuangtai"
            placeholder="请选择车辆状态"
            style="width:100%;"
          >
            <el-option label="在用" value="0"></el-option>
            <el-option label="停用" value="1"></el-option>
            <el-option label="报废" value="2"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="档案号：">
          <el-input v-model="form.danganhao" placeholder="请输入档案号" />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="运营商名称：">
          <el-input
            v-model="form.yunyingshangmingcheng"
            placeholder="请输运营商名称"
          />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="终端ID：" prop="zongduanid">
          <el-input
            v-model="form.zongduanid"
            disabled
            placeholder="请输入终端ID"
          />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="4G视频地址：">
          <el-input
            v-model="form.yunyingshang"
            placeholder="请输入4G视频地址"
          />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="操作时间：">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="form.caozuoshijian"
            style="width: 100%;"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="车辆照片：">
          <el-upload
            action="/api/blade-upload/upload/upload?fileId=cheliangzhaopian&table=anbiao_vehicle"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="" />
          </el-dialog>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item style="display:flex;justify-content:center;">
          <el-button
            type="primary"
            @click="onSubmit"
            :disabled="updatedisable"
            :loading="updateLoading"
            >修改</el-button
          >
          <el-button @click="vehicleVisible = false">取消</el-button>
        </el-form-item>
      </el-col>
    </el-form>
  </el-dialog>
</template>

<script>
import {
  getByIdDeptList,
  getDicData,
  update,
  getByIdJiaShiYuanList,
} from "@/api/daily/vehicle";
export default {
  props: {
    vehiclemsgList: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      vehicleVisible: false,
      form: {
        deptName: "",
        cheliangpaizhao: "",
        chepaiyanse: "",
        shiyongxingzhi: "",
        suoshuchedui: "",
        changpai: "",
        cheshenyanse: "",
        xinghao: "",
        chejiahao: "",
        dengjizhengshubianhao: "",
        hedingzaike: "",
        jiashiyuanxingming: "",
        qiangzhibaofeishijian: "",
        jieboyunshuzhenghao: "",
        yuancheliangpaizhao: "",
        cheliangzhuangtai: "",
        danganhao: "",
        zongduanid: "",
        yunyingshang: "",
        caozuoshijian: "",
        fujian: "",
        cheliangzhaopian: "",
      },
      dialogImageUrl: "",
      dialogVisible: false,
      deptNameList: [],
      chepaiyanselist: [],
      shiyongxingzhilist: [],
      xinghaolist: [],
      jiahsiyuanlist: [],
      updatedisable: false,
      updateLoading: false,
      rules: {
        deptName: [
          { required: true, message: "请输入企业名称", trigger: "blur" },
        ],
        cheliangpaizhao: [
          { required: true, message: "请输入车辆牌照", trigger: "blur" },
        ],
        chepaiyanse: [
          { required: true, message: "请输入车牌颜色", trigger: "blur" },
        ],
        shiyongxingzhi: [
          { required: true, message: "请选择车辆状态", trigger: "blur" },
        ],
        cheliangzhuangtai: [
          { required: true, message: "请选择车辆状态", trigger: "blur" },
        ],
        zongduanid: [
          { required: true, message: "请输入终端ID", trigger: "blur" },
        ],
      },
    };
  },
  mounted() {
    this.getdeptName();
    this.getcpys();
    this.getshiyongxingzhi();
    this.getxinghao();
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.updatedisable = true;
          this.updateLoading = true;
          this.form.cheliangzhaopian = this.dialogImageUrl;
          // 修改时去除车辆牌照和终端id得首尾空格
          this.form.cheliangpaizhao = this.form.cheliangpaizhao.replace(
            /(^\s*)|(\s*$)/g,
            ""
          );
          this.form.zongduanid = this.form.zongduanid.replace(
            /(^\s*)|(\s*$)/g,
            ""
          );
          delete this.form.area;
          update(this.form).then((res) => {
            if (res.data.code == 200) {
              this.$message({
                type: "success",
                message: res.data.msg,
              });
              this.$parent.getVehicleList();
              this.vehicleVisible = false;
              this.updatedisable = false;
              this.updateLoading = false;
            } else {
              this.$message({
                type: "error",
                message: res.data.msg,
              });
              this.updatedisable = false;
              this.updateLoading = false;
            }
          });
        } else {
          this.$message.error("请完善信息");
        }
      });
    },
    //车辆照片 上传
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 获取企业名称
    getdeptName() {
      getByIdDeptList(1, "").then((res) => {
        this.deptNameList = res.data.data.map((el) => {
          el.label = el.deptName;
          el.value = el.id;
          return el;
        });
      });
    },
    // 获取车牌颜色
    getcpys() {
      getDicData("colour").then((res) => {
        this.chepaiyanselist = res.data.data;
      });
    },
    // 获取车牌颜色
    getshiyongxingzhi() {
      getDicData("shiyongxingzhi").then((res) => {
        this.shiyongxingzhilist = res.data.data;
      });
    },
    // 获取车牌颜色
    getxinghao() {
      getDicData("xinghao").then((res) => {
        this.xinghaolist = res.data.data;
      });
    },
    // 获取驾驶员
    getByIdJiaShiYuanList(deptId) {
      getByIdJiaShiYuanList(deptId).then((res) => {
        this.jiahsiyuanlist = res.data.data;
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
