<template>
  <el-dialog
    :title="typee"
    :visible.sync="vehicleVisible"
    width="75%"
    top="5vh"
    center
  >
    <el-form
      ref="form"
      :model="vehiclemsgList"
      :rules="rules"
      label-width="130px"
      style="padding:0 2vh 2vh;max-height:700px;overflow:auto;"
    >
      <el-col :span="8" v-if="typee === '编辑'">
        <el-form-item label="企业名称：" prop="deptName">
          <el-input v-model="vehiclemsgList.deptName" disabled />
          <!-- <el-select
            v-model="vehiclemsgList.deptName"
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
          </el-select> -->
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="车辆牌照：" prop="cheliangpaizhao">
          <el-input
            v-model="vehiclemsgList.cheliangpaizhao"
            placeholder="请输入车辆牌照"
            :disabled="typee === '编辑'"
          />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="车牌颜色：" prop="chepaiyanse">
          <el-select
            v-model="vehiclemsgList.chepaiyanse"
            placeholder="请选择车牌颜色"
            style="width:100%;"
            :disabled="typee === '编辑'"
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
        <el-form-item label="行业类别：">
          <el-select
            v-model="vehiclemsgList.shiyongxingzhi"
            placeholder="请选择行业类别"
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
        <el-form-item label="运营状态：">
          <el-select
            v-model="vehiclemsgList.cheliangzhuangtai"
            placeholder="请选择运营状态"
            style="width:100%;"
          >
            <el-option label="营运" value="0"></el-option>
            <el-option label="停用" value="1"></el-option>
            <el-option label="报废" value="2"></el-option>
          </el-select>
        </el-form-item>
      </el-col>

      <el-col :span="8">
        <el-form-item label="本次年审日期：">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="vehiclemsgList.bencinianshenriqi"
            style="width: 100%;"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="下次年审日期：">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="vehiclemsgList.xiacinianshenriqi"
            style="width: 100%;"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="本次年检日期：">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="vehiclemsgList.bencinianjianriqi"
            style="width: 100%;"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="下次年检日期：">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="vehiclemsgList.xiacinianjianriqi"
            style="width: 100%;"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="本次技评日期：">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="vehiclemsgList.bencijipingriqi"
            style="width: 100%;"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="下次技评日期：">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="vehiclemsgList.xiacijipingriqi"
            style="width: 100%;"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="报废日期：">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="vehiclemsgList.baofeiriqi"
            style="width: 100%;"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="车辆技术等级：">
          <el-input
            v-model="vehiclemsgList.cheliangjishudengji"
            placeholder="请输入车辆技术等级"
          />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="车辆类型：">
          <el-select
            v-model="vehiclemsgList.xinghao"
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
        <el-form-item label="厂牌：">
          <el-input
            v-model="vehiclemsgList.changpai"
            placeholder="请输入厂牌"
          />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="核定吨位：">
          <el-input
            v-model="vehiclemsgList.hedingdunwei"
            placeholder="请输入核定吨位"
          />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="核定座位数：">
          <el-input
            v-model="vehiclemsgList.hedingzaike"
            placeholder="请输入核定座位数"
          />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="车架号：">
          <el-input
            v-model="vehiclemsgList.chejiahao"
            placeholder="请输入车架号"
          />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="4G视频地址：">
          <el-input
            v-model="vehiclemsgList.yunyingshang"
            placeholder="请输入4G视频地址"
          />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="终端ID：">
          <el-input
            v-model="vehiclemsgList.zongduanid"
            placeholder="请输入终端ID"
          />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="驾驶员名称：">
          <el-select
            v-model="vehiclemsgList.jiashiyuanxingming"
            placeholder="请选择驾驶员名称"
            style="width:100%;"
            @change="jiashiyuanChange"
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
        <el-form-item label="随车电话：" prop="jiashiyuandianhua">
          <el-input
            v-model="vehiclemsgList.jiashiyuandianhua"
            placeholder="请输入随车电话"
          />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="押运员：">
          <el-input
            v-model="vehiclemsgList.yayunyuanxingming"
            placeholder="请输入押运员"
          />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="押运员电话：">
          <el-input
            v-model="vehiclemsgList.yayunyuandianhua"
            placeholder="请输入押运员电话"
          />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="车主：">
          <el-input v-model="vehiclemsgList.chezhu" placeholder="请输入车主" />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="车主电话：">
          <el-input
            v-model="vehiclemsgList.chezhudianhua"
            placeholder="请输入车主电话"
          />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="所属区县：">
          <el-select
            v-model="vehiclemsgList.area"
            placeholder="请选择所属区县"
            style="width:100%;"
          >
            <el-option
              :label="item.label"
              :value="item.value"
              v-for="(item, index) in arealist"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="所属运管机构：">
          <el-input
            v-model="vehiclemsgList.suoshuyunguan"
            placeholder="请输入所属运管机构"
          />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="道路运输证号：">
          <el-input
            v-model="vehiclemsgList.daoluyunshuzheng"
            placeholder="请输入所属车队"
          />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="运输证初领日期：">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="vehiclemsgList.daoluyunshuzhengchulingriqi"
            style="width: 100%;"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="运输证有效期：">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="vehiclemsgList.daoluyunshuzhengyouxiaoqi"
            style="width: 100%;"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="服务商名称：">
          <el-input
            v-model="vehiclemsgList.yunyingshangmingcheng"
            placeholder="请输入卫星定位服务商名称"
          />
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="备注：">
          <el-input
            type="textarea"
            v-model="vehiclemsgList.beizhu"
            placeholder="请输入备注"
          />
        </el-form-item>
      </el-col>
      <!-- <el-col :span="24">
        <el-form-item label="车辆照片：">
          <el-upload
            action="/api/blade-upload/upload/upload?fileId=cheliangzhaopian&table=anbiao_vehicle"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-success="handlesuccess1"
            :on-remove="handleremove1"
            :file-list="fileList1"
            :headers="headers"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="" />
          </el-dialog>
        </el-form-item>
      </el-col> -->
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="vehicleVisible = false">取 消</el-button>
      <el-button
        type="primary"
        @click="onSubmit"
        :disabled="updatedisable"
        :loading="updateLoading"
        >确 定</el-button
      >
    </span>
  </el-dialog>
