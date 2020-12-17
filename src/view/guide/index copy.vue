<template>
  <div class="guide wh100">
    <div class="wh100" :style="background">
      <div
        v-for="(item, i) in banners"
        v-show="index == i"
        :key="i"
        class="content"
      >
        <div class="img-shadow">
          <img :src="item.img" class="page-img" />
        </div>
      </div>
      <!-- 入口页 -->
      <entrance v-show="index == pages.length - 1"></entrance>
    </div>

    <div v-if="pages[index - 1]" class="arrows prev" @click="index--">
      <img src="~A/guide/left.png" alt />
      <span>{{ pages[index - 1].name }}</span>
    </div>
    <div v-if="pages[index + 1]" class="arrows next" @click="index++">
      <span>{{ pages[index + 1].name }}</span>
      <img src="~A/guide/right.png" alt />
    </div>
  </div>
</template>

<script>
export default {
  name: "guide",
  components: {
    entrance: () => import("./entrance.vue"),
  },
  data() {
    return {
      index: 0,
    };
  },
  computed: {
    pages() {
      let isPanel = this.$store.getters.permission.enterprise_panel;
      const pages = [
        {
          path: "bannner",
          img: this.$store.getters.userInfo.homePhoto,
          name: "企业理念",
        },
        {
          path: "bannner",
          img: this.$store.getters.userInfo.profilePhoto,
          name: "企业简介",
        },
        {
          path: "bannner",
          img: require("A/guide/platform-bg.png"),
          name: "运维平台",
        },
        {
          path: "entrance",
          img: isPanel
            ? require("A/guide/entrance-bg-sub.png")
            : require("A/guide/entrance-bg-sub.png"),
          name: "快速开始",
        },
        // {
        //   path: 'entrance',
        //   img: isPanel
        //     ? require('A/guide/entrance-bg.png')
        //     : require('A/guide/entrance-bg-sub.png'),
        //   name: '快速开始'
        // }
      ];
      return pages.filter((item) => item.img);
    },
    banners() {
      return this.pages.filter((item) => item.path == "bannner");
    },
    active() {
      return this.pages[this.index];
    },
    background() {
      return {
        background: `url('${this.active.img}') no-repeat top center`,
        transition: "all .8s",
      };
    },
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.index = from.path == "/login" ? 0 : vm.pages.length - 1;
    });
  },
  methods: {},
};
</script>

<style lang="scss">
@import "@/style/mixin.scss";

.guide {
  height: 100%;
  width: 100%;

  .img-shadow {
    z-index: 9;
    @include imgshaowd;
    .page-img {
      position: relative;
      margin: 0;
      max-width: 100%;
      max-height: 100%;
    }
  }

  .content {
    background: inherit;
    overflow: hidden;
    @include covered();
    @include box-center;
    @include groundglass(10px);
  }

  .prev {
    left: 0px;
    @include rhombusArrow(rgba(#fff, 0.9), right, 45px, 30px);
    &:hover {
      box-shadow: 3px 2px 10px rgba(black, 0.6);
      @include rhombusArrow(rgba(#fff, 1), right, 45px, 30px);
    }
  }

  .next {
    right: 0px;
    @include rhombusArrow(rgba(#fff, 0.9), left, 45px, 30px);
    &:hover {
      box-shadow: 3px 2px 10px rgba(black, 0.6);
      @include rhombusArrow(rgba(#fff, 1), left, 45px, 30px);
    }
  }

  .arrows {
    position: absolute;
    bottom: 20px;
    cursor: pointer;
    z-index: 9999;
    @include box-center;

    span {
      font-size: 20px;
      font-weight: 700;
    }
    img {
      height: 25px;
      margin: 0px 10px;
    }
  }
}
</style>
