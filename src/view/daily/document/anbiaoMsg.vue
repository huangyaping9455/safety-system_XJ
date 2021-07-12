<template>
  <!-- 安全标准化--涵日历 -->
  <div class="safety-page-2X flex-row jf-center">
    <div class="contetn-left">
      <div class="card item-shadow">
        <p class="title font-bold">
          超过{{
            ControlRates.totalpointsrate ||
            ControlRates.totalpointsrate == "00.00%"
              ? ControlRates.totalpointsrate
              : "00.00%"
          }}的同平台企业
        </p>
        <p class="content font-size12">
          你的安全标准化达标分数已更新。保持良好的完善记录，有助于安全标准化达标分数保持稳定和提升。
        </p>
        <p class="num">
          <span
            >{{
              ControlRates.totalpoints || ControlRates.totalpoints === 0
                ? ControlRates.totalpoints
                : 1000
            }}
            /
            {{ ControlRates.totalscore ? ControlRates.totalscore : 1000 }}</span
          >
        </p>
      </div>
      <div class="agent item-shadow">
        <div class="com-calendar">
          <Calendar v-model="selectDay" :alarmNum="AgentList.length" />
        </div>
        <div class="agent-list">
          <div class="title">
            <span>{{ selectDay.date }}代办事项</span>
            <div class="title-right">
              <div
                @click="today"
                :class="['tab-box', { checked: chekIndex === 0 }]"
              >
                <span>今日</span>
              </div>
              <div
                @click="chaoqi"
                :class="['tab-box', { checked: chekIndex === 1 }]"
              >
                <span>超期</span>
              </div>
            </div>
            <!-- <img src="../../../assets/new_icon/add.png" alt="" /> -->
          </div>
          <!-- <div class="tab-list"> -->
          <el-table :data="AgentList" class="tab-list">
            <el-table-column
              prop="renwubiaoti"
              label="任务标题"
              :show-overflow-tooltip="true"
            >
            </el-table-column>
            <el-table-column
              prop="tiername"
              label="任务节点"
              align="center"
              :show-overflow-tooltip="true"
            ></el-table-column>
            <!-- <el-table-column
              prop="renwuneirong"
              label="任务内容"
              align="center"
            ></el-table-column> -->
            <el-table-column
              prop="calcTime"
              label="任务周期"
              align="center"
              min-width="100"
              :show-overflow-tooltip="true"
            >
            </el-table-column>
            <el-table-column label="任务状态" align="center">
              <template v-slot="{ row }">
                <span :class="[{ 'color-red': row.isFinish !== 1 }]">
                  {{ row.finishStatus }}</span
                >
              </template>
            </el-table-column>
            <el-table-column
              prop="anpairen"
              label="发布人"
              align="center"
              :show-overflow-tooltip="true"
            ></el-table-column>
            <el-table-column
              fixed="right"
              align="center"
              label="操作"
              width="100"
            >
              <template slot-scope="scope">
                <el-button
                  @click="handleClick(scope.row)"
                  type="text"
                  size="small"
                  >查看</el-button
                >
                <el-button @click="rowClick(scope.row)" type="text" size="small"
                  >更多>></el-button
                >
              </template>
            </el-table-column>
          </el-table>
          <!-- </div> -->
        </div>
      </div>
    </div>
    <div class="conetent-right item-shadow" v-if="showMsg">
      <p class="font-bold margin-bottom15">
        安全标准化总项{{
          PeriodControlRates.maxxiangshu || PeriodControlRates.maxxiangshu === 0
            ? PeriodControlRates.maxxiangshu
            : 0
        }}大项，共计{{
          PeriodControlRates.minxiangshu || PeriodControlRates.minxiangshu === 0
            ? PeriodControlRates.minxiangshu
            : 0
        }}小项；此次达标项{{
          PeriodControlRates.maxdabiaoxiangshu ||
          PeriodControlRates.maxdabiaoxiangshu === 0
            ? PeriodControlRates.maxdabiaoxiangshu
            : 0
        }}项，共计{{
          PeriodControlRates.mindabiaoxiangshu ||
          PeriodControlRates.mindabiaoxiangshu === 0
            ? PeriodControlRates.mindabiaoxiangshu
            : 0
        }}小项；达标率为<span class="color-red">{{
          PeriodControlRates.dabiaolv || PeriodControlRates.dabiaolv == "00.00%"
            ? PeriodControlRates.dabiaolv
            : "00.00%"
        }}</span>
      </p>
      <span class="font-bold color-blue tishi">安全提示：</span>
      <div class="flex-row margin-bottom15">
        <scroll>
          <div class="text-body" ref="text">
            <div
              class="text-list"
              v-for="(item, index) in SafetyTips"
              :key="index"
            >
              <p>
                {{ item.name
                }}<span class="color-red">{{ item.minxingnum }}</span
                >小项，有<span class="color-red">{{ item.notdabiaonum }}</span
                >项未达标
              </p>
            </div>
          </div>
        </scroll>
      </div>
      <!-- <div class="flex-row margin-bottom15">
        <span class="font-bold color-blue">日常提醒：</span>
        <div class="text-list">
          <p class="color-666">
            1.车辆合同到期<span class="color-red">4</span>辆
          </p>
          <p class="color-666">
            1.人员从业资格证到期<span class="color-red">123123</span>人
          </p>
        </div>
      </div> -->
      <el-table
        :data="tableData"
        :height="DBheight"
        ref="table"
        stripe
        style="width: 100%;font-size:15px;"
      >
        <el-table-column prop="name" label="目录" min-width="130">
        </el-table-column>
        <el-table-column prop="score" label="标准得分" align="center">
        </el-table-column>
        <el-table-column label="本次得分" align="center">
          <template v-slot="{ row }">
            <span :class="[{ 'color-red': row.nowscores < row.score }]">
              {{ row.nowscores }}</span
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="conetent-right item-shadow" v-if="showDetail">
      <div class="detail">
        <div class="detail-head">
          <span>待办事项详情</span>
        </div>
        <div class="detail-body">
          <span>任务标题：</span>
          <p>{{ detailMessage.renwubiaoti }}</p>
        </div>
        <div class="detail-body">
          <span>任务节点：</span>
          <p>{{ detailMessage.tiername }}</p>
        </div>
        <div class="detail-body">
          <span>任务周期：</span>
          <p>
            {{ detailMessage.renwukaishishijian }}-{{
              detailMessage.renwujiezhishijian
            }}
          </p>
        </div>
        <div class="detail-body">
          <span>任务状态：</span>
          <p>{{ detailMessage.finishStatus }}</p>
        </div>
        <div class="detail-body">
          <span>发 布 人 ：</span>
          <p>{{ detailMessage.anpairen }}</p>
        </div>
        <div class="detail-body">
          <span>任务内容：</span>
          <p>
            {{ detailMessage.renwuneirong }}
          </p>
        </div>
      </div>
      <div class="detail-foot">
        <el-button type="primary" icon="el-icon-close" @click="closeDetail"
          >关闭</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
