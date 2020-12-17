<template>
  <div class="app-main">
    <!-- 侧边菜单 -->
    <div v-if="isShowMenu" :class="sideMenuClass">
      <!-- 标志 -->
      <div class="top-menu-item">
        <div v-show="expansion" class="expansion-mark">
          <img src="~A/index/icon/icon_arrow_left.png" @click="toggleMenu" />
        </div>
        <div v-show="!expansion" class="collapsed-mark" @click="toggleMenu">
          <img src="~A/index/icon/icon_today.png" />
        </div>
      </div>
      <hidden-scroll>
        <!-- 展开的菜单栏 -->
        <i-menu v-show="expansion" class="expansion-menu" accordion width="220px">
          <sub-menu v-for="item in menu" :key="item.menu" :data="item" @on-click="menuClick"></sub-menu>
        </i-menu>

        <!-- 收缩的菜单栏 -->
        <div v-show="!expansion" class="collapsed-menu">
          <float-menu v-for="item in menu" :key="item.menu" :data="item" @on-click="menuClick"></float-menu>
        </div>
      </hidden-scroll>
    </div>

    <!-- 内容页 -->
    <div :class="mainViewClass">
      <router-view></router-view>
    </div>
  </div>
</template>
 
<script>
import { mapGetters } from 'vuex';
import hiddenScroll from 'C/hidden-scroll';
import subMenu from './sub-menu';
import floatMenu from './float-menu';
export default {
  name: 'index',
  components: {
    hiddenScroll,
    subMenu,
    floatMenu
  },
  data() {
    return {
      expansion: false,
      active: {
        name: '日程安排'
      }
    };
  },
  computed: {
    ...mapGetters(['topHeadMenu']),
    menu() {
      return this.topHeadMenu.children || [];
    },
    isShowMenu() {
      return this.menu.length > 0;
    },
    mainViewClass() {
      let name = this.expansion ? 'expansion-main' : 'collapsed-main';
      let className = this.isShowMenu ? name : 'w100';
      return ['h100', className];
    },
    sideMenuClass() {
      return [
        'side-menu',
        this.expansion ? 'side-expansion-menu' : 'side-collapsed-menu'
      ];
    }
  },
  methods: {
    toggleMenu() {
      this.expansion = !this.expansion;
    },
    menuClick(item) {
      this.active = item;
      this.$store.commit('SET_CURRENT_MENU', item);
      // 运维端页面 -- 内嵌 iframe
      if (item.routerType == 1) {
        this.$store.commit('SET_PAGE_PARAMS', {
          path: item.iframePath
        });
      }
      this.$router.push({ path: item.path });
    }
  }
};
</script>
 
<style lang="scss" >
@import 'S/mixin.scss';

.app-main {
  width: 100%;
  height: calc(100% - 100px);
  padding: 10px;
  display: flex;

  .hidden-scroll {
    height: calc(100% - 50px);
  }

  // 侧边栏
  .side-menu {
    margin-right: 10px;
    background: #d5eaff;
  }

  // 菜单顶级
  .top-menu-item {
    width: 100%;
    height: 50px;
    font-size: 16px;
    border-bottom: 1px solid $primary-color;
    font-weight: 700;
    letter-spacing: 2px;
    overflow: hidden;
    white-space: nowrap;
    cursor: pointer;
    @include box-center;

    // .expansion-mark,
    .collapsed-mark {
      @include box-center;
    }
    .expansion-mark {
      display: flex;
      justify-content: flex-end;
      width: 100%;
      height: 100%;
      flex-direction: row;
      background: linear-gradient(
        45deg,
        #3080fb 0%,
        #3080fb 40%,
        #d5ebff 40%,
        #d5ebff 100%
      );
    }
  }

  // 展开菜单
  .side-expansion-menu {
    width: $menu-expansion-w;
    .expansion-menu {
      width: $menu-expansion-w;
      overflow: hidden;
      background: #d5eaff;
    }

    .ivu-menu-vertical .ivu-menu-item,
    .ivu-menu-vertical .ivu-menu-submenu-title {
      padding: 10px 20px;
    }

    [deep='1'] {
      background: rgba($primary-color, 0);
      color: $primary-color;
      .ivu-menu-submenu-title {
        background: none;
      }
    }

    [deep='2'] {
      background: rgba($primary-color, 0.5);
      color: white;
      .ivu-menu-submenu-title {
        background: none;
      }
    }

    [deep='3'] {
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
      .ivu-menu-item {
        font-size: 14px;
        display: flex;
        align-items: center;
        overflow: hidden;
      }
      .custom-icon {
        width: 28px;
        margin-right: 4px;
      }
      .name {
        white-space: nowrap;
      }
      .ivu-menu-item-active:not(.ivu-menu-submenu) {
        background: #fed016;
        font-weight: 700;
        color: white;
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
    overflow: hidden;
  }

  .collapsed-main {
    width: calc(100% - #{$menu-collapsed-w+10});
    transition: all 0.3s;
    overflow: hidden;
  }
}
</style>