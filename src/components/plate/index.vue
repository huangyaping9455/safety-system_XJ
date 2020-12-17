<template>
  <div :class="className">
    <span>{{ text }}</span>
  </div>
</template>
 
<script>
export default {
  name: 'plate',
  props: {
    text: String,
    color: String
  },
  data() {
    return {};
  },
  computed: {
    className() {
      return [
        'center-box',
        'plate',
        {
          'plate-yellow': this.color == '黄色',
          'plate-bule': this.color == '蓝色',
          'plate-green': this.color == '绿色',
          'plate-white': this.color == '白色',
          'plate-black': this.color == '黑色'
        }
      ];
    }
  }
};
</script>
 
<style lang="scss" >
.plate {
  min-height: 40px;
  min-width: 100px;
}
.plate-yellow {
  background: url('~A/daily/yellow.png') no-repeat;
  background-size: 90px;
  background-position: center;
  color: #333;
}
.plate-bule {
  background: url('~A/daily/bule.png') no-repeat;
  background-size: 90px;
  background-position: center;
  color: #fff;
}
.plate-green {
  background: url('~A/daily/green.png') no-repeat;
  background-size: 90px;
  background-position: center;
  color: #333;
}
.plate-black {
  background: url('~A/daily/black.png') no-repeat;
  background-size: 90px;
  background-position: center;
  color: #fff;
}
.plate-white {
  background: url('~A/daily/white.png') no-repeat;
  background-size: 90px;
  background-position: center;
  color: #333;
}
</style>