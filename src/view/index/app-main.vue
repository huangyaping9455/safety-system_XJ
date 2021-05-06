<template>
  <div class="app-main">
    <!-- 侧边菜单 -->
    <div
      v-if="isShowMenu"
      :class="sideMenuClass"
      style="background:linear-gradient(#44c9d7, #34a1ff);height: calc(100% - 30px);"
    >
      <!-- 标志 -->
      <!-- <div class="top-menu-item">
        <div v-show="expansion" class="expansion-mark">
          <img src="~A/index/icon/icon_arrow_left.png" @click="toggleMenu" />
        </div>
        <div v-show="!expansion" class="collapsed-mark" @click="toggleMenu">
          <img src="~A/index/icon/icon_today.png" />
        </div>
      </div> -->
      <div class="logo">
        <img src="@/assets/index/logo5.png" alt />
      </div>
      <scroll class="hidden-scroll">
        <!-- 展开的菜单栏 -->
        <i-menu
          v-show="expansion"
          class="expansion-menu"
          :open-names="[openName]"
          accordion
        >
          <sub-menu
            v-for="item in menu"
            :key="item.menu"
            :data="item"
            @on-click="menuClick"
          ></sub-menu>
        </i-menu>

        <!-- 收缩的菜单栏 -->
        <div v-show="!expansion" class="collapsed-menu">
          <float-menu
            v-for="item in menu"
            :key="item.menu"
            :data="item"
            @on-click="menuClick"
          ></float-menu>
        </div>
      </scroll>
    </div>
    <!-- 内容页 -->
    <div :class="mainViewClass">
      <app-head></app-head>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import hiddenScroll from "C/hidden-scroll";
import subMenu from "./sub-menu";
import floatMenu from "./float-menu";
import appHead from "./app-head";
import AppHead from "./app-head.vue";
export default {
  name: "index",
  components: {
    hiddenScroll,
    subMenu,
    floatMenu,
    appHead,
    AppHead,
  },
  data() {
    return {
      expansion: true,
      active: {
        name: "首页",
      },
      openName: "",
    };
  },
  computed: {
    ...mapGetters(["topHeadMenu", "currentMenu"]),
    menu() {
      return this.topHeadMenu || [];
    },
    isShowMenu() {
      return this.menu;
    },
    // openName(){},
    mainViewClass() {
      let name = this.expansion ? "expansion-main" : "collapsed-main";
      let className = this.isShowMenu ? name : "w100";
      return ["h100", className];
    },
    sideMenuClass() {
      return [
        "side-menu",
        this.expansion ? "side-expansion-menu" : "side-collapsed-menu",
      ];
    },
  },
  mounted() {
    // console.log(this);
  },
  methods: {
    toggleMenu() {
      this.expansion = !this.expansion;
    },
    menuClick(item) {
      this.active = item;
      this.openName = item.name;
      this.$store.commit("SET_CURRENT_MENU", item);
      // 运维端页面 -- 内嵌 iframe
      if (item.routerType == 1) {
        this.$store.commit("SET_PAGE_PARAMS", {
          path: item.iframePath,
        });
      }
      if (item.name === "物流通") {
        window.location.href =
          "http://www.zhwlt.cn/v2/page/login/login.html?username='18666666666'&threePwd='123456'";
      }
      this.$router.push({ path: item.path });
    },
  },
};
</script>

<style lang="scss">
@import "S/mixin.scss";

