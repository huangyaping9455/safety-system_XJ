<template>
  <div class="vehicle">
    <div class="vehicle-body">
      <div class="vehicle-main">
        <div class="vehicle-main-head">
          <div class="vehicle-main-head-left">
            <el-input
              placeholder="请输入驾驶员姓名"
              autosize
              clearable
              v-model="jiashiyuanxingming"
              style="margin-right:10px;"
            >
            </el-input>
            <el-date-picker
              v-model="betime"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              style="margin-right:10px;"
              value-format="yyyy-MM-dd"
            >
            </el-date-picker>
            <el-button
              type="primary"
              size="small"
              icon="el-icon-search"
              @click="getDriverList()"
              >搜索</el-button
            >
          </div>
          <div class="vehicle-main-head-right">
            <el-tooltip
              class="item"
              effect="dark"
              content="刷新"
              placement="bottom"
            >
              <el-button
                type="primary"
                icon="el-icon-refresh"
                circle
                size="small"
              ></el-button>
            </el-tooltip>
          </div>
        </div>
        <el-table
          :data="DriverTableData"
          :height="driverTableHeight"
          border
          style="width: 100%"
          ref="drivertable"
          v-loading="tabloading"
        >
          <el-table-column
            label="驾驶员姓名"
            prop="jiashiyuanxingming"
            align="center"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="shenfenzhenghao"
            label="身份证号"
            align="center"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="shoujihaoma"
            label="联系电话"
            align="center"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="congyezigezheng"
            label="从业资格证号码"
            align="center"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="time"
            label="时间"
            align="center"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            label="违规次数"
            align="center"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              <el-link
                v-if="scope.row.alarmnum > 0"
                style="color:#01a0ff;font-weight:600;"
                @click="vioShow(scope.row)"
              >
                {{ scope.row.alarmnum }}
              </el-link>
              <span v-else>{{ scope.row.alarmnum }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="studystatus"
            label="是否需要学习"
            align="center"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="studyremark"
            label="学习结果"
            align="center"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="current"
          :page-sizes="[20, 50, 100, 200]"
          :page-size="size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
        <vio-msg ref="vioshow" :betime="betime"></vio-msg>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
import { getToken } from "@/util/auth";
import { getDriverAlarmTJ } from "@/api/daily/vehicle";
import { export_json_to_excel } from "../../../const/Export2Excel";
import VioMsg from "./vioMsg.vue";
export default {
  components: { VioMsg },
  data() {
    return {
      current: 1,
      size: 20,
      total: 20,
      driverTableHeight: 700,
      tabloading: false,
      DriverTableData: [],
      jiashiyuanxingming: "",
      betime: [dayjs().format("YYYY-MM-DD"), dayjs().format("YYYY-MM-DD")],
    };
  },
  mounted() {
    this.getDriverList();
    this.$nextTick(function() {
      this.driverTableHeight =
        window.innerHeight - this.$refs.drivertable.$el.offsetTop - 100;
      // 监听窗口大小变化
      let self = this;
      window.onresize = function() {
        self.driverTableHeight =
          window.innerHeight - self.$refs.drivertable.$el.offsetTop - 100;
      };
    });
  },
  methods: {
    getDriverList() {
      let data = {
        current: this.current,
        size: this.size,
        jiashiyuanxingming: this.jiashiyuanxingming,
        beginTime: this.betime[0],
        endTime: this.betime[1],
      };
      getDriverAlarmTJ(data).then((res) => {
        this.DriverTableData = res.data.data.records.map((el) => {
          el.time = el.beginTime + "-" + el.endTime;
          return el;
        });
      });
    },
    handleSizeChange(tal) {
      this.size = tal;
      this.getDriverList();
    },
    handleCurrentChange(tal) {
      this.current = tal;
      this.getDriverList();
    },
    vioShow(row) {
      this.$refs.vioshow.searchVisible = true;
      this.$refs.vioshow.tableData = [];
      this.$refs.vioshow.getDriverAlarmXQTJ(row.id);
    },
  },
};
</script>

<style lang="scss" scoped>
.vehicle {
  width: 100%;
  height: calc(100% - 57px);
  padding: 1.5rem;
  background-color: #f2f9ff;
  .vehicle-body {
    width: 100%;
    .vehicle-main {
      width: 100%;
      height: calc(100%);
      padding: 0.2rem 1rem;
      background-color: #fff;
      .vehicle-main-head {
        height: 3.5rem;
        width: 100%;
        display: flex;
        justify-content: space-between;
        .vehicle-main-head-left {
          display: flex;
          align-items: center;
          margin-right: 1rem;
          .el-input {
            width: 200px;
          }
        }
        .vehicle-main-head-right {
          display: flex;
          align-items: center;
        }
      }
      .el-pagination {
        height: 3rem;
        background: #ffffff;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        padding: 0 1rem;
      }
    }
  }
}
</style>
<style>
.vehicle-main .el-table th {
  background-color: #ecf8ff;
  color: #01a0ff;
}
</style>
