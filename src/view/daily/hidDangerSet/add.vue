<template>
  <el-dialog
    title="添加隐患排查"
    :visible.sync="addVisible"
    top="7vh"
    width="25%"
  >
    <el-form ref="form" :model="form" label-width="auto">
      <el-form-item label="制度名称">
        <el-select
          v-model="form.ruleName"
          placeholder="请选择制度名称"
          style="width: 100%;"
        >
          <el-option label="车辆检查" value="车辆检查"></el-option>
          <el-option label="培训情况" value="培训情况"></el-option>
          <el-option label="档案缺项" value="档案缺项"></el-option>
          <el-option label="抽检未达标" value="抽检未达标"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="制度来源">
        <el-select
          v-model="form.ruleSource"
          placeholder="请选择制度来源"
          style="width: 100%;"
        >
          <el-option label="出车三检" value="出车三检"></el-option>
          <el-option label="车辆检测" value="车辆检测"></el-option>
          <el-option label="车辆维护" value="车辆维护"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="隐患等级">
        <el-select
          v-model="form.ruleLevel"
          placeholder="请选择隐患等级"
          style="width: 100%;"
        >
          <el-option label="一级" value="1"></el-option>
          <el-option label="二级" value="2"></el-option>
          <el-option label="三级" value="3"></el-option>
          <el-option label="四级" value="4"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="开始阈值">
        <el-input-number
          controls-position="right"
          style="width: 100%;"
          v-model="form.ruleStartnum"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="结束阈值">
        <el-input-number
          controls-position="right"
          style="width: 100%;"
          v-model="form.ruleEndnum"
        ></el-input-number>
      </el-form-item>

      <el-form-item label="判断符号">
        <el-select
          v-model="form.ruleSymbol"
          placeholder="请选择判断符号"
          style="width: 100%;"
        >
          <el-option label="小于" value="1"></el-option>
          <el-option label="小于等于" value="2"></el-option>
          <el-option label="大于" value="3"></el-option>
          <el-option label="大于等于" value="4"></el-option>
          <el-option label="至" value="5"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="判断单位">
        <el-select
          v-model="form.ruleUnit"
          placeholder="请选择判断单位"
          style="width: 100%;"
        >
          <el-option label="日" value="1"></el-option>
          <el-option label="月" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="制度说明">
        <el-input
          type="textarea"
          v-model="form.ruleText"
          placeholder="请输入制度说明"
        ></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="addVisible = false">取 消</el-button>
      <el-button type="primary" @click="onSubmit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import {
  troubleruledetail,
  troubleruleInsert,
  troublerule,
} from "@/api/daily/trouble";
export default {
  data() {
    return {
      addVisible: false,
      form: {},
      isadd: true,
    };
  },
  methods: {
    troubleruledetail(id) {
      troubleruledetail(id).then((res) => {
        if (res.data.code === 200) {
          this.form = res.data.data;
        } else {
          this.$message.error("查询详情失败");
        }
      });
    },
    // 确定
    onSubmit() {
      let isApi;
      if (this.isadd === true) {
        isApi = troubleruleInsert;
      } else {
        isApi = troublerule;
      }
      isApi(this.form).then((res) => {
        if (res.data.code === 200) {
          this.addVisible = false;
          this.$parent.getTroubleSetList();
        } else {
          this.$message.error("操作失败");
        }
      });
    },
  },
};
</script>

<style></style>
