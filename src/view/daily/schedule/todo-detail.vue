<template>
  <div v-if="state" class="w100 h100 todo-detail">
    <i-form ref="form" class="form" :model="form" :rules="ruleValidate">
      <scroll>
        <i-spin v-show="loading" fix></i-spin>
        <div class="row">
          <i-formitem class="input-box w45" label="安排人：" prop="anpairen">
            <i-input v-model="form.anpairen" readonly></i-input>
          </i-formitem>
          <i-formitem class="input-box w45" label="责任人：" prop="zerenrenId">
            <i-select v-model="form.zerenrenId" label-in-value @on-change="zerenrenChange">
              <i-option
                v-for="(item,index) in userList"
                :key="index"
                :value="item.value"
              >{{ item.label }}</i-option>
            </i-select>
          </i-formitem>
          <i-formitem class="input-box w70" label="执行人：" prop="$zhixingrenIds">
            <i-select
              v-model="form.$zhixingrenIds"
              multiple
              label-in-value
              @on-change="zhixingrensChange"
            >
              <i-option
                v-for="(item,index) in userList"
                :key="index"
                :value="item.value"
              >{{ item.label }}</i-option>
            </i-select>
          </i-formitem>
          <i-formitem class="input-box w30 check-leave">
            <i-check v-model="form.$isZhongyao">重要</i-check>
            <i-check v-model="form.$isJinji">紧急</i-check>
          </i-formitem>
        </div>
        <table border class="w100">
          <tbody>
            <tr>
              <td class="required-mark">任务标题</td>
              <td>
                <i-formitem prop="renwubiaoti">
                  <i-input v-model="form.renwubiaoti"></i-input>
                </i-formitem>
              </td>
            </tr>
            <tr>
              <td class="required-mark">任务内容</td>
              <td>
                <i-formitem prop="renwuneirong">
                  <i-input v-model="form.renwuneirong" type="textarea" :autosize="{minRows: 4}"></i-input>
                </i-formitem>
              </td>
            </tr>
            <tr>
              <td>任务总结</td>
              <td>
                <i-input v-model="form.ziwozongjie" type="textarea" :autosize="{minRows: 4}"></i-input>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="row">
          <i-formitem class="input-box w70" label="任务地点：" prop="renwudidian">
            <i-input v-model="form.renwudidian"></i-input>
          </i-formitem>
          <i-formitem class="input-box w70" label="任务时间：" prop="$taskTime">
            <i-date v-model="form.$taskTime" type="daterange" split-panels transfer></i-date>
          </i-formitem>
          <i-formitem class="input-box w70" label="任务类型：" prop="renwuleixing">
            <i-select v-model="form.renwuleixing">
              <i-option
                v-for="(item,index) in taskType"
                :key="index"
                :value="item.value"
              >{{ item.label }}</i-option>
            </i-select>
          </i-formitem>
          <i-formitem class="input-box w70" label="任务进度：" prop="isFinish">
            <i-select v-model="form.isFinish">
              <i-option
                v-for="(item,index) in finishList"
                :key="index"
                :value="item.value"
              >{{ item.label }}</i-option>
            </i-select>
          </i-formitem>
          <!-- <div class="input-box w70">
            <div class="label">参考方案：</div>
          </div>-->
        </div>
      </scroll>
    </i-form>
    <div class="btn-panel">
      <i-button type="primary" icon="md-close" @click="close">关闭</i-button>
      <i-button
        v-if="state.submit"
        type="primary"
        icon="md-checkmark"
        @click="submit"
      >{{state.title}}</i-button>
    </div>
  </div>
</template>
 
<script>
import dayjs from 'dayjs';
import { getDicData } from '@/api/config';
import { getUsersByDept } from '@/api/user';
import {
  getRichengDetail,
  updateRicheng,
  addRicheng
} from '@/api/daily/schedule';
import { toDoRuleValidate } from '@/const/todo';

