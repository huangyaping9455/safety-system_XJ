<template>
  <div class="iframe-page">
    <!-- <icon type="md-close-circle" class="close" size="30" @click="toBack" /> -->
    <i-spin v-show="loading" fix></i-spin>
    <iframe
      name="iframe"
      class="w100"
      :src="iframeUrl"
      frameborder="0"
      @load="emitEvent"
    ></iframe>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "iframePage",
  data() {
    return {
      loading: true,
    };
  },
  computed: {
    ...mapGetters(["pageParams", "postId"]),
    iframeUrl() {
      // return 'http://192.168.10.37:8081/';
      // return "http://60.171.241.126:2010";
      return "http://222.82.236.242:8892";
    },
  },
  watch: {
    pageParams() {
      this.emitEvent();
    },
    postId(newV) {
      this.emitEvent({
        action: "iframeOnGetUserInfo",
        params: newV,
      });
    },
  },
  beforeMount() {
    window.addEventListener("message", this.onEvent, false);
  },
  beforeDestroy() {
    window.removeEventListener("message", this.onEvent);
  },
  methods: {
    // 监听 iframe 发回的事件
    onEvent(e) {
      if (e.data.flag === "safety-system") {
        let action = e.data.action;
        let params = e.data.params;
        this[action] && this[action](params);
      }
    },
    // 提交 event
    emitEvent({ toPath, action, params } = {}) {
      this.loading = true;
      window.frames["iframe"].postMessage(
        {
          load: false,
          flag: "safety-system",
          account: {
            ...this.$store.state.user.account,
            status: 1,
          },
          path: toPath || this.pageParams.path,
          action: action || this.pageParams.action,
          params: params || this.pageParams.params,
        },
        "*"
      );
    },
    // 返回
    toBack() {
      this.$router.go(-1);
    },
    // 到达目标页面
    routerReady() {
      this.loading = false;
    },
  },
};
</script>

<style lang="scss">
.iframe-page {
  width: 100%;
  height: 100%;
  position: relative;
  .close {
    position: absolute;
    right: 0px;
    top: 0px;
    cursor: pointer;
  }
  iframe {
    width: 100%;
    height: 100%;
  }
  .ivu-spin-fix {
    background: white;
  }
}
</style>
