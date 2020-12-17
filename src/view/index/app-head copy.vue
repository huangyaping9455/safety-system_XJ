<template>
  <div class="app-head">
    <div class="logo">
      <img v-if="pageImg" :src="pageImg" alt />
      <img v-else src="@/assets/index/logo1.png" alt />
      <!-- <span v-else>{{$store.getters.deptName}}</span> -->
    </div>
    <!-- 菜单 -->
    <div class="menu">
      <div
        v-for="(item, index) in menu"
        :key="index"
        :class="['menu-item', { active: active.id === item.id }]"
        @click="menuClick(item, index)"
      >
        <span>{{ item.name }}</span>
        <div class="border"></div>
      </div>
    </div>
  </div>
</template>
 
<script>
import { mapGetters } from 'vuex';
export default {
  name: 'app-head',
  data() {
    return {};
  },
  computed: {
    ...mapGetters(['menu']),
    pageImg() {
      return this.$store.getters.userInfo.logoPhoto;
    },
    active() {
      return (
        this.menu.find(item => {
          return this.$route.fullPath.indexOf(item.path) !== -1;
        }) || {}
      );
    }
  },
  watch: {
    active: {
      immediate: true,
      handler: function(newV) {
        this.$store.commit('SET_TOPHEAD_MENU', newV);
      }
    }
  },
  mounted() {
    this.$store.dispatch('GetMenu');
  },
  methods: {
    menuClick(item) {
      this.$router.push({
        path: item.path
      });
    }
  }
};
</script>
 
<style lang="scss" >
@import 'S/mixin.scss';

.app-head {
  height: $app-head-h;
  padding: 0px 20px;
  background: #2877fe;
  display: flex;
  justify-content: space-between;
  /* background: url('~A/index/header-bg.png') no-repeat; */
  background-image: linear-gradient(90deg, #34a1ff 0%, #44c9d7 100%);
  .logo {
    display: flex;
    align-items: center;
    font-size: 22px;
    color: black;
    letter-spacing: 2px;
    img{
      height: 70%;
    }
  }

  .active {
    color: #fed016;

    .border {
      position: absolute;
      left: -10%;
      bottom: 0px;
      width: 120%;
      height: 5px;
      background: #fed016;
      border-radius: 3px;
    }
  }

  .menu {
    display: flex;
    flex-grow: 1;
    justify-content: flex-end;
    color: white;
    background: none;

    .menu-item {
      height: inherit;
      line-height: $app-head-h;
      margin: 0px 2%;
      padding: 0px 10px;
      font-size: 18px;
      cursor: pointer;
      position: relative;
      letter-spacing: 1px;
      white-space: nowrap;
      &:hover {
        @extend .active;
      }
    }
  }
}
</style>