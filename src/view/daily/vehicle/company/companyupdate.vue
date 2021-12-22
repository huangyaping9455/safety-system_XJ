<template>
  <el-dialog
    title="编辑"
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
      style="padding:2vh;max-height:700px;overflow:auto;"
    >
      <el-col :span="8">
        <el-form-item label="企业名称：">
          <el-input v-model="vehiclemsgList.deptName" disabled />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="社会统一信用代码：">
          <el-input
            v-model="vehiclemsgList.jigoubianma"
            placeholder="请输入社会统一信用代码"
          />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="经营许可证：">
          <el-input
            v-model="vehiclemsgList.jingyingxvkezheng"
            placeholder="请输入经营许可证"
          />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="经营范围：">
          <el-input
            v-model="vehiclemsgList.jingyingfanwei"
            placeholder="请输入经营范围"
          />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="初次发证日期：">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="vehiclemsgList.jingyingxukezhengchulingriqi"
            style="width: 100%;"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="有效截止日期：">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="vehiclemsgList.jingyingxukezhengyouxiaoqi"
            style="width: 100%;"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="地址：">
          <el-input
            v-model="vehiclemsgList.xiangxidizhi"
            placeholder="请输入地址"
          />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="联系方式：">
          <el-input
            v-model="vehiclemsgList.lianxidianhua"
            placeholder="请输入联系方式"
          />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="法人姓名：">
          <el-input
            v-model="vehiclemsgList.farendaibiao"
            placeholder="请输入法人姓名"
          />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="法人身份证号：">
          <el-input
            v-model="vehiclemsgList.farenshenfenzheng"
            placeholder="请输入法人身份证号"
          />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="法人电话：">
          <el-input
            v-model="vehiclemsgList.farendianhua"
            placeholder="请输入法人电话"
          />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="企业安全负责人电话：">
          <el-input
            v-model="vehiclemsgList.securityofficertelephone"
            placeholder="请输入企业安全负责人电话"
          />
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
import { companyUpdate } from "@/api/daily/vehicle";
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
  mounted() {},
  methods: {
    // 提交
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.updatedisable = true;
          this.updateLoading = true;
          companyUpdate(this.vehiclemsgList).then((res) => {
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
  },
};
</script>

<style lang="scss" scoped></style>
