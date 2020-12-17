<style lang="scss" scoped>
.login-page {
  background-image: url("~@/assets/guide/login_bg.png");
  background-size: 100% 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.login-box {
  width: 85%;
  height: 75%;
  align-items: flex-end;
  background-image: url("~@/assets/guide/login_bg1.png");
  background-size: 100% 100%;
}
</style>

<template>
  <div class="login-page w100 h100" v-loading="loa">
    <div class="login-box">
      <!-- 登录框 -->
      <login-box></login-box>
    </div>
  </div>
</template>

<script>
import loginBox from "./login-box";
export default {
  name: "login",
  components: {
    loginBox,
  },
  data() {
    return {
      loa: false, //加 整页加载效果
    };
  },
  computed: {
    pageImg() {
      return require("@/assets/guide/login-bg.png");
    },
  },
};
</script>
