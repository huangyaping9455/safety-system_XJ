<template>
  <el-dialog
    title="添加隐患排查"
    :visible.sync="addVisible"
    top="7vh"
    width="35%"
  >
    <el-form ref="form" :model="form" label-width="100px">
      <el-form-item label="隐患名称">
        <el-radio-group v-model="form.troubleMc">
          <el-radio label="车辆检查"></el-radio>
          <el-radio label="培训情况"></el-radio>
          <el-radio label="档案缺项"></el-radio>
          <el-radio label="抽检未达标"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="隐患来源">
        <el-radio-group v-model="form.troubleLy">
          <el-radio label="出车三检"></el-radio>
          <el-radio label="车辆检查"></el-radio>
          <el-radio label="车辆维护"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="隐患等级">
        <el-radio-group v-model="form.troubleDj">
          <el-radio label="1">一级</el-radio>
          <el-radio label="2">二级</el-radio>
          <el-radio label="3">三级</el-radio>
          <el-radio label="4">四级</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="发现日期">
        <el-date-picker
          type="date"
          format="yyyy-MM-dd"
          placeholder="选择日期"
          style="width: 100%;"
          v-model="form.troubleFxsj"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="发现人">
        <el-input
          type="input"
          v-model="form.troubleFxr"
          placeholder="请输入隐患发现人"
        ></el-input>
      </el-form-item>
      <el-form-item label="责任人">
        <el-input
          type="input"
          v-model="form.troubleZrr"
          placeholder="请输入隐患责任人"
        ></el-input>
      </el-form-item>
      <el-form-item label="限期整改时间">
        <el-date-picker
          type="date"
          format="yyyy-MM-dd"
          placeholder="选择限期整改时间"
          style="width: 100%;"
          v-model="form.troubleXqzgsj"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="隐患描述">
        <el-input
          type="textarea"
          v-model="form.troubleYhms"
          placeholder="请输入隐患描述"
        ></el-input>
      </el-form-item>
      <el-form-item label="整改措施">
        <el-input
          type="textarea"
          v-model="form.troubleZgcs"
          placeholder="请输入整改措施"
        ></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="addVisible = false">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import dayjs from "dayjs"; //troubleInsert
import { troubleInsert } from "@/api/daily/trouble";
export default {
  data() {
    return {
      addVisible: false,
      form: {
        troubleMc: "",
        troubleLy: "",
        troubleDj: "",
        troubleFxsj: "",
        troubleFxr: "",
        troubleZrr: "",
        troubleXqzgsj: "",
        troubleYhms: "",
        troubleZgcs: "",
      },
    };
  },
  methods: {
    submit() {
      this.form.troubleFxsj =
        this.form.troubleFxsj == ""
          ? ""
          : dayjs(this.form.troubleFxsj).format("YYYY-MM-DD");
      this.form.troubleXqzgsj =
        this.form.troubleXqzgsj == ""
          ? ""
          : dayjs(this.form.troubleXqzgsj).format("YYYY-MM-DD");
      this.form.comId = this.$store.getters.deptId;
      this.form.createUserid = this.$store.getters.userInfo.userId;
      troubleInsert(this.form).then((res) => {
        if (res.data.code === 200) {
          this.addVisible = false;
          this.$parent.getTroubleList();
        } else {
          this.$message.error("新增失败");
        }
      });
    },
  },
};
</script>

<style></style>
