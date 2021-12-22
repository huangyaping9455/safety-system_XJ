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
                @click="refresh"
              ></el-button>
            </el-tooltip>
          </div>
        </div>
        <el-table
          :data="VehicleTableData"
          :height="vehicleTableHeight"
          border
          style="width: 100%"
          ref="vehicletable"
          v-loading="tabloading"
        >
          <el-table-column
            prop="deptName"
            label="企业名称"
            align="center"
            :show-overflow-tooltip="true"
            width="220"
          >
          </el-table-column>
          <el-table-column
            label="社会统一信用代码"
            prop="jigoubianma"
            align="center"
            width="150"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="jingyingxukezhengbianma"
            label="经营许可证号"
            align="center"
            width="110"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="jingyingfanwei"
            label="经营范围"
            align="center"
            width="140"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="jingyingxukezhengchulingriqi"
            label="初次发证日期"
            align="center"
            width="140"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="jingyingxukezhengyouxiaoqi"
            label="有效截止日期"
            align="center"
            width="140"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="xiangxidizhi"
            label="地址"
            align="center"
            width="220"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="lianxidianhua"
            label="联系方式"
            align="center"
            width="150"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column prop="farendaibiao" label="法人姓名" align="center">
          </el-table-column>
          <el-table-column
            prop="farenshenfenzheng"
            label="法人身份证号"
            align="center"
            width="200"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="farendianhua"
            label="法人电话"
            align="center"
            width="150"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="securityofficertelephone"
            label="企业安全负责人电话"
            align="center"
            width="150"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column fixed="right" label="操作" align="center" width="70">
            <template slot-scope="scope">
              <el-button
                @click="handleupdate(scope.row)"
                type="text"
                size="small"
                >编辑</el-button
              >
            </template>
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
        <company-update
          ref="vehiclemsg"
          :vehiclemsgList="vehiclemsgList"
        ></company-update>
      </div>
    </div>
  </div>
</template>

<script>
import { detailByDeptId } from "@/api/daily/vehicle";
import { export_json_to_excel } from "@/const/Export2Excel";
import companyUpdate from "./companyupdate";
export default {
  components: { companyUpdate },
  data() {
    return {
      current: 1,
      size: 20,
      total: 20,
      vehicleTableHeight: 700,
      tabloading: false,
      VehicleTableData: [],
      vehiclemsgList: {},
    };
  },
  mounted() {
    this.getVehicleList();
    this.$nextTick(function() {
      this.vehicleTableHeight =
        window.innerHeight - this.$refs.vehicletable.$el.offsetTop - 110;
      // 监听窗口大小变化
      let self = this;
      window.onresize = function() {
        self.vehicleTableHeight =
          window.innerHeight - self.$refs.vehicletable.$el.offsetTop - 110;
      };
    });
  },
  methods: {
    // 列表数据
    getVehicleList() {
      this.tabloading = true;
      detailByDeptId(this.$store.getters.userInfo.deptId).then((res) => {
        if (res.data.code === 200) {
          this.tabloading = false;
          this.VehicleTableData = [res.data.data];
          this.total = res.data.data.total;
        } else {
          this.tabloading = false;
          this.$message.error("出错了···");
          this.VehicleTableData = [];
        }
      });
    },
    handleSizeChange(tal) {
      this.size = tal;
      this.getVehicleList();
    },
    handleCurrentChange(tal) {
      this.current = tal;
      this.getVehicleList();
    },
    refresh() {
      this.current = 1;
      this.getVehicleList();
    },
    // 修改
    handleupdate(row, index) {
      this.typee = "编辑";
      this.vehiclemsgList = row;
      this.$refs.vehiclemsg.vehicleVisible = true;
      this.$refs.vehiclemsg.updatedisable = false;
      this.$refs.vehiclemsg.updateLoading = false;
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
      /deep/ .el-dialog {
        background: #fff;
        .el-dialog__body {
          padding: 1rem;
        }
        .el-dialog__header {
          padding: 10px !important;
        }
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
