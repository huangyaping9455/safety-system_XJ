<template>
  <!-- 登录框 -->
  <div>
    <i-form ref="form" class="form-box" :model="form" :rules="rule">
      <i-formitem prop="username" class="input-box">
        <i-input
          v-model="form.username"
          prefix="md-person"
          placeholder="用户名"
        ></i-input>
      </i-formitem>
      <i-formitem prop="password" class="input-box">
        <i-input
          v-model="form.password"
          prefix="md-lock"
          type="password"
          placeholder="密码"
        ></i-input>
      </i-formitem>
      <i-formitem class="input-box">
        <i-input
          v-model="form.vercode"
          placeholder="验证码"
          @keyup.enter="login"
        >
          <div slot="prepend">
            <img :src="verCode" class="ver-code" @click="getVerificationCode" />
          </div>
        </i-input>
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
      this.form.username = "zkxtgly";
      this.form.password = "123456";
    }
    document.onkeyup = () => {
      let key = window.event.keyCode;
      if (key == 13) {
        this.login();
      }
    };
    this.getVerificationCode();
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
        this.$store
          .dispatch("LoginByUsername", this.form)
          .then(() => {
            this.$router.push({
              // path: '/guide'
              path: "/daily/",
            });
          })
          .finally(() => {
            this.loading = false;
            this.getVerificationCode();
          });
      });
    },
  },
};
</script>

<style lang="scss">
@import "@/style/mixin.scss";
</style>
