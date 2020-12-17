<template>
  <div class="schedule-list">
    <div class="title-box">
      <span class="time-title">
        {{ selectDay.date }} 待办事项
        <icon type="md-add-circle pointer" @click="toAdd"/>
      </span>
      <div class="tab-info">
        <div
          v-for="(item,index) in todoTab"
          :key="index"
          :class="['tab-box', { checked: checkedindex == index }]"
          @click="changedaiban(index,item)"
        >
          <span>{{item.text}}</span>
          <b v-if="item.total>0" :class="item.class">{{item.total}}</b>
        </div>
      </div>
    </div>
    <div class="content-box">
      <scroll>
        <i-spin v-show="loading" fix></i-spin>
        <p v-if="select.total==0">暂无数据</p>
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

