<template>
  <el-dialog :title="typee" :visible.sync="addVisible" top="7vh" width="25%">
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      :disabled="typee === '查看'"
      label-width="auto"
    >
      <el-form-item label="学习主题" prop="learnTheme">
        <el-input
          style="width: 100%;"
          v-model="form.learnTheme"
          placeholder="请输入学习主题"
        ></el-input>
      </el-form-item>
      <el-form-item label="学习地点" prop="luser">
        <el-input
          style="width: 100%;"
          v-model="form.luser"
          placeholder="请输入学习地点"
        ></el-input>
      </el-form-item>
      <el-form-item label="主持人" prop="compere">
        <el-input
          style="width: 100%;"
          v-model="form.compere"
          placeholder="请输入主持人"
        ></el-input>
      </el-form-item>
      <el-form-item label="学习月份" prop="lmonth">
        <el-input
          v-if="typee === '查看'"
          style="width: 100%;"
          v-model="form.lmonth"
        ></el-input>
        <i-date
          v-else
          format="MM"
          type="month"
          size="large"
          placement="bottom-end"
          v-model="form.lmonth"
          placeholder="请选择学习月份"
          style="width: 100%;"
        ></i-date>
      </el-form-item>
      <el-form-item label="学习时长" prop="learntime">
        <el-input
          style="width: 100%;"
          v-model="form.learntime"
          type="number"
          placeholder="请输入学习时长"
        >
          <template slot="append">分钟</template></el-input
        >
      </el-form-item>
      <el-form-item label="学习内容">
        <el-input
          style="width: 100%;"
          v-model="form.learncontent"
          placeholder="请输入学习内容"
        ></el-input>
      </el-form-item>
      <el-form-item label="参会人员" prop="users">
        <el-input
          v-if="typee === '查看'"
          style="width: 100%;"
          v-model="form.username"
        ></el-input>
        <el-select
          v-else
          v-model="form.users"
          multiple
          placeholder="请选择参会人员"
          style="width: 100%;"
          value-key="id"
          @change="peopleChange"
        >
          <el-option
            :label="item.jiashiyuanxingming"
            :value="item"
            v-for="(item, index) in peopleList"
            :key="index"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="上传照片">
        <el-image
          v-if="typee === '查看'"
          style="width: 100px; height: 100px"
          :src="form.img"
          fit="cover"
        ></el-image>
        <el-upload
          v-else
          action="/api/blade-upload/upload/upload?fileId=zhaopian&table=study"
          :on-success="handlesuccess"
          :headers="headers"
          list-type="picture"
          :limit="1"
          :multiple="false"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
        >
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </el-form-item>
    </el-form>
    <span slot="footer" v-if="typee !== '查看'" class="dialog-footer">
      <el-button @click="addVisible = false">取 消</el-button>
      <el-button type="primary" @click="onSubmit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import dayjs from "dayjs";
import { getToken } from "@/util/auth";
import {
  getDriverByDeptIdList,
  studyDownInsert,
  studyDownDetail,
} from "@/api/daily/education";
export default {
  props: {
    typee: {
      type: String,
    },
  },
  data() {
    return {
      addVisible: false,
      form: {},
      dialogImageUrl: "",
      dialogVisible: false,
      headers: {
        "blade-auth": "Bearer " + getToken(),
      },
      rules: {
        learnTheme: [
          { required: true, message: "请输入学习主题", trigger: "blur" },
        ],
        luser: [{ required: true, message: "请输入学习地点", trigger: "blur" }],
        compere: [{ required: true, message: "请输入主持人", trigger: "blur" }],
        lmonth: [
          { required: true, message: "请选择学习月份", trigger: "blur" },
        ],
        learntime: [
          { required: true, message: "请输入学习时长", trigger: "blur" },
        ],
        users: [{ required: true, message: "请选择参会人员", trigger: "blur" }],
      },
      peopleList: [],
      userList: [],
    };
  },
  methods: {
    //上传成功
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 上传成功
    handlesuccess(file) {
      this.$message.success("上传成功");
      this.form.img = file.url;
    },
    // 删除上传
    handleRemove() {
      this.form.img = "";
    },
    // 确定
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          let ids = "";
          let names = "";
          this.userList.forEach((item) => (ids += `${item.id},`));
          this.userList.forEach(
            (item) => (names += `${item.jiashiyuanxingming},`)
          );
          this.form.userid = ids;
          this.form.username = names;
          delete this.form.users;
          this.form.lmonth = dayjs(this.form.lmonth).format("MM");
          this.form.lyear = dayjs().format("YYYY");
          this.form.deptid = this.$store.getters.deptId;
          this.form.deptname = this.$store.getters.deptName;
          this.form.learnStudy = "线下学习";
          studyDownInsert(this.form).then((res) => {
            if (res.data.code === 200) {
              this.addVisible = false;
              this.$parent.selectPersonLearnRemarkAll();
            } else {
              this.$message.error("操作失败");
            }
          });
        }
      });
    },
    // 获取参会人员
    getDriverByDeptIdList() {
      getDriverByDeptIdList(this.$store.getters.deptId).then((res) => {
        this.peopleList = res.data.data;
      });
    },
    // 获取详情
    getStudyDownDetail(id, deptid) {
      studyDownDetail(id, deptid).then((res) => {
        this.form = res.data.data;
      });
    },
    // 人员变化
    peopleChange(val) {
      this.userList = val;
    },
  },
};
</script>

<style></style>
