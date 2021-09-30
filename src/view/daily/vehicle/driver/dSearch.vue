<template>
  <el-dialog title="筛选条件" :visible.sync="searchVisible" width="32%" center>
    <div class="dialog-input">
      <span class="dialogname">姓名：</span>
      <el-input
        placeholder="请输入姓名"
        v-model="searchMsg.jiashiyuanxingming"
        clearable
      ></el-input>
    </div>
    <div class="dialog-input">
      <span class="dialogname">性别：</span>
      <el-select v-model="searchMsg.xingbie" clearable placeholder="请选择性别">
        <el-option label="男" value="1"></el-option>
        <el-option label="女" value="2"></el-option>
      </el-select>
    </div>
    <div class="dialog-input">
      <span class="dialogname">身份证号码：</span>
      <el-input
        placeholder="请输入身份证号码"
        v-model="searchMsg.shenfenzhenghao"
        clearable
      ></el-input>
    </div>
    <div class="dialog-input">
      <span class="dialogname">准驾车型：</span>
      <el-select
        v-model="searchMsg.zhunjiachexing"
        clearable
        placeholder="请选择准驾车型"
      >
        <el-option
          v-for="(item, index) in zhunjiachexingList"
          :key="index"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>
    <div class="dialog-input">
      <span class="dialogname">从业资格证类别：</span>
      <div class="search_t">
        <el-select v-model="searchMsg.congyeleibiestatus" clearable>
          <el-option
            v-for="(item, index) in congyetype"
            :key="index"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <el-select
          v-model="searchMsg.congyeleibie"
          clearable
          placeholder="请选择从业资格证类别"
        >
          <el-option
            v-for="(item, index) in congyeleibieList"
            :key="index"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
    </div>
    <div class="dialog-input">
      <span class="dialogname">从业人员类型：</span>
      <el-select
        v-model="searchMsg.jiashiyuanleixing"
        clearable
        placeholder="请选择从业人员类型"
      >
        <el-option
          v-for="(item, index) in congyerenyuanleixingList"
          :key="index"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>
    <div class="dialog-input">
      <span class="dialogname">从业资格证初次发放日期：</span>
      <div class="search_t">
        <el-select v-model="searchMsg.congyezhengchulingristatus" clearable>
          <el-option
            v-for="(item, index) in status"
            :key="index"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <el-date-picker
          v-model="searchMsg.congyezhengchulingri"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="请选择初领日期"
        >
        </el-date-picker>
      </div>
    </div>
    <div class="dialog-input">
      <span class="dialogname">从业资格证有效截止日期：</span>
      <div class="search_t">
        <el-select v-model="searchMsg.congyezhengyouxiaoqistatus" clearable>
          <el-option
            v-for="(item, index) in status"
            :key="index"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <el-date-picker
          v-model="searchMsg.congyezhengyouxiaoqi"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择到期时间"
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
        jiashiyuanxingming: "",
        xingbie: "",
        shenfenzhenghao: "",
        zhunjiachexing: "",
        congyeleibiestatus: "",
        congyeleibie: "",
        congyezhengchulingristatus: "",
        congyezhengchulingri: "",
        congyezhengyouxiaoqistatus: "",
        congyezhengyouxiaoqi: "",
        congyerenyuanleixing: "",
      },
      congyeleibieList: [],
      zhunjiachexingList: [],
      congyerenyuanleixingList: [],
      congyetype: [
        {
          value: "包含",
          label: "包含",
        },
        {
          value: "属于",
          label: "属于",
        },
        {
          value: "不包含",
          label: "不包含",
        },
        {
          value: "不属于",
          label: "不属于",
        },
      ],
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
    this.getzhunjia();
    this.getcongye();
    this.getcongyerenyuan();
  },
  methods: {
    // 获取准驾车型
    getzhunjia() {
      getDicData("zhunjiachexing").then((res) => {
        this.zhunjiachexingList = res.data.data;
      });
    },
    // 获取从业资格证类别
    getcongye() {
      getDicData("congyezigezhengleibie").then((res) => {
        this.congyeleibieList = res.data.data;
      });
    },
    // 获取从业资格证类别
    getcongyerenyuan() {
      getDicData("congyerenyuanleixing").then((res) => {
        this.congyerenyuanleixingList = res.data.data;
      });
    },
    searchTrue() {
      this.searchVisible = false;
      this.$parent.getDriverList();
    },
  },
};
</script>

<style lang="scss" scoped>
/deep/ .el-dialog {
  padding: 1vmin;
  .dialog-input {
    display: flex;
    margin-bottom: 1rem;
    .dialogname {
      width: 27%;
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
      .el-select:first-child {
        width: 40%;
      }
    }
  }
}
</style>
