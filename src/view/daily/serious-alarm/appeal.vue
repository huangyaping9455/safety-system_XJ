<template>
  <i-drawer :value="value" :title="title" :width="400" class="custom-drawer" @on-close="close">
    <i-spin v-show="loading" fix></i-spin>
    <div class="drawer-body edit dispose">
      <base-form ref="form" v-model="form" :column="column"></base-form>
    </div>
    <div class="drawer-footer">
      <i-button @click="close">取消</i-button>
      <i-button type="primary" @click="submit">申诉</i-button>
    </div>
  </i-drawer>
</template>
 
<script>
import { appealAlarm } from '@/api/daily/alarm';
import baseForm from 'C/base-form';
export default {
  name: 'alarm-dispose',
  components: {
    baseForm
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    active: {
      type: Object
    },
    selection: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      loading: false,
      form: {}
    };
  },
  computed: {
    // 名称
    title() {
      return `报警申诉 - 已勾选${this.selection.length}条报警信息`;
    },
    // 配置
    column() {
      return [
        {
          label: '申诉形式',
          key: 'chulixingshi',
          placeholder: '请输入申诉形式',
          type: 'text',
          rules: [
            {
              required: true,
              message: '请选择申诉形式',
              trigger: 'blur'
            }
          ]
        },
        {
          label: '申诉描述',
          key: 'chulimiaoshu',
          type: 'textarea',
          rules: [
            {
              required: true,
              message: '请输入申诉描述',
              trigger: 'blur'
            }
          ],
          autosize: { minRows: 2, maxRows: 10 }
        },
        {
          label: '申诉凭证',
          key: 'fujian',
          type: 'upload',
          display: this.selection.length <= 1,
          options: {
            table: 'baobiao_alarmvehdailyreport',
            prop: 'fujian',
            accept: 'image/*',
            format: ['jpg', 'png'],
            tip: '文件格式限制：.jpg,.png'
          }
        }
      ];
    }
  },
  methods: {
    close() {
      this.$refs.form.resetFields();
      this.$emit('input', false);
    },
    submit() {
      const is = this.$refs.form.validate();
      if (!is) return;
      this.loading = true;
      let ids = '';
      let fujian = '';
      this.selection.forEach(item => (ids += `${item.alarmReportID},`));
      this.form.fujian.forEach(v => (fujian += `${v.url.split('/').pop()},`));
      appealAlarm({
        ...this.form,
        ids,
        fujian,
        alarmType: this.active.text
      }).then(res => {
        if (res.data.success) {
          this.close();
          this.$message.success('申诉成功');
          this.$emit('appeal');
        }
        this.loading = false;
      });
    }
  }
};
</script>
 
<style lang="scss" >
</style>