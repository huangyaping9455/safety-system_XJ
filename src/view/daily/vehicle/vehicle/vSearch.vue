<template>
  <el-dialog title="筛选条件" :visible.sync="searchVisible" width="30%" center>
    <div class="dialog-input">
      <span class="dialogname">企业名称：</span>
      <el-input
        placeholder="请输入企业名称"
        v-model="searchMsg.deptName"
        clearable
      ></el-input>
    </div>
    <div class="dialog-input">
      <span class="dialogname">车辆牌照：</span>
      <el-input
        placeholder="请输入车辆牌照"
        v-model="searchMsg.cheliangpaizhao"
        clearable
      ></el-input>
    </div>
    <div class="dialog-input">
      <span class="dialogname">车牌颜色：</span>
      <el-select
        v-model="searchMsg.chepaiyanse"
        clearable
        placeholder="请选择车牌颜色"
      >
        <el-option
          v-for="(item, index) in chepaiyanselist"
          :key="index"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>
    <div class="dialog-input">
      <span class="dialogname">行业类别：</span>
      <el-select
        v-model="searchMsg.shiyongxingzhi"
        clearable
        placeholder="请选择行业类别"
      >
        <el-option
          v-for="(item, index) in shiyongxingzhilist"
          :key="index"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>
    <div class="dialog-input">
      <span class="dialogname">道路运输证初次发放日期：</span>
      <div class="search_t">
        <el-select
          v-model="searchMsg.daoluyunshuzhengchulingriqistatus"
          clearable
        >
          <el-option
            v-for="(item, index) in status"
            :key="index"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <el-date-picker
          v-model="searchMsg.daoluyunshuzhengchulingriqi"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择发放日期"
        >
        </el-date-picker>
      </div>
    </div>
    <div class="dialog-input">
      <span class="dialogname">道路运输证有效截至日期：</span>
      <div class="search_t">
        <el-select
          v-model="searchMsg.daoluyunshuzhengyouxiaoqistatus"
          clearable
        >
          <el-option
            v-for="(item, index) in status"
            :key="index"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <el-date-picker
          v-model="searchMsg.daoluyunshuzhengyouxiaoqi"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择到期时间"
        >
        </el-date-picker>
      </div>
    </div>
    <div class="dialog-input">
      <span class="dialogname">本次年检日期：</span>
      <div class="search_t">
        <el-select v-model="searchMsg.bencinianjianriqistatus" clearable>
          <el-option
            v-for="(item, index) in status"
            :key="index"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <el-date-picker
          v-model="searchMsg.bencinianjianriqi"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择本次年检日期"
        >
        </el-date-picker>
      </div>
    </div>
    <div class="dialog-input">
      <span class="dialogname">下次年检日期：</span>
      <div class="search_t">
        <el-select v-model="searchMsg.xiacinianjianriqistatus" clearable>
          <el-option
            v-for="(item, index) in status"
            :key="index"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <el-date-picker
          v-model="searchMsg.xiacinianjianriqi"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择下次年检日期"
        >
        </el-date-picker>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="searchVisible = false">取 消</el-button>
      <el-button type="primary" @click="searchTrue">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getDicData } from "@/api/daily/vehicle";
export default {
  data() {
    return {
      searchVisible: false,
      searchMsg: {
        deptName: "",
        cheliangpaizhao: "",
        chepaiyanse: "",
        shiyongxingzhi: "",
        daoluyunshuzhengchulingriqistatus: "",
        daoluyunshuzhengchulingriqi: "",
        daoluyunshuzhengyouxiaoqistatus: "",
        daoluyunshuzhengyouxiaoqi: "",
        bencinianjianriqistatus: "",
        bencinianjianriqi: "",
        xiacinianjianriqistatus: "",
        xiacinianjianriqi: "",
      },
      chepaiyanselist: [],
      shiyongxingzhilist: [],
      status: [
        {
          value: "等于",
          label: "等于",
        },
        {
          value: "大于",
          label: "大于",
        },
        {
          value: "大于等于",
          label: "大于等于",
        },
        {
          value: "小于",
          label: "小于",
        },
        {
          value: "小于等于",
          label: "小于等于",
        },
      ],
    };
  },
  mounted() {
    this.getcpys();
    this.getshiyongxingzhi();
  },
  methods: {
    // 获取车牌颜色
    getcpys() {
      getDicData("colour").then((res) => {
        this.chepaiyanselist = res.data.data;
      });
    },
    // 获取行业类别
    getshiyongxingzhi() {
      getDicData("shiyongxingzhi").then((res) => {
        this.shiyongxingzhilist = res.data.data;
      });
    },
    searchTrue() {
      this.searchVisible = false;
      this.$parent.getVehicleList();
    },
  },
};
</script>

<style lang="scss" scoped>
/deep/ .el-dialog {
  padding: 2vmin;
  .el-dialog__body {
    padding: 1vmin;
    .dialog-input {
      display: flex;
      margin-bottom: 1rem;
      .dialogname {
        width: 24%;
        margin-right: 3px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        text-align: right;
      }
      .el-input,
      .el-select,
      .search_t {
        width: 100%;
        display: flex;
        .el-input {
          width: 100%;
        }
        .el-select {
          width: 40%;
        }
      }
    }
  }
}
</style>