.app-main {
  width: 100%;
  height: calc(100%);
  /* padding: 10px; */
  display: flex;
  .logo {
    height: 6rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 22px;
    color: black;
    letter-spacing: 2px;
    img {
      // height: 46%;
      height: 90%;
      width: 90%;
      margin-top: 1rem;
    }
  }
  .hidden-scroll {
    height: calc(100% - 84px) !important;
    ul {
      // background: linear-gradient(#42c5db, #3db8e8);
      // background: linear-gradient(#42c5db, #1fb5ef);
      background: linear-gradient(#42c5db, #39aef1);
      li {
        div {
          div {
            span {
              color: white;
            }
            img {
              color: white;
            }
          }
          i {
            color: white;
          }
        }
      }
      div :first-of-type {
        li {
          div {
            i {
              display: none;
            }
          }
        }
      }
    }
  }

  // 侧边栏
  .side-menu {
    box-shadow: rgba(64, 158, 255, 0.2) 0 2px 12px 0;
  }

  // 菜单顶级
  // .top-menu-item {
  //   width: 100%;
  //   height: 50px;
  //   font-size: 16px;
  //   border-bottom: 1px solid $primary-color;
  //   font-weight: 700;
  //   letter-spacing: 2px;
  //   overflow: hidden;
  //   white-space: nowrap;
  //   cursor: pointer;
  //   @include box-center;

  //   // .expansion-mark,
  //   .collapsed-mark {
  //     @include box-center;
  //   }
  //   .expansion-mark {
  //     display: flex;
  //     justify-content: flex-end;
  //     width: 100%;
  //     height: 100%;
  //     flex-direction: row;
  //     background: linear-gradient(
  //       45deg,
  //       #3080fb 0%,
  //       #3080fb 40%,
  //       #d5ebff 40%,
  //       #d5ebff 100%
  //     );
  //   }
  // }

  // 展开菜单
  .side-expansion-menu {
    // width: $menu-expansion-w;
    width: 12%;
    .expansion-menu {
      // width: 12% + 1 !important;
      width: calc(100% + 1px) !important;
      overflow: hidden;
      /* background: #d5eaff; */
    }

    .ivu-menu-vertical .ivu-menu-item,
    .ivu-menu-vertical .ivu-menu-submenu-title {
      padding: 1rem;
      padding-left: 4vh !important;
    }

    [deep="1"] {
      background: rgba($primary-color, 0);
      /* color: $primary-color; */
      .ivu-menu-submenu-title {
        background: none;
      }
      // .ivu-menu-opened {
      //   background: #3ba0c4;
      //   font-weight: 700;
      //   color: white;
      // }
    }

    [deep="2"] {
      // background: #01a0ff85;
      font-weight: 700;
      color: white;
      .ivu-menu-submenu-title {
        background: none;
      }
    }

    [deep="3"] {
      background: rgba($primary-color, 0.3);
      color: white;
      .ivu-menu-submenu-title {
        background: none;
      }
    }

    .ivu-menu-submenu-title {
      &:hover {
        color: inherit;
      }
    }
    .ivu-menu {
      z-index: 6;
      .ivu-menu-item {
        font-size: 14px;
        display: flex;
        align-items: center;
        overflow: hidden;
      }
      .custom-icon {
        width: 30px;
        height: 30px;
        margin-bottom: 0.6rem;
        margin-right: 4px;
      }
      .name {
        white-space: nowrap;
        font-size: 1.5vh;
      }
      .ivu-menu-item-active {
        background: #3ba0c4;
        color: white;
      }
      .ivu-menu-submenu .ivu-menu-opened {
        background: #3ba0c4;
        font-weight: 700;
        color: white;
      }
      .ivu-menu-submenu ul {
        background: #01a0ff85;
      }
    }
  }

  // 悬浮菜单
  .side-collapsed-menu {
    width: $menu-collapsed-w;
    .collapsed-menu {
      width: #{$menu-collapsed-w + 2};

      .ivu-dropdown {
        width: 100%;
      }

      .ivu-dropdown-rel {
        width: 100%;
      }

      .ivu-dropdown-item:hover {
        background: none;
      }
    }
  }

  .expansion-main {
    width: calc(100% - #{$menu-expansion-w+10});
    transition: all 0.3s;
    // padding: 20px;
    padding: 2px 0;
    overflow: hidden;
  }

  .collapsed-main {
    width: calc(100% - #{$menu-collapsed-w+10});
    transition: all 0.3s;
    overflow: hidden;
  }
}
</style>
