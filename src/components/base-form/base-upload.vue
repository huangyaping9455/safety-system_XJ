<template>
  <div class="base-upload">
    <i-upload
      v-if="option"
      with-credentials
      type="drag"
      :show-upload-list="false"
      :headers="headers"
      :action="action"
      :multiple="option.multiple"
      :data="option.data"
      :format="option.format"
      :accept="option.accept"
      :max-size="option.maxSize"
      :on-format-error="formatError"
      :on-exceeded-size="exceededError"
      :before-upload="uploadBefore"
      :on-success="uploadSuccess"
      :on-error="uploadError"
    >
      <div style="padding: 20px 0">
        <icon type="ios-cloud-upload" size="52" style="color: #3399ff"></icon>
        <p>点击或者拖拽进行上传</p>
      </div>
      <div v-if="option.tip" slot="tip">{{ option.tip }}</div>
    </i-upload>
    <div v-for="(n, i) in getFiles()" :key="i" class="file-item">
      <span>{{ n.name }}</span>
      <icon type="md-close" @click="removeFile(i)" />
    </div>
  </div>
</template>

<script>
import { getToken } from "@/util/auth";
export default {
  name: "base-upload",
  props: {
    option: {
      type: Object,
    },
    value: [String, Array],
  },
  data() {
    return {
      loading: false,
    };
  },
  computed: {
    action() {
      const base = "/api/blade-upload/upload/upload";
      const op = this.option;
      const action = op.action;
      return action ? action : `${base}?fileId=${op.prop}&table=${op.table}`;
    },

    headers() {
      return {
        "blade-auth": "Bearer " + getToken(),
      };
    },
  },
  methods: {
    uploadBefore(file) {
      let { maxNumber, manualUpload } = this.option;

      if (this.value.length >= maxNumber) {
        this.$message.warning(`最多只能上传${maxNumber}个文件`);
        return false;
      }

      if (manualUpload) {
        this.manualUploadBefore(file);
        return false;
      }
      this.$spin.show();
    },

    manualUploadBefore(file) {
      let { format, maxSize } = this.option;

      if (format) {
        let is = this.option.format.find(
          (v) => v.indexOf(file.name.split(".").pop()) !== -1
        );
        if (is == undefined) {
          return this.formatError();
        }
      }
      if (maxSize && file.size / 1024 > maxSize) {
        return this.exceededError();
      }
      this.value.push({
        name: file.name,
        file: file,
      });
    },

    getFiles() {
      if (this.value === undefined || this.option.showList === false) return [];
      return Array.isArray(this.value) ? this.value : JSON.parse(this.value);
    },

    removeFile(i) {
      this.value.splice(i, 1);
    },

    uploadError() {
      this.$message.error("上传失败");
      this.$spin.hide();
    },

    uploadSuccess(data) {
      this.$spin.hide();
      if (data.url && data.savename) {
        this.value.push(data);
        this.$message.success("上传成功");
      }
      if (this.option.onSuccess) {
        this.option.onSuccess(data);
      }
    },

    formatError() {
      this.$spin.hide();
      let type = this.option.format.toString();
      this.$message.warning(`只能上传${type}文件格式`);
    },

    exceededError() {
      this.$spin.hide();
      let size = Math.floor(this.option.maxSize / 1024);
      this.$message.warning(`最大只能上传${size}MB的文件`);
    },
  },
};
</script>

<style lang="scss">
.base-upload {
  .file-item {
    border: 1px dashed #dcdee2;
    padding: 0px 10px;
    font-size: 12px;
    height: 25px;
    margin-bottom: 5px;
    line-height: 25px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .ivu-icon-md-close {
    cursor: pointer;
  }
}
</style>
