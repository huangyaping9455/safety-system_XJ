<template>
  <div class="wh100 white-bg user-page">
    <icon type="md-close" @click="$router.go(-1)" />
    <i-divider orientation="left" class="title">修改密码</i-divider>
    <div class="w50">
      <base-form ref="form" v-model="form" :column="formConfig"></base-form>
    </div>
    <i-button type="primary" @click="submit">确定</i-button>
  </div>
</template>
 
<script>
import { changepassword } from '@/api/user';
import baseForm from 'C/base-form';
export default {
  name: 'user',
  components: {
    baseForm
  },
  data() {
    return {
      form: {},
      formConfig: [
        {
          label: '原密码',
          key: 'oldPassword',
          type: 'password',
          rules: {
            required: true,
            message: '原密码不可为空',
            trigger: 'blur'
          }
        },
        {
          label: '新密码',
          key: 'newPassword',
          type: 'password',
          rules: {
            required: true,
            message: '原密码不可为空',
            trigger: 'blur'
          }
        },
        {
          label: '确认密码',
          key: 'confirm',
          type: 'password',
          rules: {
            required: true,
            message: '确认密码不可为空',
            trigger: 'blur'
          }
        }
      ]
    };
  },
  methods: {
    submit() {
      let is = this.$refs.form.validate();
      if (!is) return;
      let userId = this.$store.getters.userInfo.userId;
      let oldpassWord = this.form.oldPassword;
      let passWord = this.form.newPassword;
      if (passWord == this.form.confirm) {
        changepassword(userId, oldpassWord, passWord).then(res => {
          this.$message({
            message: res.data.msg,
            type: 'success'
          });
        });
      } else {
        this.$message.error('确认密码和新密码不相同');
      }
    }
  }
};
</script>
 
<style lang="scss" >
.user-page {
  padding: 20px 20px;
  position: relative;
  .title {
    color: #409eff;
    font-size: 18px;
  }
  .ivu-icon-md-close {
    position: absolute;
    right: 10px;
    top: 10px;
    font-size: 25px;
    cursor: pointer;
    &:hover {
      color: #409eff;
    }
  }
  button {
    margin-top: 10px;
  }
}
</style>