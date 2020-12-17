<template>
  <div class="entrance wh100">
   <!-- <div v-if="isPanel" class="panel-block">
      <p class="panel">
        <img src="~A/guide/panel.png" alt />
      </p>
      <div class="top-btn link">
        <router-link to="/panel/enterprise-condition">企业展板</router-link>
      </div>
    </div> -->
    <div class="richang-block">
      <p class="richang">
        <img src="~A/guide/richang.png" alt />
      </p>
      <router-link to="/daily">
        <div class="left-btn link">日常管理</div>
      </router-link>
    </div>
    <div class="guanli-block">
      <p class="guanli">
        <img src="~A/guide/guanli.png" alt />
      </p>
      <router-link to="/standard">
        <div class="right-btn link">标准化管理</div>
      </router-link>
    </div>
  </div>
</template>
 
<script>
export default {
  name: 'entrance',
  data() {
    return {};
  },
  computed: {
    isPanel() {
      return this.$store.getters.permission.enterprise_panel;
    }
  }
};
</script>
 
<style lang="scss">
@import '@/style/mixin.scss';

$btn-h: 150px;
$btn-top-h: 100px;

.entrance {
  position: relative;
  background-size: 100% 100%;
  min-width: 1200px;
  min-height: 700px;

  a {
    margin: 0px 20px;
  }
  .richang-block {
    position: absolute;
    top: calc(50% - #{$btn-h/2});
    width: 32%;
    .richang {
      position: absolute;
      top: -40px;
      right: 10%;
      z-index: 0;
    }
  }
  .panel-block {
    position: absolute;
    top: 10%;
    width: 32%;
    left: 50%;
    transform: translateX(-50%);
    .panel {
      position: absolute;
      top: 89px;
      right: 17%;
      z-index: 0;
    }
  }
  .guanli-block {
    width: 32%;
    position: absolute;
    top: calc(50% - #{$btn-h/6});
    right: 0;
    .guanli {
      position: absolute;
      top: -80px;
      right: 10%;
      z-index: 0;
    }
  }

  .link {
    position: relative;
    letter-spacing: 5px;
    cursor: pointer;
    z-index: 9;
  }

  .left-btn {
    // top: calc(50% - #{$btn-h});
    // left: 0;
    width: 100%;
    font-size: 40px;
    line-height: $btn-h;
    padding-right: 50px;
    text-align: right;
    text-shadow: 5px 5px 5px #ccc;
    @include rhombusArrow(rgba(#fff, 0.8), right, $btn-h, 50px);
    &:hover {
      @include rhombusArrow(rgba(#fff, 1), right, $btn-h, 50px);
    }
    a {
      color: black;
    }
  }

  .right-btn {
    // top: calc(50% - #{$btn-h/4});
    // right: 0;
    width: 100%;
    padding-left: 50px;
    text-align: left;
    font-size: 40px;
    line-height: $btn-h;
    text-shadow: 2px 2px 3px #ccc;
    @include rhombusArrow(rgba(#0b206b, 0.8), left, $btn-h, 50px);
    &:hover {
      @include rhombusArrow(rgba(#0b206b, 1), left, $btn-h, 50px);
    }
    a {
      color: white;
    }
  }

  .top-btn {
    line-height: $btn-top-h;
    font-size: 35px;
    top: 150px;
    width: 350px;
    text-align: center;
    text-shadow: 2px 2px 3px #ccc;
    @include center-translate(horizontal);
    @include rhombusArrow(rgba(#f1c22c, 0.8), left, $btn-top-h, 50px);
    @include rhombusArrow(rgba(#f1c22c, 0.8), right, $btn-top-h, 50px);
    &:hover {
      @include rhombusArrow(rgba(#f1c22c, 1), left, $btn-top-h, 50px);
      @include rhombusArrow(rgba(#f1c22c, 1), right, $btn-top-h, 50px);
    }
    a {
      color: white;
    }
  }
}
</style>