export default {
  name: 'todo-detail',
  props: {
    value: Object
  },
  data() {
    return {
      deptId: this.$store.getters.deptId,
      form: {},
      ruleValidate: toDoRuleValidate,
      add: {
        title: '新增',
        to: this.toInit,
        submit: addRicheng
      },
      edit: {
        title: '编辑',
        to: this.toEdit,
        submit: updateRicheng
      },
      view: {
        title: '查看',
        to: this.toEdit
      },
      loading: false,
      taskType: [],
      userList: [],
      finishList: [{ label: '完成', value: 1 }, { label: '待办', value: 0 }]
    };
  },
  computed: {
    state() {
      return this[this.value.state];
    }
  },
  watch: {
    value() {
      if (this.taskType.length == 0) {
        this.getDicData();
      }
      if (this.userList.length == 0) {
        this.getUsersByDept();
      }
      this.state.to();
    },
    state() {
      if (this.$refs.form) {
        this.$refs.form.resetFields();
      }
    }
  },
  mounted() {
    this.toInit();
  },
  methods: {
    // 获取任务类型
    getDicData() {
      getDicData('taskType').then(res => {
        this.taskType = res.data.data;
      });
    },
    // 获取所属人员
    getUsersByDept() {
      getUsersByDept(this.deptId).then(res => {
        this.userList = res.data.data.map(item => {
          return {
            label: item.name,
            value: item.id
          };
        });
      });
    },
    // 初始化表单
    toInit() {
      this.form = {
        deptId: this.deptId,
        anpairen: this.$store.getters.userInfo.userName,
        anpairenId: this.$store.getters.userInfo.userId,
        isFinish: 0
      };
    },
    // 编辑
    toEdit() {
      this.loading = true;
      getRichengDetail(this.value.item.id).then(res => {
        let data = res.data.data;
        data.$isZhongyao = data.isZhongyao == 1;
        data.$isJinji = data.isJinji == 1;
        data.$zhixingrenIds = data.zhixingrenIds.split(',').map(n => Number(n));
        data.$taskTime = [data.renwukaishishijian, data.renwujiezhishijian];
        this.form = data;
        this.loading = false;
      });
    },
    // 责任人变化
    zerenrenChange(item) {
      if (item) {
        this.form.zerenren = item.label;
      }
    },
    // 执行人变化
    zhixingrensChange(arr) {
      this.form.zhixingrens = arr.map(item => item.label).join();
      this.form.zhixingrenIds = arr.map(item => item.value).join();
    },
    // 提交
    submit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          let data = this.form;
          data.isZhongyao = data.$isZhongyao ? 1 : 0;
          data.isJinji = data.$isJinji ? 1 : 0;
          data.renwukaishishijian = dayjs(data.$taskTime[0]).format(
            'YYYY-MM-DD'
          );
          data.renwujiezhishijian = dayjs(data.$taskTime[1]).format(
            'YYYY-MM-DD'
          );
          this.state.submit(data).then(res => {
            let type = res.data.success ? 'success' : 'error';
            this.$message[type](res.data.msg);
            this.close();
            this.$emit('update');
          });
        } else {
          this.$message.warning('请正确填写表单信息!');
        }
      });
    },
    close() {
      this.$refs.form.resetFields();
      this.$emit('close');
    }
  }
};
</script>
 
<style lang="scss"  >
@import 'S/mixin.scss';

.todo-detail {
  $label-w: 90px;

  .row {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin: 0px 10px 20px 10px;
  }

  .ivu-form-item-content,
  .ivu-date-picker-rel,
  .ivu-date-picker {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
  }

  .check-leave {
    .ivu-form-item-content {
      justify-content: flex-end;
    }
    .ivu-checkbox {
      margin-right: 5px;
    }
  }
  .ivu-input,
  .ivu-select-selection {
    font-size: 15px;
    border: none;
    border-radius: 0px;
    border-bottom: 1px solid #ddd;
    &:focus {
      border-bottom: 1px solid $highlight-color !important;
      outline: none;
      box-shadow: none;
    }
  }
  .ivu-select-selected-value {
    font-size: 15px !important;
  }
  .ivu-form-item-label {
    width: $label-w;
    font-weight: 800;
    white-space: nowrap;
    font-size: 15px;
  }

  .input-box {
    display: flex;
    align-items: center;
    margin-bottom: 30px;

    .label + div {
      width: calc(100% - #{$label-w});
    }
  }
  table {
    border-collapse: collapse;
    margin-bottom: 30px;
    tr,
    td {
      border: 1px solid #ddd;
    }
    td:nth-child(1) {
      @extend .ivu-form-item-label;
      padding: 0px 10px;
    }

    .ivu-input {
      border-bottom: none;
      height: 40px;
    }
    .ivu-form-item {
      margin-bottom: 0;
    }
    .ivu-form-item-error-tip {
      position: static;
    }
  }
  .form {
    height: calc(100% - 60px);
    padding: 20px 0px;
  }
  .btn-panel {
    display: flex;
    align-items: center;
    height: 60px;
    button {
      margin-right: 10px;
    }
  }
}
</style>