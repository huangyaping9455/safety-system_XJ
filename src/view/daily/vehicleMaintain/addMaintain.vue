<template>
  <el-dialog :title="typee" :visible.sync="mainVisible" width="65%" center>
    <span
      v-if="mainmsgList.shuoming !== ''"
      style="color:red;padding-left:2vmin;"
    >
      {{ mainmsgList.shuoming }}
    </span>
    <el-form
      ref="form"
      :model="mainmsgList"
      :rules="rules"
      label-width="130px"
      style="padding:0 1vmin;max-height:700px;overflow:auto;"
    >
      <el-col :span="8">
        <el-form-item label="企业名称：" prop="deptName">
          <el-select
            v-model="mainmsgList.deptName"
            placeholder="请选择企业名称"
            style="width:100%;"
            filterable
            @change="deptNameChange"
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
          <el-select
            v-model="mainmsgList.cheliangpaizhao"
            placeholder="请选择车辆牌照"
            style="width:100%;"
            @change="chepaiChange"
          >
            <el-option
              :label="item.label"
              :value="item.value"
              v-for="(item, index) in chepaiList"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="车牌颜色：">
          <el-select
            v-model="mainmsgList.chepaiyanse"
            placeholder="请选择车牌颜色"
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
        <el-form-item label="车辆维护单位：" prop="cheliangweihudanwei">
          <el-input
            v-model="mainmsgList.cheliangweihudanwei"
            placeholder="请输入车辆维护单位"
          />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="维护类别：">
          <el-select
            v-model="mainmsgList.weihuleibie"
            placeholder="请选择维护类别"
            style="width:100%;"
          >
            <el-option
              :label="item.label"
              :value="item.value"
              v-for="(item, index) in weihuleibielist"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="进厂日期：" prop="jinchangriqi">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="mainmsgList.jinchangriqi"
            style="width: 100%;"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="进厂里程：">
          <el-input
            v-model="mainmsgList.jinchanglichengdushu"
            placeholder="请输入进厂里程"
          />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="出厂日期：" prop="chuchangriqi">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="mainmsgList.chuchangriqi"
            style="width: 100%;"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="维护/维修金额：">
          <el-input
            v-model="mainmsgList.weihujine"
            placeholder="请输入维护/维修金额"
          />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="下次维护日期：">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="mainmsgList.xiaciweihuriqi"
            style="width: 100%;"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="下次进厂里程：">
          <el-input
            v-model="mainmsgList.xiacijinchanglicheng"
            placeholder="请输入下次进厂里程"
          />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="是否合格：">
          <el-select
            v-model="mainmsgList.shifouhege"
            placeholder="请选择是否合格"
            style="width:100%;"
          >
            <el-option label="是" value="是"></el-option>
            <el-option label="否" value="否"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="认定维修点：" prop="rendingweixiudian">
          <el-input
            v-model="mainmsgList.rendingweixiudian"
            placeholder="请输入认定维修点"
          />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="维护合同编号：" prop="weihuhetongbianhao">
          <el-input
            v-model="mainmsgList.weihuhetongbianhao"
            placeholder="请输入维护合同编号"
          />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="录入时间：">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="mainmsgList.lurushijian"
            style="width: 100%;"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="维护类容：">
          <el-input
            type="textarea"
            v-model="mainmsgList.weihuneirong"
            placeholder="请输入维护类容"
          />
        </el-form-item>
      </el-col>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="mainVisible = false">取 消</el-button>
      <el-button type="primary" @click="onSubmit" :loading="updateLoading"
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
  weihuUpdate,
  weihuInsert,
  getByIdVehicleLis,
} from "@/api/daily/vehicle";
export default {
  props: {
    mainmsgList: {
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
      mainVisible: false,
      deptNameList: [],
      chepaiyanselist: [],
      weihuleibielist: [],
      chepaiList: [],
      updateLoading: false,
      rules: {
        deptName: [
          { required: true, message: "请输入企业名称", trigger: "blur" },
        ],
        cheliangpaizhao: [
          { required: true, message: "请输入车辆牌照", trigger: "blur" },
        ],
        cheliangweihudanwei: [
          { required: true, message: "请输入车辆维护单位", trigger: "blur" },
        ],
        jinchangriqi: [
          { required: true, message: "请输入进厂日期", trigger: "blur" },
        ],
        chuchangriqi: [
          { required: true, message: "请输入出厂日期", trigger: "blur" },
        ],
        rendingweixiudian: [
          { required: true, message: "请输入认定维修点", trigger: "blur" },
        ],
        weihuhetongbianhao: [
          { required: true, message: "请输入维护合同编号", trigger: "blur" },
        ],
      },
    };
  },
  mounted() {
    this.getdeptName();
    this.getcpys();
    this.getweihuleibie();
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.updateLoading = true;
          let isApi;
          if (this.typee === "新增") {
            isApi = weihuInsert;
            this.mainmsgList.deptId = this.mainmsgList.deptName;
          } else {
            isApi = weihuUpdate;
            if (this.isNumber(this.mainmsgList.deptName) === true) {
              this.mainmsgList.deptId = this.mainmsgList.deptName;
            }
          }
          isApi(this.mainmsgList).then((res) => {
            if (res.data.code == 200) {
              this.$message({
                type: "success",
                message: res.data.msg,
              });
              this.$parent.getweihuList();
              this.mainVisible = false;
              this.updateLoading = false;
            } else {
              this.$message({
                type: "error",
                message: res.data.msg,
              });
              this.updateLoading = false;
            }
          });
        } else {
          this.$message.error("请完善信息");
        }
      });
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
    // 获取维护类别
    getweihuleibie() {
      getDicData("VehicleMaintenanceCategory").then((res) => {
        this.weihuleibielist = res.data.data;
      });
    },
    // 判断是否为 数字
    isNumber(val) {
      let regPos = /^\d+(\.\d+)?$/; //非负浮点数
      let regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
      if (regPos.test(val) || regNeg.test(val)) {
        return true;
      } else {
        return false;
      }
    },
    // 企业名称 change事件
    deptNameChange(val) {
      getByIdVehicleLis(val).then((res) => {
        this.chepaiList = res.data.data.map((el) => {
          el.label = el.cheliangpaizhao;
          el.value = el.cheliangpaizhao;
          return el;
        });
      });
    },
    //车牌 change事件
    chepaiChange(val) {
      this.chepaiList.map((el) => {
        if (el.cheliangpaizhao === val) {
          this.mainmsgList.cheliangid = el.id;
          this.mainmsgList.chepaiyanse = el.chepaiyanse;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
