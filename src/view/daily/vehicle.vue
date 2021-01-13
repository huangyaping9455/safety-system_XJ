<template>
  <div class="iframe-page">
    <i-spin v-show="loading" fix></i-spin>
    <iframe
      v-show="!loading"
      name="iframe"
      class="w100"
      src="http://222.82.236.242:8896/"
      frameborder="0"
      @load="iframeReady"
    ></iframe>
  </div>
</template>

<script>
export default {
  name: "vehicle",
  data() {
    return {
      loading: true,
    };
  },
  mounted() {
    window.addEventListener(
      "message",
      (e) => {
        let action = e.data.action;
        let params = e.data.params;
        this[action] && this[action](params);
      },
      false
    );
  },
  methods: {
    routerReady() {
      this.loading = false;
    },
    iframeReady() {
      let data = {
        action: "loginByIframe",
        params: {
          username: "admin",
          password: "admin",
          path: "/daily/vehicle/vehicle",
        },
      };
      window.frames["iframe"].postMessage(data, "*");
    },
  },
};
</script>

<style lang="scss">
.iframe-page {
  width: 100%;
  height: 100%;
  position: relative;
  iframe {
    width: 100%;
    height: 100%;
  }
}
</style>
