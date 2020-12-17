<template>
  <i-drawer
    :value="value"
    width="50%"
    title="导出表格配置项"
    draggable
    class="custom-drawer export-csv"
    @on-close="close"
  >
    <i-spin v-show="loading" fix></i-spin>
    <div class="drawer-body">
      <base-form ref="form" v-model="form" :column="config">
        <div slot="total" class="total">
          <i-number v-model="form.total" :min="1" class="w100" :disabled="form.all"></i-number>
          <i-check v-model="form.all" label="全部" class="position">全部</i-check>
        </div>
      </base-form>
    </div>
    <div class="drawer-footer">
      <i-button @click="close">取消</i-button>
      <i-button type="primary" :loading="loading" @click="emitExport">导出</i-button>
      <json-excel
        ref="excel"
        class="hide"
        :data="excelData"
        :fields="excelColumns"
        :type="form.fileType"
        :name="form.fileName+'.'+form.fileType"
        :title="form.fileName+'表'"
        :before-finish="close"
      ></json-excel>
    </div>
  </i-drawer>
</template>
 
<script>
import baseForm from "C/base-form";
import JsonExcel from "vue-json-excel";

export default {
  name: "exprot-excel",
  components: {
    baseForm,
    JsonExcel,
  },
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    name: {
      type: String,
      default: "",
    },
    columns: {
      type: Array,
      default: () => new Array(),
    },
    export: {
      type: Function,
    },
  },
  data() {
    return {
      loading: false,
      form: {
        all: true,
        total: 1,
        fileName: "",
        fileType: "xls",
      },
      excelColumns: {},
      excelData: [],
    };
  },
  computed: {
    // 把列表配置转化为字段配置
    fieldColums() {
      return this.columns
        .filter((k) => k.key)
        .map((k) => {
          return {
            label: k.title,
            value: k.key,
            export: k.export,
            width: "180px",
          };
        });
    },
    // 表单全部配置
    config() {
      return [
        {
          label: "导出文件名称",
          key: "fileName",
          type: "text",
          placeholder: "输入导出文件名称",
          rules: {
            required: true,
            message: "文件名称不可为空",
            trigger: "blur",
          },
        },
        {
          label: "导出条数选择",
          key: "total",
          rules: {
            required: true,
            type: "number",
            min: 1,
            message: "导出条数不可为空",
            trigger: "blur",
          },
          type: "slot",
        },
        {
          label: "导出格式选择",
          key: "fileType",
          type: "radio-group",
          required: true,
          options: [
            {
              label: "xls",
              value: "xls",
            },
            {
              label: "xlsx",
              value: "xlsx",
            },
            {
              label: "csv",
              value: "csv",
            },
          ],
        },
        {
          label: "导出字段选择",
          obj: "obj",
          type: "check-group",
          options: this.fieldColums,
          rules: [
            {
              required: true,
              type: "array",
              min: 1,
              message: "请至少配置一个字段",
              trigger: "change",
            },
          ],
        },
      ];
    },
  },
  watch: {
    value() {
      this.loading = false;
    },

    name: {
      immediate: true,
      handler(newV) {
        this.form.fileName = newV;
      },
    },

    fieldColums: {
      immediate: true,
      handler(newV) {
        this.form.fields = newV
          .filter((k) => (k.export == undefined ? true : k.export))
          .map((k) => k.value);
      },
    },
  },
  methods: {
    close() {
      this.$emit("input", false);
      this.loading = false;
    },

    async emitExport() {
      // eslint-disable-next-line no-unused-vars
      var xlsxParam = { raw: true }; //转换成excel时，使用原始的格式
      const is = this.$refs.form.validate();
      if (!is) return;
      let total = this.form.all ? 0 : this.form.total;

      let map = {};
      this.fieldColums.forEach((k) => (map[k.value] = k));
      this.form.obj.forEach((k) => (this.excelColumns[map[k].label] = k));
      this.loading = true;
      this.form.obj = [];
      let { records } = await this.export({
        current: 0,
        size: 0,
        total,
      });

      this.excelData = records;
      if (records.length == 0) {
        this.excelData = [{}];
      }
      this.$nextTick(this.$refs.excel.generate);
    },
  },
};
</script>
 
<style lang="scss" >
.export-csv {
  .check-group-item {
    .ivu-form-item-label {
      width: 100%;
      text-align: left;
    }
  }
  .total {
    position: relative;
    .position {
      position: absolute;
      top: 0px;
      right: 0px;
    }
  }
}
</style>