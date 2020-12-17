<template>
  <div class="left-ranking wh100">
    <div class="ranking-box">
      <div class="ranking-title">严重超速报警车辆排名</div>
      <div class="ranking-content">
        <i-spin fix v-if="loading"></i-spin>
        <div v-if="listData.length==0" class="center wh100">暂无数据</div>
        <div v-else class="list-h">
          <scroll>
            <div v-for="(item,n) in listData" :key="n" class="block" @click="cutRanking(n,item)">
              <b v-if="pageValue.page==1&&pageValue.page*n<10" :class="['order',{'order1':n+1==1},{'order2':n+1==2},{'order3':n+1==3}]">{{n+1}}</b>
               <b v-else class="order"><i class="w-line"></i></b>
              <div :class="['block-class',{'active-block': n==activeindex} ]">
                <span>{{item.plateNumber}}</span>
                <span>{{item.color}}</span>
                <span class="number">{{item.number}}</span>
              </div>
            </div>
          </scroll>
        </div>
        <div class="center page-box">
          <i-page
            :total="pageValue.total"
            size="small"
            show-sizer
            :current="pageValue.page"
            :page-size="pageValue.size"
            :page-size-opts="pageValue.pageOpt"
            @on-change="pageChange"
          />
        </div>
      </div>
    </div>
    <div class="condition-box">
      <div class="condition-title">
        <img src="~A/daily/s-alarm-3.png" alt />
        <span>严重报警判定条件</span>
      </div>
      <div class="condition-content">
        <p class="title">
          <span>超速报警</span>
          <b class="line"></b>
        </p>
        <div class="content">
          <scroll>
            <div class="row">
              <p class="text-gray">持续时间：</p>
              <span>
                ≥
                <b class="text-red">30</b>秒
              </span>
            </div>
            <div class="row">
              <p class="text-gray">时间范围：</p>
              <span>
                <b class="text-red">30</b>分钟
              </span>
            </div>
            <div class="row">
              <p class="text-gray">次&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;数：</p>
              <span>
                <b class="text-red">5</b>次
              </span>
            </div>
            <div class="row">
              <p class="text-gray">每次持续时间：</p>
              <span>
                ≥
                <b class="text-red">3</b>分钟
              </span>
            </div>
            <div class="row">
              <p class="text-gray">超速百分比：</p>
              <div>
                <span>
                  80km/h以下
                  <b class="text-red">3</b>%
                </span>
                <br />
                <span>
                  80-100km/h以下
                  <b class="text-red">3</b>%
                </span>
                <br />
                <span>
                  100km/h以上
                  <b class="text-red">3</b>%
                </span>
              </div>
            </div>
          </scroll>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { alarmTypeplateCout } from '@/api/daily/serious-alarm';
export default {
  name: 'left-ranking',
  props: {
    // 当前激活的预警类型
    active: {
      type: Object
    }
  },
  data() {
    return {
      activeindex: 0,
      listData: [],
      loading: true,
      pageValue: {
        page: 1,
        size: 10,
        total: 0,
        pageOpt: [10, 50, 100, 200]
      }
    };
  },
  watch: {
    active() {
      this.toggleAlarm();
    }
  },

  mounted() {},
  methods: {
    // 切换车
    cutRanking(index, item) {
      this.activeindex = index;
      this.$emit('vehicleData', item);
    },
    // 分页
    pageChange(page) {
      this.pageValue.page = page;
       this.getData();
    },
    // 获取数据
    getData() {
     this.listData=[];
      let type = this.active.type != 'GPS' ? 1 : 0;
      let params = {
        alarmType: this.active.text,
        company: this.$store.getters.deptName,
        beginTime: this.active.beginTime,
        endTime: this.active.endTime,
        type: type,
        size: this.pageValue.size,
        current: this.pageValue.page
      };
      alarmTypeplateCout(params).then(res => {
        this.listData = res.data.data.list.records;
        this.pageValue.page = res.data.data.list.current;
        this.pageValue.total = res.data.data.list.total;
        this.loading = false;
        this.$emit('vehicleData', this.listData[0]);
        this.$emit('getData', {
          alarmCount: res.data.data.alarmCount,
          vehicleCount: res.data.data.vehicleCount
        });
        return res.data.data;
      });
    },

    // 切换报警
    toggleAlarm() {
      this.pageValue.page = 1;
      this.getData();
    }
  }
};
</script>
<style lang="scss">
.center {
  display: flex;
  align-items: center;
  justify-content: center;
}
.left-ranking {
   .w-line{
    display: inline-block;
    height: 6px;
    width: 50%;
    border-radius: 3px;
    background: #fff;
  }
  .list-h {
    height: calc(100% - 40px);
  }
  .page-box {
    height: 40px;
  }
}
</style>