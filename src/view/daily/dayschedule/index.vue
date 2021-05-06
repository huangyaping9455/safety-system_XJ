<template>
  <!-- 日程待办-->
  <div class="safety-page flex-row xy-between">
    <div class="contetn-left agent item-shadow">
      <Calendar
        class="com-calendar"
        ref="calendar"
        :alarmNum="todayList.length"
        v-model="selectDay"
      />
      <div class="tab-list">
        <p v-if="todayList.length == 0" class="nodata">
          <img src="@/assets/daily/nodata.png" />
        </p>
        <scroll v-else>
          <ul>
            <li
              class="flex-row xy-between al-center"
              v-for="item in todayList"
              :key="item"
            >
              <div class="flex-row al-center">
                <img
                  class="img-item"
                  src="@/assets/new_icon/worry.png"
                  alt=""
                />
                <div>
                  <span class="font-size14 color-333">{{
                    item.renwubiaoti
                  }}</span>
                  <p>
                    <img
                      class="small-img"
                      src="@/assets/new_icon/user.png"
                      alt=""
                    /><span class="font-size12 color-999">{{
                      item.renwuleixing
                    }}</span>
                  </p>
                </div>
              </div>
              <div class="item-contnet">
                <p class="color-666">
                  <span class="font-size12 ">责任人：{{ item.zerenren }}</span>
                  <span class="font-size12">安排人：{{ item.anpairen }}</span>
                </p>
                <p class="color-666">
                  <span class="font-size12"
                    >{{ item.renwukaishishijian }}—{{
                      item.renwujiezhishijian
                    }}</span
                  >
                </p>
              </div>
              <div class="item-right font-size12 color-666">
                超期<span class="big-num">{{ item.chaoqitianshu }}</span
                >天
              </div>
            </li>
          </ul>
        </scroll>
      </div>
    </div>
    <div class="conetent-right item-shadow">
      <div class="card flex-row xy-between">
        <!-- 
          :class="cruIndex === index ? 'active-card' : ''" -->
        <div
          class="card-item flex-row al-center xy-between pointer"
          v-for="(item, index) in title"
          :key="item.text"
          :class="item.class"
          @click="cruIndex = index"
        >
          <div class="flex-row al-center xy-between">
            <img :src="item.src" alt="" srcset="" />
            <div class="content">
              <p>{{ item.text }}</p>
              <span class="samll-text">{{ item.small }}</span>
            </div>
          </div>
          <span class="num">{{ item.num }}</span>
        </div>
      </div>

      <div class="flex-row tab-head" :class="bgHead">
        <span class="font-bold width-flex">预警</span>
        <span class="font-bold width-220">预警说明</span>
        <span class="font-bold width-70">预警数量</span>
      </div>
      <div class="tab-list">
        <ul>
          <li class="flex-row pointer" v-for="item in ListData" :key="item">
            <span class="width-flex">{{ item.tixingxiangqing }}</span>
            <span class="width-220 text-ellipsis ">{{ item.shuoming }}</span>
            <span class="width-70">{{ item.counts }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Calendar from "../schedule/calendar";
import {
  getRichengList,
  getChaoqiRicheng,
  getAnpaiRicheng,
} from "@/api/daily/schedule";
import { getList } from "@/api/daily/remind";
import dayjs from "dayjs";
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
          src: require("../../../assets/new_icon/alarm.png"),
          num: this.earlyNum,
          text: "预警",
          small: "30天内到期，预警数到为0不能主动预约",
          class: "yujing-bg",
        },
        {
          src: require("../../../assets/new_icon/overdue.png"),
          num: this.exceedNum,
          text: "超期",
          small: "30天内到期，预警数到为0不能主动预约",
          class: "chaoqi-bg",
        },
      ],
      todayList: [],
      ListData: [],
      selectDay: "",
      bgHead: "bg-yellow",
    };
  },
  watch: {
    selectDay: {
      handler() {
        this.getRichengList();
      },
    },
    cruIndex: {
      handler() {
        this.getList();
      },
    },
  },
  mounted() {
    this.getRichengList();
    this.getList();
  },
  methods: {
    getRichengList() {
      getRichengList(
        this.deptId,
        this.$refs.calendar.selectDay.date,
        0,
        0,
        2
      ).then((res) => {
        if (res.data.data.records) {
          this.todayList = res.data.data.records;
        }
      });
    },
    getList() {
      let tixingleixing;
      if (this.cruIndex == 0) {
        tixingleixing = "预警";
        this.bgHead = "bg-yellow";
      } else {
        tixingleixing = "超期";
        this.bgHead = "bg-red";
      }
      let params = {
        tongjiriqi: dayjs().format("YYYY-MM-DD"),
        tixingleixing: tixingleixing,
        size: 10,
        current: 1,
      };
      getList(params).then((res) => {
        let data = res.data.data;
        this.title[0].num = data.yujing;
        this.title[1].num = data.daoqi;
        this.ListData = data.pages.records;
      });
    },
  },
};
</script>
<style lang="scss">
@import "../../../assets/css/common.css";
$root-color: #409eff;
$root-red: #f56c6c;
.safety-page {
  height: 100%;
  padding: 20px;
  background: #eef7ff;
  .small {
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
    width: 55%;
    border-radius: 10px;
    padding: 2vh;
    height: calc(100vh - 150px);
    box-sizing: border-box;
    background: #fff;
    .com-calendar {
      height: 36vh;
      overflow: auto;
    }
    .tab-list {
      margin-top: 15px;
      padding: 0 10px;
      height: calc(100vh - 550px);
      overflow: auto;
      .nodata {
        height: 100%;
        text-align: center;
      }
      li {
        padding: 0 15px 5px;
        margin-bottom: 15px;
        border-bottom: 1px solid #e3e3e3;
        .item-contnet {
          margin-left: 15px;
          .color-666 {
            span:first-of-type {
              margin-right: 5vh;
            }
          }
        }
        .img-item {
          margin-right: 10px;
          width: 35px;
        }
        .small-img {
          margin-right: 2px;
          width: 10px;
        }
        .big-num {
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
    width: 45%;
    height: calc(100vh - 150px);
    margin-left: 2%;
    padding: 20px 10px;
    border-radius: 10px;
    .card {
      margin-bottom: 2vh;
      .card-item {
        width: 48%;
        border-radius: 10px;
        padding: 8px 10px 8px 15px;
        color: #fff;
        // background-image: linear-gradient(to right, #afafaf, #d7d7d7);
        .content {
          width: 18.5vh;
          .samll-text {
            font-size: 1.7vh;
          }
        }
        img {
          width: 40px;
          // height: 25px;
          margin-right: 10px;
        }
        .num {
          font-size: 4vh;
          font-weight: 600;
        }
      }
      .yujing-bg {
        background: url("~A/daily/yujing-bg.png") no-repeat top center;
        background-size: 100% 100%;
      }
      .chaoqi-bg {
        background: url("~A/daily/chaoqi-bg.png") no-repeat top center;
        background-size: 100% 100%;
      }
      .active-card {
        // box-shadow: 0px 2px 5px $root-color;
        // background-image: linear-gradient(to right, #277de0, #56dbed);
        background: url("~A/daily/yujing-bg.png") no-repeat top center;
        background-size: 100% 100%;
      }
    }
    .width-flex {
      flex: 1;
    }
    .width-220 {
      width: 220px;
    }
    .width-70 {
      width: 70px;
      text-align: center;
    }
    .tab-head {
      padding: 5px;
      color: #fff;
      border-bottom: 1px solid #e3e3e3;
    }
    .bg-yellow {
      background-color: #fca90a;
    }
    .bg-red {
      background-color: #fd2b2b;
    }
    .tab-list {
      height: calc(100vh - 320px);
      overflow: auto;
      li {
        padding: 5px 10px;
        &:hover {
          background: #f3f3f3;
        }
      }
    }
  }
}
</style>
