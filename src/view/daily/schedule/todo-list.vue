<style lang="scss" scoped>
.schedule-list.new{
  .title-box{
    background-color: #ffffff !important;
    color: #666666;
  }
  .pointer{
    width: 25px;
    height: 25px;
    margin-left: 4px;
  }
  .tab-info{
    display: flex;
    align-items: center;
  }
  .tab-box{
    height: 40px;
    span{
      display: block;
      height: 40px;
      line-height: 30px;
    }
    &.checked{
      color: #01a0ff;
      background: transparent !important;
    }
    &.checked:after{
      position: absolute;
      left: 10%;
      content: '';
      display: inline-block;
      bottom: 0;
      width: 80%;
      height: 4px;
      border-radius: 2px;
      background: #01a0ff;
    }
  }
}
.nodata{
  height: 100%;
  text-align: center ;
}
@media screen and (min-width: 1276px) and (max-width: 1528px){
.schedule-list.new{
  .title-box{
    height: 30px !important;
  }
  .time-title{
    font-size: 14px !important;
    line-height: 30px !important;
  }
  .pointer{
    width: 16px;
    height: 16px;
  }
  .tab-box{
    height: 20px;
    span{
      font-size: 12px;
      height: 20px;
      line-height: 10px;
    }
  }
  .content-box{
    height: 100% !important;
    overflow-y: auto;
  }
}  
}
</style>

<template>
  <div class="schedule-list new">
    <div class="title-box">
      <span class="time-title">
        {{ selectDay.date }} 待办事项
        <img class="pointer" fix src="@/assets/daily/add.png" @click="toAdd" />
        <!-- <icon type="md-add-circle " /> -->
      </span>
      <div class="tab-info">
        <div
          v-for="(item,index) in todoTab"
          :key="index"
          :class="['tab-box', { checked: checkedindex == index }]"
          @click="changedaiban(index,item)"
        >
        <i-badge class="badge" :count="item.total">
          <span>{{item.text}}</span>
        </i-badge>
          <!-- <b v-if="item.total>0" :class="item.class">{{item.total}}</b> -->
        </div>
      </div>
    </div>
    <div class="content-box">
      <p v-if="select.total==0&&!loading" class="nodata">
        <img src="@/assets/daily/nodata.png">
      </p>
      <scroll v-else>
        <i-spin v-show="loading" fix></i-spin>
        <ul>
          <li v-for="(item, index) in select.list" :key="index" :class="getClass(item).name">
            <img :src="getClass(item).img" class="grade-icon">
            <span class="title-p">
              <span class="w40">
                {{ item.renwubiaoti }}
                <span v-if="item.isZerenren" class="mark">责</span>
              </span>

              <span class="subtext w20">责任人: {{item.zerenren}}</span>
              <span class="subtext w20">安排人: {{item.anpairen}}</span>
            </span>
            <div class="remark">
              <div class="info">
                <span class="w20">
                  <img src="~A/daily/leixing.png" alt>
                  {{item.renwuleixing}}
                </span>
                <span class="w50">{{item.renwukaishishijian}} - {{item.renwujiezhishijian}}</span>
                <span v-if="!item.isFinish" class="w30 num">
                  {{item.shenyutianshu>=0?'剩余':'超期'}}
                  <b>{{Math.abs(item.shenyutianshu)}}</b>天
                </span>
              </div>

              <span v-if="!item.isFinish" class="edit-btn" @click="toEdit(item)">
                <img src="~A/daily/edit.png" alt>
              </span>
              <span v-else class="wancheng" @click="toView(item)">
                <img src="~A/daily/wancheng.png" alt>
              </span>
            </div>
          </li>
        </ul>
      </scroll>
    </div>
  </div>
</template>
<script>
import {
  getRichengList,
  getChaoqiRicheng,
  getAnpaiRicheng
} from '@/api/daily/schedule';
export default {
  name: 'schedule-todo',
  props: {
    value: Object,
    selectDay: Object
  },
  data() {
    return {
      deptId: this.$store.getters.deptId,
      loading: false,
      checkedindex: 0,
      myList: [],
      todayList: [],
      overdueList: []
    };
  },
  computed: {
    todoTab() {
      return [
        {
          text: '今日',
          class: 'bg-cyan',
          total: this.todayList.length,
          list: this.todayList
        },
        {
          text: '我的',
          class: 'bg-cyan',
          total: this.myList.length,
          list: this.myList
        },
        {
          text: '超期',
          class: 'bg-red',
          total: this.overdueList.length,
          list: this.overdueList
        }
      ];
    },
    select() {
      return this.todoTab[this.checkedindex];
    }
  },
  watch: {
    selectDay: {
      immediate: true,
      handler() {
        this.getRichengList();
      }
    }
  },
  mounted() {
    this.getChaoqiRicheng();
    this.getAnpaiRicheng();
  },
  methods: {
    getClass(item) {
      let name = 'li-normal';
      let img = require('A/daily/todo-normal.png');
      if (item.isJinji == 1) {
        name = 'li-orgin';
        img = require('A/daily/zhong.png');
      }
      if (item.isZhongyao == 1) {
        name = 'li-blue';
        img = require('A/daily/ji.png');
      }
      if (item.isZhongyao == 1 && item.isJinji == 1) {
        name = 'li-red';
        img = require('A/daily/zhong-ji.png');
      }
      if (item.isFinish == 1) {
        name = 'li-wancheng';
        img = require('A/daily/todo-wancheng.png');
      }
      return { name, img };
    },
    changedaiban(index) {
      this.checkedindex = index;
    },

    toView(item) {
      this.$emit('to-detail', {
        state: 'view',
        item
      });
    },
    toAdd() {
      this.$emit('to-detail', {
        state: 'add',
        item: {}
      });
    },
    toEdit(item) {
      this.$emit('to-detail', { state: 'edit', item });
    },
    getRichengList() {
      this.loading = true;
      getRichengList(this.deptId, this.selectDay.date).then(res => {
        this.todayList = res.data.data;
        this.loading = false;
      });
    },
    getAnpaiRicheng() {
      getAnpaiRicheng(this.deptId).then(res => {
        this.myList = res.data.data;
      });
    },
    getChaoqiRicheng() {
      getChaoqiRicheng(this.deptId).then(res => {
        this.overdueList = res.data.data;
      });
    }
  }
};
</script>
<style lang="scss">
</style>

