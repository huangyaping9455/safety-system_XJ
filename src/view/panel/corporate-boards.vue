<template>
  <div class="corporate-boards">
    <div class="corporate-boards-top">
      <img class="home-btn" src="~A/panel/home.png" alt="" />
    </div>
    <div class="content">
      <div class="info-left">
        1
      </div>
      <div class="info-right">
        <div class="info-right-top">
          <div class="block">
            <div class="dissolve">报警趋势<span>(次/月)</span></div>
          </div>
          <div class="block">
            <div class="dissolve">报警趋势<span>(次/月)</span></div>
          </div>
          <div class="block">
            <div class="dissolve">报警趋势<span>(次/月)</span></div>
          </div>
          <div class="block">
            <div class="dissolve">报警趋势<span>(次/月)</span></div>
          </div>
        </div>
        <div class="info-right-bottom">
          <div class="dissolve">报警趋势<span>(次/月)</span></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'corporate-boards',
  data() {
    return {

    };
  },
  computed: {},
  methods: {

  },
};
</script>
<style lang="scss">
@import '@/style/mixin.scss';
.corporate-boards {
  width: 100%;
  height: 100%;
  background: url('~A/panel/panel-bg.png') no-repeat top center;
  background-attachment: fixed;
  background-size: cover;
  position: relative;
  min-width: 1200px;
  min-height: 900px;
  .corporate-boards-top {
    background: url('~A/panel/panel-top.png') no-repeat center;
    min-width: 1200px;
    min-height: 74px;
    .home-btn {
      margin-top: 40px;
      margin-left: 25px;
    }
  }
  .content {
    width: calc(100% - 20px);
    height: calc(100% - 94px);
    margin: 10px auto;
    display: flex;
    .info-left {
      width: calc(100% - 780px);
      height: 100%;
      background: url('~A/panel/zuos-jiao.png') top left no-repeat,
        url('~A/panel/youx-jiao.png') bottom right no-repeat;
    }
    .info-right {
      width: 770px;
      height: 100%;
      margin-left: 10px;
      .info-right-top {
        height: calc(100% - 210px);
        border: 1px solid red;
        display: flex;
        align-content: flex-start;
        justify-content: space-between;
        flex-wrap: wrap;
        .block {
          width: calc(50% - 5px);
          height: 33.4%;
          border: 1px solid red;
        }
      }
      .info-right-bottom {
        height: 210px;
      }
      .dissolve {
        height: 32px;
        line-height: 32px;
        padding-left: 12px;
        font-size: 18px;
        color: #ffffff;
        span {
          font-size: 14px;
          color: #23dfe1;
        }
      }
    }
  }
}
</style>