// import Calendar from "../../../components/Calendar/index";
import Calendar from "../schedule/calendar2";
import {
  selectControlRates,
  selectScheduleReminders,
  selectPeriodControlRates,
  selectSafetyTips,
  selectQiYeAnBiaoMuLu,
} from "@/api/guide";
import {
  getRichengList,
  getChaoqiRicheng,
  getAnpaiRicheng,
} from "@/api/daily/schedule";
export default {
  name: "document",
  components: {
    Calendar,
  },
  data() {
    return {
      AgentList: [
        {
          name: "一、安全目标",
          user: "60",
          date: "2019-01-01",
          title: "用章流程",
          staus: "未处理",
        },
      ],
      tableData: [
        {
          date: "80",
          name: "一、安全目标",
          address: "60",
        },
      ],
      ControlRates: "",
      PeriodControlRates: "",
      SafetyTips: "",
      DBheight: 420,
      selectDay: "",
      showMsg: true,
      showDetail: false,
      detailMessage: [],
      chekIndex: 0,
    };
  },
  mounted() {
    this.getselectControlRates();
    // this.getSelectScheduleReminders();
    this.getdSelectPeriodControlRates();
    this.getSelectSafetyTips();
    this.getSelectQiYeAnBiaoMuLu();
    // this.$nextTick(function() {
    //   this.caleHeight =
    //     window.innerHeight - this.$refs.table.$el.offsetTop - 100;
    //   // 监听窗口大小变化
    //   let self = this;
    //   window.onresize = function() {
    //     self.caleHeight =
    //       window.innerHeight - self.$refs.table.$el.offsetTop - 100;
    //   };
    // });
  },
  watch: {
    selectDay: {
      handler() {
        this.getSelectScheduleReminders();
        // this.getgetChaoqiRicheng();
        this.showMsg = true;
        this.showDetail = false;
      },
    },
  },
  methods: {
    // 左上角数据
    getselectControlRates() {
      selectControlRates(this.$store.getters.deptId).then((res) => {
        if (res.data.code == 200) {
          this.ControlRates = res.data.data;
        } else {
          this.$message.warning("未生成标准化文件");
        }
      });
    },
    // 左下角 待办 今日
    getSelectScheduleReminders() {
      let dataTime = dayjs(this.selectDay.date).format("YYYY-MM-DD");
      getRichengList(this.$store.getters.deptId, dataTime, 0, 0, 1).then(
        (res) => {
          this.AgentList = res.data.data.records.map((el) => {
            el.calcTime = el.renwukaishishijian + "-" + el.renwujiezhishijian;
            if (el.isFinish == 0) {
              el.finishStatus = "未完成";
            } else if (el.isFinish == 1) {
              el.finishStatus = "完成";
            } else {
              el.finishStatus = "超期完成";
            }
            return el;
          });
        }
      );
    },
    // 左下角 待办 超期
    getgetChaoqiRicheng() {
      let dataTime = dayjs(this.selectDay.date).format("YYYY-MM-DD");
      getChaoqiRicheng(this.$store.getters.deptId, dataTime, 0, 0, 1).then(
        (res) => {
          this.AgentList = res.data.data.records.map((el) => {
            el.calcTime = el.renwukaishishijian + "-" + el.renwujiezhishijian;
            if (el.isFinish == 0) {
              el.finishStatus = "未完成";
            } else if (el.isFinish == 1) {
              el.finishStatus = "完成";
            } else {
              el.finishStatus = "超期完成";
            }
            return el;
          });
        }
      );
    },
    //左上角数据
    getdSelectPeriodControlRates() {
      selectPeriodControlRates(this.$store.getters.deptId).then((res) => {
        if (res.data.code == 200) {
          this.PeriodControlRates = res.data.data;
        } else {
          this.$message.warning("未生成标准化文件");
        }
      });
    },
    // 安全提示
    getSelectSafetyTips() {
      selectSafetyTips(this.$store.getters.deptId).then((res) => {
        this.SafetyTips = res.data.data;
        if (this.SafetyTips.length > 2) {
          this.DBheight = 420;
        } else {
          this.DBheight = 620;
        }
      });
    },
    // 安全提示
    getSelectQiYeAnBiaoMuLu() {
      selectQiYeAnBiaoMuLu(this.$store.getters.deptId).then((res) => {
        if (res.data.code == 200) {
          if (res.data.data.length > 0) {
            this.tableData = res.data.data;
          } else {
            this.$message.warning("未生成标准化文件");
          }
        } else {
          this.$message.warning("未生成标准化文件");
        }
      });
    },
    // 待办事项查看
    handleClick(row) {
      this.showMsg = false;
      this.showDetail = true;
      this.detailMessage = row;
    },
    // 关闭 待办详情
    closeDetail() {
      this.showMsg = true;
      this.showDetail = false;
    },
    // 安标目录表 行点击
    rowClick(row) {
      let arr = row.tier.split("-");
      this.$router.push({ path: "/daily/standard", query: arr });
    },
    // 今日待办
    today() {
      this.chekIndex = 0;
      this.getSelectScheduleReminders();
    },
    // 待办 超期
    chaoqi() {
      this.chekIndex = 1;
      this.getgetChaoqiRicheng();
    },
  },
};
</script>
<style lang="scss">
@import "../../../assets/css/common.css";
$root-color: #409eff;
$root-red: red;
.safety-page-2X {
  display: flex;
  // height: calc(100vh - 90px);
  height: 100%;
  padding: 20px;
  background: #eef7ff;
  box-sizing: border-box;

  .margin-bottom15 {
    margin-bottom: 15px;
    font-size: 2.4vh;
  }
  .item-shadow {
    box-shadow: 0px 1px 5px $root-color;
  }
  .color-blue {
    color: $root-color;
  }
  .color-red {
    color: $root-red;
    font-weight: 700;
    margin: 0 2px;
  }
  .has-gutter {
    color: #333;
  }
  .contetn-left {
    width: 58%;
    height: 80vh;
    // height: calc(100%);
    .card {
      height: 20%;
      padding: 2vh;
      margin-bottom: 1.5vh;
      border-radius: 10px;
      color: #fff;
      background-image: linear-gradient(to right, #277de0, #56dbed);
      .title {
        font-size: 2.6vh;
      }
      .content {
        font-size: 1.9vh;
        margin-top: 0.4vh;
      }
      .num {
        text-align: right;
        font-weight: 600;
        font-size: 2.4vh;
        margin-top: 1.5vh;
      }
    }
    .agent {
      border-radius: 10px;
      padding-top: 15px;
      background: #fff;
      height: 67.5vh;
      // height: calc(100% - 220px);
      // height: 77.5%;
      box-sizing: border-box;
      .com-calendar {
        padding: 0 3vh;
      }
      .agent-list {
        padding-left: 15px;
        margin-top: 10px;
        // height: 40vh;
        .title {
          padding-bottom: 10px;
          font-size: 1.8vh;
          border-bottom: 1px solid #e3e3e3;
          display: flex;
          justify-content: space-between;
          img {
            margin-left: 10px;
            width: 20px;
          }
          .title-right {
            display: flex;
            .tab-box {
              display: flex;
              span {
                display: block;
                line-height: 30px;
                margin-right: 2vh;
                cursor: pointer;
              }
              &.checked {
                color: #01a0ff;
                background: transparent !important;
              }
            }
          }
        }
        .tab-list {
          height: 23vh;
          overflow: auto;
          .tab-title {
            width: 50px;
          }
        }
        .el-table thead {
          color: #333;
        }
      }
    }
  }
  .conetent-right {
    width: 40%;
    margin-left: 1.6%;
    height: 85vh;
    padding: 20px;
    border-radius: 10px;
    border: 1px solid $root-color;
    background: #fff;
    .text-body {
      width: 100%;
      max-height: 230px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      .text-list {
        width: 50%;
        font-size: 1.5vh;
        line-height: 2.5vh;
        padding-left: 2vh;
        p {
          margin-bottom: 5px;
        }
      }
    }
    .tishi {
      font-size: 2vh;
    }
  }
}
</style>
