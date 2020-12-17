<template>
  <div class="login-page">
    <div class="top-content">
      <!-- <i-spin v-show="load" fix></i-spin> -->
      <img :src="pageImg" class="w100 h100" />
    </div>
    <div class="bottom-content">
      <!-- 登录框 -->
      <login-box></login-box>
    </div>
  </div>
</template>

<script>
import loginBox from "./login-box";
export default {
  name: "loginByDG",
  components: {
    loginBox,
  },
  data() {
    return {};
  },
  computed: {
    pageImg() {
      return require("@/assets/guide/login-bg.png");
    },
  },
};
</script>
