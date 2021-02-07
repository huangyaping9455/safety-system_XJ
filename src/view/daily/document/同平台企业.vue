<template>
  <!-- 安全标准化--涵日历 -->
  <div class="safety-page-2X flex-row al-center jf-center">
      <div class="contetn-left">
      <div class="card item-shadow">
        <p class="title font-bold">超过88%的同平台企业</p>
        <p class="content font-size12">
          你的安全标准化达标分数已更新。保持良好的完善记录，有助于安全标准化达标分数保持稳定和提升。
        </p>
        <p class="num"><span>745/1000</span></p>
      </div>
      <div class="agent item-shadow">
        <Calendar class="com-calendar" />
        <div class="agent-list">
          <div class="title">
            <span>2020年10月7号代办事项</span>
            <img src="../../../assets/new_icon/add.png" alt="">
          </div>
          <!-- <div class="tab-list"> -->
            <el-table  :data="AgentList" class="tab-list">
              <el-table-column type="index"  width="50"> </el-table-column>
              <el-table-column prop="name"  label="事件名称" >
              </el-table-column>
              <el-table-column prop="user"  label="创建人"></el-table-column>
              <el-table-column prop="date"  label="创建时间"> </el-table-column>
              <el-table-column  label="标题">
                  <template v-slot={row}>
                  <div class="text-ellipsis tab-title" :title="row.address"> {{ row.title }}</div>
                </template>
              </el-table-column>
              <el-table-column  label="状态">
                <template v-slot={row}>
                  <span  class="color-red"> {{ row.staus }}</span>
                </template>
              </el-table-column>
            </el-table>
          <!-- </div> -->
        </div>
      </div>
    </div>
    <div  class="conetent-right item-shadow">
      <p class="font-bold margin-bottom15">
        安全标准化总项16大项，共计108小项；此次达标顶项13项，共计90小项；达标率为<span
          class="color-red"
          >83.43%</span
        >
      </p>
      <div class="flex-row margin-bottom15">
        <span class="font-bold color-blue">安全提示：</span>
        <div class="text-list">
          <p>1.[安全目标]项共计<span  class="color-red">7</span>小项，有<span  class="color-red">4</span>项未达标</p>
          <p>2.[管理机构和人员]项共计<span  class="color-red">4</span>小项，有<span  class="color-red">2</span>项未达标</p>
        </div>
      </div>
      <div class="flex-row margin-bottom15">
        <span class="font-bold color-blue">日常提醒：</span>
        <div class="text-list">
          <p class="color-666">1.车辆合同到期<span  class="color-red">4</span>辆</p>
          <p class="color-666">1.人员从业资格证到期<span  class="color-red">123123</span>人</p>
        </div>
      </div>
      <el-table :data="tableData" max-height="320" stripe style="width: 100%">
        <el-table-column prop="name" label="目录" >
        </el-table-column>
        <el-table-column prop="date" label="标准得分" width="200">
        </el-table-column>
        <el-table-column prop="address" label="本次得分" width="100"> </el-table-column>
      </el-table>
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
      AgentList: [
        {
          name: "一、安全目标",
          user: "60",
          date: '2019-01-01',
          title: '用章流程',
          staus: '未处理'
        },
        {
          name: "一、安全目标",
          user: "60",
          date: '2019-01-01',
          title: '用章流程',
          staus: '未处理'
        },{
          name: "一、安全目标",
          user: "60",
          date: '2019-01-01',
          title: '用章流程',
          staus: '未处理'
        },
      ],

      tableData: [
        {
          date: "80",
          name: "一、安全目标",
          address: "60",
        },
        {
          date: "80",
          name: "一、安全目标",
          address: "60",
        },
        {
          date: "80",
          name: "一、安全目标",
          address: "60",
        },
        {
          date: "80",
          name: "一、安全目标",
          address: "60",
        },
      ],
    };
  },
  mounted() {},
  methods: {},
};
</script>
<style lang="scss">
@import "../../../assets/css/common.css";
$root-color: #409eff;
$root-red: #f56c6c;
.safety-page-2X {
  display: flex;
  height: calc(100vh - 100px);
  padding: 20px;
  background: #eef7ff;
  box-sizing: border-box;
  
  .margin-bottom15 {
    margin-bottom: 15px;
  }
  .item-shadow {
    box-shadow: 0px 1px 5px $root-color;
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
    width: 48%;
    height: 80vh;
    .card {
      height: 15vh;
      padding: 10px 20px;
      margin-bottom: 15px;
      border-radius: 10px;
      color: #fff;
      background-image: linear-gradient(to right, #277de0, #56dbed);
      .title {
        font-size: 24px;
      }
      .content {
        font-size: 12px;
      }
      .num {
        text-align: right;
      }
    }
    .agent {
      border-radius: 10px;
      padding-top: 15px;
      background: #fff;
      height: calc(65vh - 15px);
      box-sizing: border-box;
      .com-calendar {
        overflow: auto;
      }
      .agent-list {
        padding-left: 15px;
        margin-top: 10px;
        // height: 40vh;
        .title {
          padding-bottom: 10px;
          border-bottom: 1px solid #e3e3e3;
          img{
          margin-left: 10px;
          width: 20px;
        }
        }
        .tab-list {
          height: 22vh;
          overflow: auto;
          .tab-title{
            width: 50px;
          }
        }
      }
    }
  }
  .conetent-right {
    width: 50%;
    margin-left: 2%;
    height: 80vh;
    padding: 20px;
    border-radius: 10px;
    border: 1px solid $root-color;
    background: #fff;
    .text-list {
      font-size: 12px;
      p {
        margin-bottom: 5px;
      }
    }
  }
}
</style>