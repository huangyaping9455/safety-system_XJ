<style lang="scss" scoped>
.boxinfo {
  display: flex;
  width: 27%;
  margin-right: 2%;
  height: 50%;
  flex-direction: column;
  justify-content: space-between;
  .title {
    color: #333333;
    font-size: 22px;
    font-weight: bold;
    text-align: center;
  }
  .form-box {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 0 0 60%;
  }
  .login-btn {
    width: 100%;
    height: 40px;
    color: #ffffff;
    background-image: linear-gradient(90deg, #34a1ff 0%, #44c9d7 100%);
  }
  .loginCode {
    display: flex;
    .ver-code {
      height: 32px;
      margin-left: 10px;
    }
  }
}
@media screen and (min-width: 1276px) and (max-width: 1528px) {
  .boxinfo {
    .title {
      font-size: 18px;
    }
    .login-btn {
      height: 32px;
      font-size: 12px;
    }
  }
}
</style>

<template>
  <!-- 登录框 -->
  <div class="boxinfo">
    <p class="title">欢迎登录</p>
    <i-form ref="form" class="form-box" :model="form" :rules="rule">
      <i-formitem prop="username">
        <i-input
          v-model="form.username"
          prefix="ios-contact-outline"
          placeholder="用户名"
        ></i-input>
      </i-formitem>
      <i-formitem prop="password">
        <i-input
          v-model="form.password"
          prefix="ios-lock-outline"
          type="password"
          placeholder="密码"
        ></i-input>
      </i-formitem>
      <i-formitem>
        <div class="loginCode">
          <i-input
            v-model="form.vercode"
            prefix="ios-key-outline"
            placeholder="验证码"
            @keyup.enter="login"
          ></i-input>
          <img :src="verCode" class="ver-code" @click="getVerificationCode" />
        </div>
      </i-formitem>
    </i-form>
    <i-button size="large" class="login-btn" :loading="loading" @click="login"
      >登录</i-button
    >
  </div>
</template>

<script>
import { verificationCode } from "@/api/user";
export default {
  name: "loginBox",
  data() {
    return {
      load: false,
      loading: false,
      form: {
        username: "",
        password: "",
        vercode: "",
      },
      rule: {
        username: [
          {
            required: true,
            message: "请输入登录帐号",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "请输入登录密码",
            trigger: "blur",
          },
        ],
      },
      verCode: "",
    };
  },
  computed: {},
  mounted() {
    if (this.$dev) {
      this.form.username = "admin";
      this.form.password = "123456";
    }
    document.onkeyup = () => {
      let key = window.event.keyCode;
      if (key == 13) {
        this.login();
      }
    };
    // 如果地址栏有携带参数，及在mounted里面执行login
    // if (unescape(window.location.href).split("?")[2] != undefined) {
    //   this.login();
    // } else {
    this.getVerificationCode();
    // }
  },
  methods: {
    getVerificationCode() {
      verificationCode().then((res) => {
        this.verCode = res.data.data;
      });
    },
    login() {
      this.$refs.form.validate((valid) => {
        if (!valid) return;
        this.loading = true;
        // // 添加登录页 加载
        // this.$parent.loa = true;
        this.$store
          .dispatch("LoginByUsername", this.form)
          .then(() => {
            this.$store.dispatch("GetMenu").then((data) => {
              this.$router.push({
                // path: data[0].path,
                path: "/daily",
              });
            });
          })
          .finally(() => {
            // 定时器
            // setTimeout(() => {
            this.loading = false;
            // this.$parent.loa = false; //登录页加载
            this.getVerificationCode();
            // }, 3000);
          });
      });
    },
  },
};
</script>

<style lang="scss">
@import "@/style/mixin.scss";
.boxinfo {
  .ivu-form-item-content {
    width: 100%;
  }
  .ivu-input {
    border-right: 0px;
    border-left: 0px;
    border-top: 0px;
  }
  .ivu-input:focus {
    box-shadow: none;
  }
}
</style>
