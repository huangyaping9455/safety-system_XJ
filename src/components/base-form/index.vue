<template>
  <div class="base-form">
    <i-form v-if="LOAD" ref="form" :model="value" :rules="rules">
      <i-formitem
        v-for="(item, index) in config"
        :key="item.key + 'i' + index"
        :label="item.label || item.title"
        :required="item.required"
        :prop="item.key"
        :class="item.type + '-item'"
        :style="getStyle(item)"
      >
        <!-- input -->
        <i-input
          v-if="isInput(item)"
          v-model="value[item.key]"
          v-bind="getAttr(item)"
        ></i-input>

        <!-- select -->
        <i-select
          v-if="item.type == 'select'"
          v-model="value[item.key]"
          v-bind="getAttr(item, ['options'])"
          v-on="item._on"
        >
          <i-option
            v-for="item in item.options"
            :key="item.value"
            :value="item.value"
            >{{ item.label }}</i-option
          >
        </i-select>

        <!-- date -->
        <i-date
          v-if="isDate(item)"
          v-model="value[item.key]"
          v-bind="getAttr(item)"
          split-panels
          transfer
          @on-change="value[item.key] = $event"
        ></i-date>

        <!-- checkbox -->
        <i-check v-if="item.type == 'checkbox'" v-model="value[item.key]">{{
          item.span
        }}</i-check>

        <!-- checkbox-group  导出字段-->
        <i-check
          :indeterminate="indeterminate"
          :checked="checkAll"
          v-if="item.type == 'check-group'"
          @on-change="handleCheckAll"
          :style="getStyle(item)"
          >全选</i-check
        >
        <i-check-group
          v-if="item.type == 'check-group'"
          v-model="value[item.obj]"
          @on-change="groupChange"
          :model.sync="value[item.obj]"
        >
          <i-check
            v-for="(item, index) in item.options"
            :key="index"
            :label="item.value"
            :style="getStyle(item)"
            >{{ item.label }}</i-check
          >
        </i-check-group>

        <!-- radio-group -->
        <i-radio-group
          v-if="item.type == 'radio-group'"
          v-model="value[item.key]"
        >
          <i-radio
            v-for="(item, i) in item.options"
            :key="i"
            :label="item.value"
            >{{ item.label }}</i-radio
          >
        </i-radio-group>

        <!-- number -->
        <i-number
          v-if="item.type == 'number'"
          v-model="value[item.key]"
          v-bind="getAttr(item)"
        ></i-number>

        <!-- upload -->
        <base-upload
          v-if="item.type == 'upload'"
          v-model="value[item.key]"
          :option="item.options"
        ></base-upload>

        <!-- slider -->
        <i-slider
          v-if="item.type == 'slider'"
          v-model="value[item.key]"
          v-bind="getAttr(item)"
        ></i-slider>

        <!-- slot -->
        <slot v-if="item.type == 'slot'" :name="item.key"></slot>
      </i-formitem>
    </i-form>
  </div>
</template>

<script>
import baseUpload from "./base-upload";
export default {
  name: "base-form",
  components: {
    baseUpload,
  },
  props: {
    value: {
      type: Object,
    },
    column: {
      type: Array,
      default: () => new Array(),
    },
  },
  data() {
    return {
      indeterminate: true,
      checkAll: true,
      LOAD: false,
      rules: {},
      chang: "",
      // checkAllGroup: this.value.fields,
    };
  },
  computed: {
    config() {
      return this.column.filter((item) => {
        return item.display == undefined ? true : item.display;
      });
    },
  },
  watch: {
    config: {
      immediate: true,
      handler: "initConfig",
    },

    value() {
      this.LOAD = false;
      this.$nextTick(this.initConfig);
    },
  },
  mounted() {
    // this.groupChange();
  },
  methods: {
    initConfig() {
      this.column.forEach((item) => {
        let key = item.key;
        if (this.value[key] == undefined) {
          let value = item.defaultValue || "";
          if (item.type == "number") value = 0;
          if (item.type == "upload") value = [];
          // if (item.type == "check-group") value = this.column[3].options;
          this.$set(this.value, key, value);
        }
        if (item.type == "select" && item.remoteMethod) {
          item.remoteMethod = item.remoteMethod.bind(item);
        }
        if (item.on) {
          item._on = {};
          for (const key in item.on) {
            item._on[key] = item.on[key].bind(item, this.value);
          }
        }
        this.rules[key] = item.rules;
      });
      this.LOAD = true;
    },

    isInput(item) {
      let arr = ["text", "password", "textarea", "url", "email", "tel"];
      return arr.includes(item.type);
    },

    isDate(item) {
      let arr = [
        "date",
        "daterange",
        "datetime",
        "datetimerange",
        "year",
        "month",
      ];
      return arr.includes(item.type);
    },

    getStyle(item) {
      return {
        width: item.width || "100%",
      };
    },
    getAttr(item, keys = []) {
      let obj = {};
      for (const key in item) {
        if (!["key", "label", "rules", ...keys].includes(key)) {
          obj[key] = item[key];
        }
      }
      return obj;
    },

    resetFields() {
      this.$refs.form.resetFields();
    },

    validate(callback) {
      let is = false;
      this.$refs.form.validate((valid) => {
        is = valid;
        callback && callback(valid);
      });
      return is;
    },

    // dateChange(date, item) {
    //   console.log(date, item);
    //   this.value[item.key] = date;
    // },
    groupChange(data) {
      this.value.obj = data;
    },
    remoteMethod() {},
    handleCheckAll(data) {
      if (this.indeterminate) {
        this.checkAll = true;
      } else {
        this.checkAll = !this.checkAll;
      }
      this.indeterminate = false;
      if (data == true) {
        this.value.obj = this.value.fields;
      } else {
        this.value.obj = [];
      }
    },
  },
};
</script>

<style lang="scss">
.base-form {
  .ivu-form {
    display: flex;
    flex-wrap: wrap;
  }

  .ivu-date-picker,
  .ivu-upload {
    width: 100%;
  }

  .ivu-form-label-top {
    .ivu-form-item-label {
      padding: 10px 0px;
      font-weight: 600;
      font-size: 14px;
    }
  }
  .ivu-input-number {
    width: 100%;
  }
  .ivu-checkbox {
    margin-right: 5px;
  }

  .ivu-form-item {
    margin-bottom: 15px;
  }
  .ivu-select-dropdown {
    // min-width: 450px !important;
    left: 0 !important;
  }
}
</style>
