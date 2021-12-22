<template>
  <div class="vehicle">
    <div class="vehicle-body">
      <div class="vehicle-main">
        <div class="vehicle-main-head">
          <div class="vehicle-main-head-left"></div>
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
            label="事故车辆"
            prop="plate"
            align="center"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="driverName"
            label="驾驶员"
            align="center"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="phone"
            label="联系电话"
            align="center"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="address"
            label="发生地点"
            align="center"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="yuanyin"
            label="报案原因"
            align="center"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="qingkuang"
            label="道路情况"
            align="center"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="danwei"
            label="填报单位"
            align="center"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="time"
            label="填报时间"
            align="center"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="tianbaoren"
            label="填报人"
            align="center"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="shenheren"
            label="审核人"
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
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
import { getDriverAlarmTJ } from "@/api/daily/vehicle";
export default {
  data() {
    return {
      current: 1,
      size: 20,
      total: 20,
      driverTableHeight: 700,
      tabloading: false,
      DriverTableData: [
        {
          plate: "渝A9527",
          driverName: "苏三石",
          phone: "15156789442",
          address: "重庆市渝北区",
          yuanyin: "",
          qingkuang: "",
          danwei: "",
          time: "2021-10-23",
          tianbaoren: "邓肯",
          shenheren: "苏鸿帆",
        },
      ],
    };
  },
  mounted() {
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
    handleSizeChange(tal) {
      this.size = tal;
    },
    handleCurrentChange(tal) {
      this.current = tal;
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