</template>

<script>
import { getToken } from "@/util/auth";
import {
  getByIdDeptList,
  getDicData,
  update,
  insert,
  getDriverByDeptIdList,
} from "@/api/daily/vehicle";
export default {
  props: {
    vehiclemsgList: {
      type: Object,
      default: () => {
        return {};
      },
    },
    typee: {
      type: String,
    },
  },
  data() {
    return {
      vehicleVisible: false,
      dialogImageUrl: "",
      fileList1: [],
      headers: {
        "blade-auth": "Bearer " + getToken(),
      },
      dialogVisible: false,
      deptNameList: [],
      chepaiyanselist: [],
      shiyongxingzhilist: [],
      jiahsiyuanlist: [],
      arealist: [], //
      xinghaolist: [],
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
        jiashiyuandianhua: [
          { required: true, message: "请输入随车电话", trigger: "blur" },
        ],
      },
    };
  },
  mounted() {
    // this.getdeptName();
    this.getcpys();
    this.getshiyongxingzhi();
    this.getxinghao();
    this.getarea();
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.updatedisable = true;
          this.updateLoading = true;
          let isApi;
          if (this.typee === "新增") {
            isApi = insert;
          } else {
            isApi = update;
            if (this.vehiclemsgList.cheliangzhuangtai === "营运") {
              this.vehiclemsgList.cheliangzhuangtai = 0;
            } else if (this.vehiclemsgList.cheliangzhuangtai === "停用") {
              this.vehiclemsgList.cheliangzhuangtai = 1;
            } else {
              this.vehiclemsgList.cheliangzhuangtai = 2;
            }
          }
          isApi(this.vehiclemsgList).then((res) => {
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
    handlesuccess1(file) {
      if (this.form.cheliangzhaopian === "") {
        this.form.cheliangzhaopian = [file];
      } else {
        this.form.cheliangzhaopian.push(file);
      }
    },
    handleremove1(file, fileList, fileIndex) {
      this.form.cheliangzhaopian = fileList;
    },
    // 获取企业名称
    getdeptName() {
      getByIdDeptList(this.$store.getters.deptId, "").then((res) => {
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
    // 获取车牌颜色
    getarea() {
      getDicData("area").then((res) => {
        this.arealist = res.data.data;
      });
    },
    // 获取驾驶员
    getDriverByDeptIdList(deptId) {
      getDriverByDeptIdList(deptId).then((res) => {
        this.jiahsiyuanlist = res.data.data.map((el) => {
          el.label = el.jiashiyuanxingming;
          el.value = el.jiashiyuanxingming;
          return el;
        });
      });
    },
    // 驾驶员 与 驾驶员电话 联动
    jiashiyuanChange(val) {
      this.jiahsiyuanlist.map((el) => {
        if (el.jiashiyuanxingming === val) {
          this.vehiclemsgList.jiashiyuandianhua = el.shoujihaoma;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
