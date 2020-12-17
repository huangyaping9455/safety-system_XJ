<template>
  <div class="wh100 preview-doc">
    <div class="head">
      <p>
        {{ active.name }}
        <icon v-if="active.path" type="ios-link" @click="download" />
      </p>
      <div class="icons">
        <i-tooltip :content="move ? '取消滑动预览' : '滑动预览'">
          <icon type="md-move" :class="{ active: move }" @click="toogelMove" />
        </i-tooltip>
      </div>
    </div>
    <div :class="['body', { 'move-cursor': move }]">
      <i-spin v-show="loading" fix size="large"></i-spin>
      <scroll ref="scroll" :ops="scrollOps">
        <div class="printConent wh100">
          <img
            v-for="(src, index) in files"
            v-show="!loading"
            :src="src"
            :key="index"
            :style="printStyle"
          />
        </div>
      </scroll>
    </div>
    <div class="foot">
      <div class="btn">
        <i-button v-if="closeBtn" @click="close">关闭</i-button>
        <i-button v-if="printBtn" type="primary" @click="print">打印</i-button>
      </div>
      <div v-if="info" class="info">
        <span>累计访问次数：{{ Math.abs(active.cumulativeVisits) }}</span>
        <span>最新访问时间：{{ active.lastPreviewTime }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "preview-doc",
  components: {},
  props: {
    active: {
      type: Object,
      default: () => new Object(),
    },

    action: {
      type: Function,
    },

    closeBtn: {
      type: Boolean,
      default: true,
    },

    printBtn: {
      type: Boolean,
      default: true,
    },

    info: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      loading: false,
      move: false,

      printStyle: {
        "page-break-after": "always",
        width: "100%",
      },

      scrollOps: {
        vuescroll: {
          mode: "native",
          scroller: {
            bouncing: {
              top: 50,
              bottom: 50,
              left: 0,
              right: 0,
            },
            locking: true,
            minZoom: 1,
            maxZoom: 1,
          },
        },
      },
    };
  },
  computed: {
    files() {
      return this.active._fileList || [];
    },
  },
  watch: {
    active() {
      this.preview();
    },
  },
  methods: {
    download() {
      axios({
        url: "/api/blade-platform/platform/baobiaowenjian/preview",
        method: "post",
        params: {
          fileType: 4,
          id: this.active.id,
        },
      }).then((res) => {
        if (!res.data.data.path) {
          this.$message.warning("暂不支持下载");
          return;
        }
        window.location.href =
          "http://222.82.236.242:8894/" + res.data.data.path; //this.$store.state.user.userInfo.urlPrefix
      });
    },

    close() {
      this.$emit("close-view");
    },

    toogelMove() {
      this.move = !this.move;
      this.scrollOps.vuescroll.mode = this.move ? "slide" : "native";
    },

    print() {
      if (!this.active._fileList) {
        this.$message.info({
          content: "无文件可打印！",
          duration: 3,
        });
        return;
      }
      let printConent = document.querySelector(".printConent").cloneNode(true);
      let newWindow = window.open("", "_blank");
      newWindow.document.querySelector("body").appendChild(printConent);
      newWindow.document.title = `文件打印-${this.active.name}`;
      this.$nextTick(() => {
        newWindow.print();
        newWindow.close();
      });
    },

    preview() {
      this.loading = true;
      if (this.active._fileList) {
        setTimeout(() => {
          this.loading = false;
        }, 200);
        return;
      }

      if (this.action) {
        this.action()
          .then((res) => {
            let data = res.data.data;
            this.$set(this.active, "_fileList", data.imgList);
            this.$set(this.active, "lastPreviewTime", data.lastPreviewTime);
            this.$set(this.active, "cumulativeVisits", data.cumulativeVisits);
            this.loading = false;
          })
          .catch(() => {
            this.loading = false;
          });
      }
    },
  },
};
</script>

<style lang="scss">
@import "@/style/mixin.scss";

.preview-doc {
  $head-h: 40px;
  display: flex;
  flex-direction: column;

  .head {
    height: $head-h;
    padding: 0px 20px;
    font-weight: 600;
    letter-spacing: 1px;
    @include box-center($justify: space-between, $align: center);
    p {
      font-size: 20px;
      @include ellipsis;
    }

    .ivu-icon {
      font-size: 18px;
      cursor: pointer;
    }
    .ivu-icon.active {
      color: $primary-color;
    }
    .icons {
      display: flex;
      font-size: 18px;
      i {
        margin-left: 10px;
      }
    }
  }

  .foot {
    height: 50px;
    display: flex;
    padding: 0px 20px;
    align-items: center;
    justify-content: space-between;
    button,
    .info span {
      margin-right: 10px;
    }
  }

  .body {
    height: calc(100% - 90px);
    width: 100%;
    border-top: 1px solid #cccccc;
    position: relative;
    border-bottom: 1px solid #cccccc;
  }
  .move-cursor {
    cursor: move;
  }
  .btn-box {
    height: 40px;
    min-height: 40px;
    border-top: 1px solid #cccccc;
    @include box-center($justify: false, $align: center);
    .btn-size {
      width: 15%;
      margin-left: 10px;
    }
  }
  .__view {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    img {
      max-width: 100%;
    }
  }
}
</style>
