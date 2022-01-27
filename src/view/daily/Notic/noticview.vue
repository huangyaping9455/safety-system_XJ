<template>
  <el-dialog
    title="查看"
    :visible.sync="viewVisible"
    width="65%"
    top="10vh"
    center
  >
    <el-form
      ref="form"
      :model="form"
      label-width="110px"
      style="height:470px;overflow-y: auto;"
    >
      <el-col :span="8">
        <el-form-item label="送达单位：">
          <el-input v-model="form.songdadanwei" />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="主题名称：">
          <el-input v-model="form.zhutimingcheng" />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="发起单位：">
          <el-input v-model="form.fasongdanwei" />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="发送时间：">
          <el-input v-model="form.caozuoshijian" />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="整改时间：">
          <el-input v-model="form.zhenggaishijian" />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="回复有效期：">
          <el-input v-model="form.huifuyouxiaoqi" />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="是否回执：">
          <el-input v-model="form.isback" />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="主题正文：">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 2 }"
            v-model="form.zhutizhengwen"
          />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="回复时间：">
          <el-input v-model="form.huifushijian" />
        </el-form-item>
      </el-col>
      <el-col :span="16">
        <el-form-item label="回复内容：">
          <el-input v-model="form.huifuzhengwen" />
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="附件：">
          <img
            v-if="dialogImageUrl === '' && urlType === ''"
            src="@/assets/daily/nodata.png"
            alt=""
            style="height:180px;width:27%;border:1px solid #DCDFE6;"
          />
          <img
            v-else-if="
              dialogImageUrl !== '' && (urlType === 'jpg' || urlType === 'png')
            "
            :src="dialogImageUrl"
            alt=""
            style="height:180px;width:27%;"
          />
          <a v-else :href="dialogImageUrl" target="_blank">{{ urlName }}</a>
        </el-form-item>
      </el-col>
    </el-form>
  </el-dialog>
</template>

<script>
import { getOne } from "@/api/daily/notice";
export default {
  data() {
    return {
      viewVisible: false,
      form: {},
      dialogImageUrl: "",
      urlType: "",
      urlName: "",
      dialogVisible: false,
    };
  },
  mounted() {},
  methods: {
    getOneTongZhi(ids) {
      getOne({ id: ids }).then((res) => {
        if (res.data.data.zhuangtai == 0) {
          res.data.data.isback = "否";
        } else {
          res.data.data.isback = "是";
        }
        this.form = res.data.data;
        this.dialogImageUrl = res.data.data.fujian;
        this.urlName = this.strhandle(res.data.data.fujian, "/");
        this.urlType = this.strhandle(this.urlName, ".");
      });
    },
    strhandle(str, name) {
      let index = str.lastIndexOf(`${name}`);
      str = str.substring(index + 1, str.length);
      return str;
    },
  },
};
</script>

<style lang="scss" scoped></style>
