<template>
  <div class="dialog-text">
    <div class="dialog-body">
      <span>机构名称：</span>
      <div>{{ rowtableList.deptName }}</div>
    </div>
    <div class="dialog-img">
      <img src="~A/daily/zanwuzhaopian.png" alt="" />
    </div>
    <div class="dialog-body">
      <span>使用性质：</span>
      <div>{{ rowtableList.shiyongxingzhi }}</div>
    </div>
    <div class="dialog-body">
      <span>车牌颜色：</span>
      <div>{{ rowtableList.chepaiyanse }}</div>
    </div>
    <div class="dialog-body">
      <span>车辆类型：</span>
      <div>{{ rowtableList.xinghao }}</div>
    </div>
    <div class="dialog-body">
      <span>终端编号：</span>
      <div>{{ rowtableList.zongduanid }}</div>
    </div>
    <div class="dialog-body">
      <span>厂牌：</span>
      <div>{{ rowtableList.changpai }}</div>
    </div>
    <div class="dialog-body">
      <span>运营商：</span>
      <div>{{ rowtableList.yunyingshangmingcheng }}</div>
    </div>
    <div class="dialog-body">
      <span>车架号：</span>
      <div>{{ rowtableList.chejiahao }}</div>
    </div>
    <div class="dialog-body">
      <span>驾驶员：</span>
      <div>{{ rowtableList.jiashiyuanxingming }}</div>
    </div>
    <div class="dialog-body">
      <span>驾驶员电话：</span>
      <div>{{ rowtableList.jiashiyuandianhua }}</div>
    </div>
    <div class="dialog-body">
      <span>押运员：</span>
      <div>{{ rowtableList.yayunyuanxingming }}</div>
    </div>
    <div class="dialog-body">
      <span>押运员电话：</span>
      <div>{{ rowtableList.yayunyuandianhua }}</div>
    </div>
    <div class="dialog-body">
      <span>车主姓名：</span>
      <div>{{ rowtableList.chezhu }}</div>
    </div>
    <div class="dialog-body">
      <span>车主电话：</span>
      <div>{{ rowtableList.chezhudianhua }}</div>
    </div>
    <div class="dialog-body">
      <span>4G视频地址：</span>
      <div>{{ rowtableList.yunyingshang }}</div>
    </div>
    <div class="dialog-body">
      <span>创建时间：</span>
      <div>{{ rowtableList.caozuoshijian }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    rowtableList: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.dialog-text {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  .dialog-img {
    width: 55%;
    height: 95%;
    background-color: #fff;
    grid-row-start: span 4;
    padding: 15px;
    justify-content: center;
    img {
      width: 95%;
      margin: 0 0.4rem;
      height: 135px;
    }
  }
  .dialog-body {
    display: flex;
    width: 100%;
    // grid-auto-flow: column dense;
    margin-bottom: 1.5rem;
    font-size: 15px;
    font-weight: 600;
    span {
      width: 25%;
      text-align: right;
    }
    div {
      width: 75%;
      color: #7e6d6d;
    }
  }
}
</style>
