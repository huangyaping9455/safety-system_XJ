<template>
  <el-dialog
    :title="typee"
    :visible.sync="vehicleVisible"
    width="75%"
    top="10vh"
    center
  >
    <el-form
      ref="form"
      :model="vehiclemsgList"
      :rules="rules"
      label-width="160px"
      style="padding:0 2vh 2vh;max-height:700px;overflow:auto;"
    >
      <el-col :span="8">
        <el-form-item label="企业名称：" v-if="typee === '编辑'">
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
        <el-form-item label="驾驶员姓名：" prop="jiashiyuanxingming">
          <el-input
            v-model="vehiclemsgList.jiashiyuanxingming"
            placeholder="请输入驾驶员姓名"
          />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="性别：" prop="xingbie">
          <el-select
            v-model="vehiclemsgList.xingbie"
            placeholder="请选择性别"
            style="width:100%;"
          >
            <el-option label="男" value="1"></el-option>
            <el-option label="女" value="2"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="身份证号：" prop="shenfenzhenghao">
          <el-input
            v-model="vehiclemsgList.shenfenzhenghao"
            placeholder="请输入身份证号"
            :disabled="typee === '编辑'"
          />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="从业资格类别：" prop="congyeleibie">
          <el-select
            v-model="vehiclemsgList.congyeleibie"
            placeholder="请选择从业资格类别"
            style="width:100%;"
          >
            <el-option
              v-for="(item, index) in congyeleibieList"
              :key="index"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="从业人员类型：" prop="congyerenyuanleixing">
          <el-select
            v-model="vehiclemsgList.congyerenyuanleixing"
            placeholder="请选择从业人员类型"
            style="width:100%;"
            :disabled="typee === '编辑'"
          >
            <el-option
              v-for="(item, index) in congyerenyuanleixingList"
              :key="index"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="准驾车型：">
          <el-select
            v-model="vehiclemsgList.zhunjiachexing"
            placeholder="请选择准驾车型"
            style="width:100%;"
          >
            <el-option
              v-for="(item, index) in zhunjiachexingList"
              :key="index"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="从业资格证初领日期：">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="vehiclemsgList.congyezhengchulingri"
            style="width: 100%;"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="从业资格证有效期：">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="vehiclemsgList.congyezhengyouxiaoqi"
            style="width: 100%;"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="本次诚信考核日期：">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="vehiclemsgList.chengxinkaoheshijian"
            style="width: 100%;"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="下次诚信考核日期：">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="vehiclemsgList.xiacichengxinkaoheshijian"
            style="width: 100%;"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="驾驶证有效期：">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="vehiclemsgList.jiashizhengyouxiaoqi"
            style="width: 100%;"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="联系方式：" prop="shoujihaoma">
          <el-input
            v-model="vehiclemsgList.shoujihaoma"
            placeholder="请输入联系方式"
          />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="发证机构：">
          <el-input
            v-model="vehiclemsgList.fazhengjiguan"
            placeholder="请输入发证机构"
          />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="籍贯：">
          <el-input
            v-model="vehiclemsgList.jiatingzhuzhi"
            placeholder="请输入籍贯"
          />
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="备注：">
          <el-input type="textarea" v-model="vehiclemsgList.beizhu" />
        </el-form-item>
      </el-col>
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
  driverInsert,
  updatedriver,
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
      deptNameList: [],
      congyeleibieList: [],
      zhunjiachexingList: [],
      congyerenyuanleixingList: [],
      updatedisable: false,
      updateLoading: false,
      rules: {
        jiashiyuanxingming: [
          { required: true, message: "请输入驾驶员姓名", trigger: "blur" },
        ],
        xingbie: [{ required: true, message: "请选择性别", trigger: "blur" }],
        shenfenzhenghao: [
          { required: true, message: "请输入身份证号", trigger: "blur" },
        ],
        shoujihaoma: [
          { required: true, message: "请选择手机号码", trigger: "blur" },
        ],
        congyeleibie: [
          { required: true, message: "请输入从业资格类别", trigger: "blur" },
        ],
        congyerenyuanleixing: [
          { required: true, message: "请输入从业人员类型", trigger: "blur" },
        ],
      },
    };
  },
  mounted() {
    this.getzhunjia();
    this.getcongye();
    this.getcongyerenyuan();
  },
  methods: {
    // 提交
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.updatedisable = true;
          this.updateLoading = true;
          let isApi;
          if (this.typee === "新增") {
            isApi = driverInsert;
          } else {
            isApi = updatedriver;
          }
          if (this.vehiclemsgList.xingbie === "女") {
            this.vehiclemsgList.sex = "2";
          } else if (this.vehiclemsgList.xingbie === "男") {
            this.vehiclemsgList.xingbie = "1";
          } else {
            this.vehiclemsgList.xingbie = this.vehiclemsgList.xingbie;
          }
          if (this.vehiclemsgList.congyeleibie == "经营性道路旅客运输驾驶员") {
            this.vehiclemsgList.congyeleibie = "0";
          } else if (
            this.vehiclemsgList.congyeleibie == "经营性道路货物运输驾驶员"
          ) {
            this.vehiclemsgList.congyeleibie = "1";
          } else if (this.vehiclemsgList.congyeleibie == "危险货物运输驾驶员") {
            this.vehiclemsgList.congyeleibie = "2";
          } else if (
            this.vehiclemsgList.congyeleibie == "道路危险货物运输押运员"
          ) {
            this.vehiclemsgList.congyeleibie = "3";
          } else if (
            this.vehiclemsgList.congyeleibie == "道路危险货物运输装卸管理人员"
          ) {
            this.vehiclemsgList.congyeleibie = "4";
          } else {
            this.vehiclemsgList.congyeleibie = this.vehiclemsgList.congyeleibie;
          }
          isApi(this.vehiclemsgList).then((res) => {
            if (res.data.code == 200) {
              this.$message({
                type: "success",
                message: res.data.msg,
              });
              this.$parent.getDriverList();
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
    // 获取准驾车型
    getzhunjia() {
      getDicData("zhunjiachexing").then((res) => {
        this.zhunjiachexingList = res.data.data;
      });
    },
    // 获取从业资格证类别
    getcongye() {
      getDicData("congyezigezhengleibie").then((res) => {
        this.congyeleibieList = res.data.data;
      });
    },
    // 获取从业资格证类别
    getcongyerenyuan() {
      getDicData("congyerenyuanleixing").then((res) => {
        this.congyerenyuanleixingList = res.data.data;
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
