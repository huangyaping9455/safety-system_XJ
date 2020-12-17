<style lang="scss" scoped>
.pair-responsibilities.new{
  .tab-box{
    justify-content: flex-start;
    span{
      color: #666666;
      font-weight: bold;
      font-size: 24px;
      padding: 0 20px;
      background: transparent;
      &.checked{
        background-color: #e7f2f8;
        border-radius: 20px 20px 0px 0px;
      }
    }
  }
  .centent-box{
    height: calc(100% - 50px);
    background-color: #e7f2f8;
    border-radius: 0px 0px 20px 20px;
    margin-top: 0px;
    .title{
      font-size: 18px;
      color: #4d4d4d;
      font-weight: bold;
      padding-top: 30px;
      padding-left: 20px;
      span{
        color: #01a0ff;
      }
    }
    .contentScroll{
      height: calc(100% - 60px) !important;
    }
  }
}
@media screen and (min-width: 1276px) and (max-width: 1528px){
.pair-responsibilities.new{
  .tab-box{
    height: 30px;
    span{
      font-size: 14px;
      height: 30px;
      line-height: 30px;
      padding: 0 10px;
      &.checked{
        border-radius: 10px 10px 0px 0px;
      }
    }
  }
  .centent-box{
    height: calc(100% - 30px);
    border-radius: 0px 0px 10px 10px;
    .title{
      font-size: 14px;
      padding-top: 10px;
      padding-left: 15px;
    }
    .contentScroll{
      .content{
        font-size: 12px;
      }
    }
  }
} 
}
</style>

<template>
  <div class="pair-responsibilities new">
    <div class="tab-box">
      <span
        v-for="(item, index) in tablist"
        :key="index"
        :class="{ checked: item.title == zhize }"
        @click="changezhize(item)"
      >{{ item.title }}</span>
    </div>
    <div class="centent-box">
      <p class="title">当前岗位：<span>{{ data.mingcheng }}</span></p>
      <scroll class="contentScroll">
        <div class="content" v-html="zhize == '岗位职责'?data.gangweizhize:data.anquanzhize"></div>
      </scroll>
    </div>
  </div>
</template>
<script>
import { getPostInfo } from '@/api/daily/schedule';
export default {
  name: 'pair-responsibilities',
  data() {
    return {
      zhize: '岗位职责',
      data: {},
      tablist: [
        {
          title: '岗位职责',
          key: 'gangweizhize'
        },
        {
          title: '安全职责',
          key: 'anquanzhize'
        }
      ]
    };
  },
  mounted() {
    this.getPostInfoData();
  },
  methods: {
    getPostInfoData() {
      getPostInfo(this.$store.getters.postId).then(res => {
        this.data = res.data.data;
      });
    },
    changezhize(item) {
      this.zhize = item.title;
    }
  }
};
</script>
<style lang="scss">
@import 'S/mixin.scss';
.pair-responsibilities {
  height: 100%;
}
</style>


