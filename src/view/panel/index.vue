<template>
  <div class="inside-index">
    <div class="inside-index-top"></div>
    <div class="content">
      <div class="content-top">
        <img class="home-btn" src="~A/panel/home.png" @click="toHome()" />
        <router-view></router-view>
      </div>
      <div class="content-bottom">
        <div class="button-box">
          <div
            v-for="(item, index) in buttonList"
            :key="index"
            :class="['button-info', { checked: isCheck == index }]"
            @click="toView(item, index)"
          >
            <img :src="isCheck == index ? item.active : item.icon" />
            <span>{{ item.text }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "inside-index",
  data() {
    return {
      isCheck: 0,
      buttonList: [
        {
          icon: require("@/assets/panel/qiyeqingkuang.png"),
          active: require("@/assets/panel/qiyeqingkuang-h.png"),
          text: "企业基本情况",
          to: "/panel/enterprise-condition",
        },
        {
          icon: require("@/assets/panel/qiyexianzhung.png"),
          active: require("@/assets/panel/qiyexianzhung-h.png"),
          text: "企业经营状况",
        },
        {
          icon: require("@/assets/panel/chelaingqiangkaung.png"),
          active: require("@/assets/panel/chelaingqiangkaung-h.png"),
          text: "车辆基本情况",
        },
        {
          icon: require("@/assets/panel/congyerenyuan.png"),
          active: require("@/assets/panel/congyerenyuan-h.png"),
          text: "从业人员情况",
        },
        {
          icon: require("@/assets/panel/qiyeqingkuang.png"),
          active: require("@/assets/panel/qiyeqingkuang-h.png"),
          text: "会议安全",
        },
        {
          icon: require("@/assets/panel/chelaingrenyuan.png"),
          active: require("@/assets/panel/chelaingrenyuan-h.png"),
          text: "车辆人员实时监控",
          // to: 'personnel-monitoring'
        },
        {
          icon: require("@/assets/panel/shuangcongyufang.png"),
          active: require("@/assets/panel/shuangcongyufang-h.png"),
          text: "双重预防体系",
        },
        {
          icon: require("@/assets/panel/anquanjiaoyu.png"),
          active: require("@/assets/panel/anquanjiaoyu-h.png"),
          text: "安全教育培训",
        },
        {
          icon: require("@/assets/panel/shigutongji.png"),
          active: require("@/assets/panel/shigutongji-h.png"),
          text: "事故统计处理",
        },
        {
          icon: require("@/assets/panel/yingjijiuyuan.png"),
          active: require("@/assets/panel/yingjijiuyuan-h.png"),
          text: "应急救援",
          to: "/panel/rescue",
        },
      ],
    };
  },
  computed: {},
  methods: {
    toView(item, index) {
      if (item.to) {
        this.isCheck = index;
        this.$router.push({
          path: item.to,
        });
      } else {
        this.$message.warning("该模块暂未开放");
      }
    },
    toHome() {
      this.$router.push({
        path: "/guide",
      });
    },
  },
};
</script>
<style lang="scss">
@import "@/style/mixin.scss";
.inside-index {
  width: 1920px;
  height: 100%;
  min-height: 950px;
  background: url("~A/panel/panel-bg.png") no-repeat top center;
  background-attachment: fixed;
  position: relative;
  .inside-index-top {
    background: url("~A/panel/panel-top.png") no-repeat center;
    min-width: 1200px;
    min-height: 74px;
  }
  .content {
    width: calc(100% - 20px);
    height: calc(100% - 94px);
    margin: 10px auto;
    .content-top {
      width: 100%;
      height: 72%;
      box-sizing: border-box;
      display: flex;
      .home-btn {
        position: absolute;
        right: 22%;
        cursor: pointer;
      }
    }
    .content-bottom {
      width: 100%;
      height: 28%;
      background: url("~A/panel/panel-line.png") no-repeat top center;
      background-position: top;
      box-sizing: border-box;
      padding: 36px;
      .button-box {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;

        .button-info {
          width: 344px;
          height: 68px;
          color: #fff;
          background: url("~A/panel/button-bg.png") no-repeat top center;
          background-size: contain;
          text-align: center;
          line-height: 68px;
          margin: 10px 0;
          font-size: 20px;
          cursor: pointer;
          img {
            width: 26px;
            vertical-align: sub;
            margin: 0 6px;
          }
        }
        .checked {
          background: url("~A/panel/button-bg-h.png") no-repeat top center;
          background-size: contain;

          color: #050d1f;
        }
      }
    }
  }
  // 内业公用样式
  .color-yellow {
    color: #fec62a;
    margin-left: 6px;
  }
  .color-bule {
    color: #07ffff;
    margin-left: 6px;
  }
  .color-royalblue {
    color: #0a95fe;
    margin-left: 6px;
  }
  .color-green {
    color: #0afe6c;
  }
  .color-red {
    color: red;
  }
  .inside-box {
    width: 100%;
    height: 100%;
    display: flex;
  }
  // 左边
  .top-left {
    width: 20%;
    height: 100%;
  }
  // 中间
  .top-center {
    width: 60%;
    height: 100%;
    background: url("~A/panel/zuos-jiao.png") top left no-repeat,
      url("~A/panel/youx-jiao.png") bottom right no-repeat;
    .container {
      width: 100%;
      height: calc(100% - 60px);
    }
    .num-bottom {
      display: flex;
      justify-content: center;
      font-size: 16px;
      color: #fff;
      height: 60px;
      align-items: center;
      & > div {
        margin: 0px 20px;
      }
      b {
        font-size: 20px;
        color: #07ffff;
      }
    }
  }
  // 右边
  .top-right {
    width: 20%;
    height: 100%;
  }
  .info-chunk {
    width: 100%;
    height: 50%;
    box-sizing: border-box;
    .info-title {
      color: #fff;
      height: 30px;
      font-size: 16px;
      line-height: 30px;
      padding-left: 6px;
    }
    .chunk-body {
      height: calc(100% - 30px);
      width: 100%;
      overflow: auto;
    }
  }
}
</style>
