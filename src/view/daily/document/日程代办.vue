<template>
  <!-- 日程待办-->
  <div class="safety-page flex-row xy-between">
    <div class="contetn-left agent item-shadow">
    <Calendar class="com-calendar" :calendar-all-type="['日']" />
    <div class="tab-list">
      <ul>
        <li
          class="flex-row xy-between al-center"
          v-for="item in [1, 2, 3, 4, 5, 6, 7]"
          :key="item"
        >
          <div class="flex-row al-center">
            <img class="img-item" src="../../../assets/new_icon/worry.png" alt="">
            <div>
              <span class="font-size14 color-333">今日代办</span>
              <p>
                <img class="small-img" src="../../../assets/new_icon/user.png" alt=""><span class="font-size12 color-999">会以组织</span>
              </p>
            </div>
          </div>
          <div class="item-contnet ">
            <p class="color-666">
              <span class="font-size12">责任人：李华</span>
              <span class="font-size12">安排人：管理员</span>
            </p>
            <p  class="color-666">
              <span class="font-size12">2021-09-19—2021-10-12</span>
            </p>
          </div>

          <div class="item-right font-size12 color-666">超期<span class="big-num">1</span>天</div>
        </li>
      </ul>
    </div>
  </div>
  <div class="conetent-right item-shadow">
    <div class="card flex-row xy-between">
      <div
        class="card-item flex-row al-center xy-between pointer"
        v-for="(item, index) in title"
        :key="item.text"
        :class="cruIndex === index ? 'active-card' :''"
        @click="cruIndex=index"
      >
        <div class="flex-row al-center xy-between">
          <img :src="item.src" alt="" srcset="">
          <div class="content">
            <p>{{item.text}}</p>
            <span class="font-size12 samll-text">{{ item.small }}</span>
          </div>
        </div>
        <span class="num">{{item.num}}</span>
      </div>
    </div>

    <div class="flex-row tab-head">
      <span class="font-bold width-flex">预警</span>
      <span class="font-bold width-220">预警说明</span>
      <span class="font-bold width-70">预警数量</span>
    </div>
    <div class="tab-list">
      <ul>
        <li class="flex-row pointer" v-for="item in [1,2,3,4,5]" :key="item">
          <span class="width-flex">驾驶证到期提醒</span>
          <span class="width-220 text-ellipsis ">驾驶证到期提醒</span>
          <span class="width-70">0</span>
        </li>
      </ul>
    </div>
  </div>
  </div>
</template>
 
<script>
import Calendar from "../../../components/Calendar/index";

export default {
  name: "document",
  components: {
    Calendar,
  },
  data() {
    return {
      cruIndex: 0,
      title: [
        {
          src: require('../../../assets/new_icon/alarm.png'),
          num: 0,
          text: '预警',
          small: '30天内到期，预警数到为0不能主动预约'
        },
        {
          src: require('../../../assets/new_icon/overdue.png'),
          num: 1,
          text: '超期',
          small: '30天内到期，预警数到为0不能主动预约'
        },
      ],
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },

        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },

        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
      ],
    };
  },
  mounted() {
    
  },
  methods: {},
};
</script>
<style lang="scss">
@import "../../../assets/css/common.css";
$root-color: #409eff;
$root-red: #f56c6c;
.safety-page {
  height: 100%;
  padding: 20px ;
  background: #eef7ff;
  .small{
    font-size: 12px;
  }
  .item-shadow {
    box-shadow: 0px 2px 10px #91d3ff;
  }
  .color-blue {
    color: $root-color;
  }
  .color-red {
    color: $root-red;
  }
  .has-gutter {
    color: #333;
  }
  .contetn-left {
    width: 630px;
    border-radius: 10px;
    padding-top: 10px;
    height: calc(100vh - 150px);
    box-sizing: border-box;
    background: #fff;
    .com-calendar {
      height: 270px;
      overflow: auto;
    }
    .tab-list {
      margin-top: 15px;
      padding: 0 10px;
      height: calc(100vh - 470px);
      overflow: auto;
      li {
        padding: 0 15px 5px;
        margin-bottom: 15px;
        border-bottom: 1px solid #e3e3e3;
        .item-contnet {
          margin-left: 15px;
        }
        .img-item{
          margin-right: 10px;
          width: 35px;
        }
        .small-img{
          margin-right: 2px;
          width: 10px;
        }
        .big-num{
          margin: 0 2px;
          font-size: 24px;
          color: #f4b92a;
          font-weight: 600;
        }
      }
    }
  }
  .conetent-right {
    background: #fff;
    width: 50%;
    height: calc(100vh - 150px);
    margin-left: 30px;
    padding: 20px 10px;
    border-radius: 10px;
    .card {
      margin-bottom: 40px;
      .card-item {
        width: 48%;
        border-radius: 10px;
        padding: 8px 20px 8px 15px;
        color: #fff;
        background-image: linear-gradient(to right, #afafaf, #d7d7d7);
        .content {
          width: 150px;
        }
        img{
          width: 25px;
          margin-right: 10px;
        }
        .num {
          font-size: 20px;
          font-weight: 600;
        }
      }
      .active-card{
        box-shadow: 0px 2px 5px $root-color;
          background-image: linear-gradient(to right, #277de0, #56dbed);
      }
    }
    .width-flex{
      flex: 1;
    }
    .width-220{
      width: 220px;
    }
    .width-70{
      width: 70px;
      text-align: center;
    }
    .tab-head {
      padding: 0 10px 5px;
      border-bottom: 1px solid #e3e3e3;
    }
    .tab-list {
      height: calc(100vh - 320px);
      overflow: auto;
      li{
        padding: 5px 10px;
        &:hover{
          background: #f3f3f3;
        }
      }
    }
  }
}
</style>