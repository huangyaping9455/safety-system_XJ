<template>
  <div class="enterprise-condition inside-box">
    <div class="top-left">
      <div class="info-chunk">
        <div class="info-title dissolve">企业资料</div>
        <div class="chunk-body">
          <div class="img-box">
            <img src="~A/panel/compay.png" />
          </div>
          <p class="company-name">哈密市众合运输有限公司</p>
          <div class="compay-other">
            <p>
              地址:
              <span>哈密市伊州区</span>
            </p>
            <p>
              法人:
              <span>张红晖</span>
            </p>
          </div>
          <div class="other">
            <div class="other-info">
              <img src="~A/panel/zijin-icon.png" />
              企业注册资金:
              <span class="color-yellow">5000000</span>元
            </div>
            <div class="other-info">
              <img src="~A/panel/guanlirenuan-icon.png" />
              管理人员总数:
              <span class="color-yellow">4</span>人
            </div>
            <div class="other-info">
              <img src="~A/panel/anquanrenyuan-icon.png" />
              安全员总数:
              <span class="color-yellow">1</span>人
            </div>
          </div>
        </div>
      </div>
      <div class="info-chunk">
        <div class="info-title dissolve">运输情况</div>
        <div class="chunk-body">
          <p class="chunk-title">
            运输总金额
            <span class="color-bule">5000000</span>
            元
          </p>
          <p class="chunk-title">
            纳税总金额
            <span class="color-yellow">630000</span>
            元
          </p>
          <div class="other">
            <div class="other-info">
              <img src="~A/panel/yundan-icon.png" />
              运单数量:
              <span class="color-royalblue">1023</span>单
            </div>
            <div class="other-info">
              <img src="~A/panel/yunshulicheng-icon.png" />
              运输总里程:
              <span class="color-royalblue">6000</span>KM
            </div>
            <div class="other-info">
              <img src="~A/panel/yunshudunwei-icon.png" />
              运输总吨位:
              <span class="color-royalblue">600</span>T
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="top-center">
      <div class="container">
        <img src="~A/panel/map.png" />
      </div>
      <div class="num-bottom">
        <div>
          <span>报警数:</span>
          <b style="color:#fec62a;">203</b>
        </div>
        <div>
          <span>隐患排查次数:</span>
          <b>60</b>
        </div>
        <div>
          <span>应急演练次数:</span>
          <b>2</b>
        </div>
        <div>
          <span>安全检查次数:</span>
          <b>12</b>
        </div>
        <div>
          <span>事故次数:</span>
          <b style="color: red;">0</b>
        </div>
        <div>
          <span>安全教育次数:</span>
          <b>23</b>
        </div>
      </div>
    </div>
    <div class="top-right">
      <div class="info-chunk">
        <div class="info-title dissolve">运输情况</div>
        <div class="chunk-body">
          <p class="chunk-count">
            <span>
              车辆总数
              <b class="color-bule">10</b>辆
            </span>
          </p>
          <div class="chunk-info cheliang-bg">
            <div class="chunk-left">
              <div>
                <p class="color-green">10</p>
                <p>运营车辆</p>
              </div>

              <div>
                <p class="color-red">0</p>
                <p>停运车辆</p>
              </div>
            </div>
            <div class="chunk-right">
              <div>
                <p class="color-bule">10</p>
                <p>省内车辆</p>
              </div>
              <div>
                <p class="color-royalblue">0</p>
                <p>省外车辆</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="info-chunk">
        <div class="info-title dissolve">人员情况</div>
        <div class="chunk-body">
          <p class="chunk-count">
            <span>
              驾驶员
              <b class="color-bule">10</b>人
            </span>

            <span>
              押运员
              <b class="color-bule">10</b>人
            </span>
          </p>

          <div class="chunk-info renyuan-bg">
            <div class="chunk-left">
              <div>
                <p class="color-green">10</p>
                <p>运营车辆</p>
              </div>

              <div>
                <p class="color-red">0</p>
                <p>停运车辆</p>
              </div>
            </div>
            <div class="chunk-right">
              <div>
                <p class="color-bule">10</p>
                <p>省内车辆</p>
              </div>
              <div>
                <p class="color-royalblue">0</p>
                <p>省外车辆</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'enterprise-condition',
  data() {
    return {};
  },
  computed: {},
  methods: {}
};
</script>
<style lang="scss">
@import '@/style/mixin.scss';
.enterprise-condition {
  .top-left {
    .img-box {
      width: 100%;
      border-radius: 4px;
      background: #fff;
      margin-top: 4px;
      img {
        max-width: 100%;
      }
    }
    .company-name {
      color: #07ffff;
      font-size: 18px;
      margin-top: 10px;
    }
    .compay-other {
      text-align: center;
      font-size: 14px;
      display: flex;
      color: #fff;
      margin-top: 4px;
      p {
        margin-right: 20px;
      }
      span {
        color: #07ffff;
      }
    }
    .chunk-title {
      font-size: 20px;
      color: #fff;
      margin: 16px 0;
    }
    .other {
      color: #fff;
      padding-top: 14px;
      font-size: 14px;
      .other-info {
        padding: 4px 0;
      }
      img {
        width: 22px;
        vertical-align: bottom;
        margin-right: 6px;
      }
    }
  }
  .container {
    text-align: center;
    img {
      cursor: pointer;
      max-width: 100%;
      max-height: 110%;
    }
  }

  .top-right {
    .cheliang-bg {
      background: url('~A/panel/chelaing-bg.png') no-repeat top center;
      background-size: 228px;
      background-position: center;
    }
    .renyuan-bg {
      background: url('~A/panel/renyuan-dg.png') no-repeat top center;
      background-size: 228px;
      background-position: center;
    }
    .chunk-count {
      height: 60px;
      line-height: 60px;
      color: #fff;
      font-size: 14px;
      display: flex;
      justify-content: space-between;
    }
    .chunk-info {
      width: 100%;
      height: calc(100% - 60px);
      color: #fff;
      display: flex;
      justify-content: space-between;
      position: relative;
      font-size: 16px;
      .chunk-left {
        position: absolute;
        top: 40px;
        left: 30px;
        text-align: center;
      }
      .chunk-right {
        position: absolute;
        right: 26px;
        bottom: 36px;
        text-align: center;
      }
    }
  }
}
</style>
