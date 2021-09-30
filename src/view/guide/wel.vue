<template>
  <div class="wel-body">
    <span>加载中，请稍后···</span>
    <img src="@/assets/guide/loading2.gif" alt="" />
  </div>
</template>

<script>
import { config } from "@/const/config";
export default {
  data() {
    return {};
  },
  mounted() {
    setTimeout(this.login(), 5000);
    // this.login();
  },
  methods: {
    login() {
      let formData = {
        username: this.GetParameter("username"), //JSON.parse(config.aesDecrypt(res.data))
        password: this.GetParameter("password"),
        vercode: "",
        type: 1,
      };
      this.$store
        .dispatch("LoginByUsername", formData)
        .then(() => {
          this.$store.dispatch("GetMenu").then((data) => {
            this.$router.push({
              path: "/daily",
            });
          });
        })
        .finally(() => {});
    },
    // 解析url地址
    GetParameter(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(r[2]);
      return null;
    },
  },
};
</script>

<style lang="scss" scoped>
.wel-body {
  width: 100%;
  height: 100vh;
  background-image: url("../../assets/guide/wel.png");
  background-size: 100% 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  span {
    font-size: 5vmin;
    color: white;
  }
  img {
    width: 20%;
    height: 17vmin;
  }
}
</style>
