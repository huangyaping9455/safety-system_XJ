<template>
  <i-drawer
    :value="value"
    :width="450"
    :title="title"
    class="custom-drawer"
    :draggable="isDraggable"
    @on-close="close"
  >
    <i-spin v-show="loading" fix></i-spin>
    <div class="drawer-body edit dispose">
      <base-form ref="form" v-model="formData" :column="formColums"></base-form>
    </div>
    <div class="drawer-footer">
      <i-button @click="close">取消</i-button>
      <i-button type="primary" @click="save">保存</i-button>
    </div>
  </i-drawer>
</template>
 
<script>
import baseForm from 'C/base-form';
export default {
  name: 'table-form',
  components: {
    baseForm
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '表单'
    },
    columns: {
      type: Array
    },
    data: {
      type: Object
    },
    submit: {
      type: Function
    },
    clone: {
      type: Boolean,
      default: true
    },
    isDraggable: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      formColums: [],
      formData: {},
      loading: false
    };
  },
  computed: {
    uploadKeys() {
      return this.formColums.filter(v => v.type == 'upload').map(v => v.key);
    }
  },
  watch: {
    data: {
      immediate: true,
      handler() {
        this.formData = this.clone ? Object.assign({}, this.data) : this.data;
        this.receiveHandle();
      }
    },
    columns: {
      immediate: true,
      handler() {
        this.formColums = this.columns
          .filter(v => v.formOpt)
          .map(v => {
            let label = v.title || v.label;
            let t = v.formOpt.type == 'select' ? '选择' : '输入';
            return {
              key: v.key,
              placeholder: `请${t}${label}`,
              label,
              ...v.formOpt
            };
          });
      }
    },
    uploadKeys: 'receiveHandle'
  },
  mounted() {},
  methods: {
    async save() {
      const is = this.$refs.form.validate();
      if (!is) return;
      let data = this.sendHandle();
      if (this.submit) {
        this.loading = true;
        let res = await this.submit(data);
        if (res && res.data.success) {
          this.$message.success(res.data.msg);
        }
        this.loading = false;
        this.$emit('input', false);
      }
      this.$emit('submit', data);
    },
    close() {
      this.$refs.form.resetFields();
      this.$emit('input', false);
      this.$emit('close');
    },

    sendHandle(data = this.formData, keys = this.uploadKeys) {
      let newData = Object.assign({}, data);
      keys.forEach(key => {
        let ids = '';
        let item = newData[key];
        if (!item) return;
        if (item.length && item.length > 0) {
          newData[key].forEach(file => {
            ids += `${file.url.split('/').pop()},`;
          });
        }
        newData[key] = ids;
      });
      return newData;
    },

    receiveHandle(data = this.formData, keys = this.uploadKeys) {
      keys.forEach(key => {
        let item = data[key];
        if (item == undefined || Array.isArray(item)) return;
        try {
          data[key] = item.length == 0 ? [] : JSON.parse(item);
        } catch (error) {
          data[key] = [];
          console.error(key + '报错：' + error);
        }
      });
      return data;
    }
  }
};
</script>
 
<style lang="scss" >
</style>