<template>
  <i-modal
    :footer-hide="true"
    :value="value"
    :width="600"
    class="custom-drawer"
    :mask-closable="false"
    :closable="false"
    @on-close="close"
  >
    <span class="tital">处理</span>
    <i-spin v-show="loading" fix></i-spin>
    <div class="drawer-body edit dispose">
      <base-form ref="form" v-model="form" :column="column"></base-form>
    </div>
    <div class="footer-btn">
      <i-button style="width:100px;margin-right:30px" @click="close"
        >取消</i-button
      >
      <i-button style="width:100px" type="primary" @click="submit"
        >处理</i-button
      >
    </div>
  </i-modal>
</template>

<script>
import { disposeAlarm } from "@/api/daily/alarm";
import baseForm from "C/base-form";
export default {
  name: "alarm-dispose",
  components: {
    baseForm,
  },
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    active: {
      type: Object,
    },
    selection: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      loading: false,
      form: {},
    };
  },
  computed: {
    // 名称
    title() {
      // return `报警处理 - 已勾选${this.selection.length}条报警信息`;
    },
    // 配置
    column() {
      return [
        {
          label: "处理形式",
          key: "chulixingshi",
          placeholder: "请选择处理形式",
          type: "select",
          rules: [
            {
              required: true,
              message: "请选择处理形式",
              trigger: "blur",
            },
          ],
          options: [
            {
              value: "警告",
              label: "警告",
            },
            {
              value: "罚款",
              label: "罚款",
            },
            {
              value: "停班",
              label: "停班",
            },
            {
              value: "再教育",
              label: "再教育",
            },
            {
              value: "其它",
              label: "其它",
            },
          ],
        },
        {
          label: "处理描述",
          key: "chulimiaoshu",
          type: "textarea",
          rules: [
            {
              required: true,
              message: "请输入处理描述",
              trigger: "blur",
            },
          ],
          autosize: { minRows: 2, maxRows: 10 },
        },
        {
          label: "处理凭证(文件格式限制：.jpg,.png)",
          key: "fujian",
          type: "upload",
          display: this.selection,
          options: {
            table: "baobiao_alarmvehdailyreport",
            prop: "fujian",
            accept: "image/*",
            format: ["jpg", "png"],
            // tip: '文件格式限制：.jpg,.png'
          },
        },
      ];
    },
  },
  methods: {
    close() {
      this.$refs.form.resetFields();
      this.$emit("input", false);
    },
    submit() {
      const is = this.$refs.form.validate();
      if (!is) return;
      this.loading = true;
      let ids = "";
      let fujian = "";
      this.selection.forEach((item) => (ids += `${item.alarmReportID},`));
      // this.form.fujian.forEach(v => (fujian += `${v.url.split('/').pop()},`));
      this.form.fujian.forEach((v) => (fujian += v.url + ","));
      disposeAlarm({
        ...this.form,
        fujian,
        ids,
        alarmType: this.active.text,
      }).then((res) => {
        if (res.data.success) {
          this.close();
          this.$message.success("处理成功");
          this.$emit("dispose");
        }
        this.loading = false;
      });
    },
  },
};
</script>

<style lang="scss">
.tital {
  color: #3c86f4;
  font-weight: bold;
  display: block;
  text-align: center;
  margin: 15px 0;
  font-size: 18px;
  letter-spacing: 20px;
}
.footer-btn {
  text-align: center;
}
</style>
