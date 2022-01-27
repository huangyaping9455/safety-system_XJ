<template>
  <el-dialog
    :title="typee"
    :visible.sync="accidentVisible"
    class="accidentdialog"
    width="75%"
    top="5vh"
    center
  >
    <el-form
      ref="form"
      :model="accidentDetail"
      :rules="rules"
      :disabled="disabledForm"
      label-width="180px"
      style="width:100%;max-height:700px;overflow:auto;padding:0 10px;"
    >
      <el-col :span="8">
        <el-form-item label="车牌号：" prop="chepaihao">
          <el-select
            v-if="chepaiList.length > 0"
            v-model="accidentDetail.chepaihao"
            placeholder="请选择车牌号"
            style="width:100%;"
          >
            <el-option
              :label="item.label"
              :value="item.value"
              v-for="(item, index) in chepaiList"
              :key="index"
            ></el-option>
          </el-select>
          <el-input
            v-else
            v-model="accidentDetail.chepaihao"
            placeholder="请输入车牌号"
          />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="驾驶人员：" prop="jiashiyuan">
          <el-select
            v-if="jiashiyuanList.length > 0"
            v-model="accidentDetail.jiashiyuan"
            placeholder="请选择驾驶人员"
            style="width:100%;"
          >
            <el-option
              :label="item.label"
              :value="item.value"
              v-for="(item, index) in jiashiyuanList"
              :key="index"
            ></el-option>
          </el-select>
          <el-input
            v-else
            v-model="accidentDetail.jiashiyuan"
            placeholder="请输入驾驶人员"
          />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="事故日期：" prop="shigufashengshijian">
          <el-date-picker
            type="datetime"
            placeholder="选择日期"
            v-model="accidentDetail.shigufashengshijian"
            style="width: 100%;"
            value-format="yyyy-MM-dd HH:mm:ss"
            format="yyyy-MM-dd HH:mm:ss"
          ></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="事故等级：" prop="shigufenlei">
          <el-select
            v-model="accidentDetail.shigufenlei"
            placeholder="请选择事故等级"
            style="width:100%;"
          >
            <el-option
              :label="item.label"
              :value="item.value"
              v-for="(item, index) in sgdjList"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="事故性质：">
          <el-select
            v-model="accidentDetail.shiguxingtai"
            placeholder="请选择事故性质"
            style="width:100%;"
          >
            <el-option
              :label="item.label"
              :value="item.value"
              v-for="(item, index) in sgxzList"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="事故责任划分：">
          <el-select
            v-model="accidentDetail.zerenfenxi"
            placeholder="请选择事故责任划分"
            style="width:100%;"
          >
            <el-option
              :label="item.label"
              :value="item.value"
              v-for="(item, index) in sgzrhfList"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="事故地点：" prop="address">
          <div style="width:100%;display:flex;">
            <el-select
              v-model="province"
              placeholder="请选择省"
              style="width:100%;"
              filterable
              clearable
              @change="proviceChange"
              value-key="id"
            >
              <el-option
                :label="item.title"
                :value="item"
                v-for="(item, index) in proviceList"
                :key="index"
              ></el-option>
            </el-select>
            <el-select
              v-model="country"
              placeholder="请选择市"
              style="width:100%;"
              filterable
              clearable
              @change="countryChange"
              value-key="id"
            >
              <el-option
                :label="item.title"
                :value="item"
                v-for="(item, index) in countryList"
                :key="index"
              ></el-option>
            </el-select>
            <el-select
              v-model="city"
              placeholder="请选择县"
              style="width:100%;"
              filterable
              clearable
            >
              <el-option
                :label="item.title"
                :value="item.title"
                v-for="(item, index) in cityList"
                :key="index"
              ></el-option>
            </el-select>
            <el-input v-model="address" placeholder="请输入详细地址" />
          </div>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="运行路线：">
          <el-input
            v-model="accidentDetail.yunxingxianlu"
            placeholder="请输入运行路线"
          />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="事故经济损失(元)：">
          <el-input-number
            controls-position="right"
            :min="0"
            v-model="accidentDetail.caichansunshi"
            placeholder="请输入事故经济损失"
            style="width:100%;"
          />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="公路线性状况：">
          <el-select
            v-model="accidentDetail.xianxingzhuangkuang"
            placeholder="请选择公路线性状况"
            style="width:100%;"
          >
            <el-option
              :label="item.label"
              :value="item.value"
              v-for="(item, index) in glxxList"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="公路技术等级：">
          <el-select
            v-model="accidentDetail.gonglujishudengji"
            placeholder="请选择公路技术等级"
            style="width:100%;"
          >
            <el-option
              :label="item.label"
              :value="item.value"
              v-for="(item, index) in gljsdjList"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="事故直接原因：">
          <el-select
            v-model="accidentDetail.shiguzhijieyuanyin"
            placeholder="请选择事故直接原因"
            style="width:100%;"
          >
            <el-option
              :label="item.label"
              :value="item.value"
              v-for="(item, index) in sgzjyyList"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="线路类型：">
          <el-select
            v-model="accidentDetail.xianluleibie"
            placeholder="请选择线路类型"
            style="width:100%;"
          >
            <el-option
              :label="item.label"
              :value="item.value"
              v-for="(item, index) in xllxList"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="始发站：">
          <el-input
            v-model="accidentDetail.shifazhan"
            placeholder="请输入始发站"
          />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="危险化学品品名：">
          <el-input
            v-model="accidentDetail.weihuapinming"
            placeholder="请输入危险化学品品名"
          />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="失踪人数(人)：">
          <el-input-number
            controls-position="right"
            :min="0"
            v-model="accidentDetail.shizong"
            placeholder="请输入失踪人数"
            style="width:100%;"
          />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="受伤人数(人)：">
          <el-input-number
            controls-position="right"
            :min="0"
            v-model="accidentDetail.shoushang"
            placeholder="请输入受伤人数"
            style="width:100%;"
          />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="死亡人数(人)：">
          <el-input-number
            controls-position="right"
            :min="0"
            v-model="accidentDetail.siwang"
            placeholder="请输入死亡人数"
            style="width:100%;"
          />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="外籍人员失踪数(人)：">
          <el-input-number
            controls-position="right"
            :min="0"
            v-model="accidentDetail.waijishizong"
            placeholder="请输入外籍人员失踪数"
            style="width:100%;"
          />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="外籍人员受伤人数(人)：">
          <el-input-number
            controls-position="right"
            :min="0"
            v-model="accidentDetail.waijishoushang"
            placeholder="请输入外籍人员受伤人数"
            style="width:100%;"
          />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="外籍人员死亡人数(人)：">
          <el-input-number
            controls-position="right"
            :min="0"
            v-model="accidentDetail.waijisiwang"
            placeholder="请输入外籍人员死亡人数"
            style="width:100%;"
          />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="天气情况：">
          <el-select
            v-model="accidentDetail.tianqiqingkuang"
            placeholder="请选择天气情况"
            style="width:100%;"
          >
            <el-option
              :label="item.label"
              :value="item.value"
              v-for="(item, index) in tianqiList"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="事故经过：">
          <el-input
            type="textarea"
            v-model="accidentDetail.shigugaikuang"
            placeholder="请输入事故经过"
          />
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="事故照片：">
          <el-upload
            action="/api/blade-upload/upload/upload?fileId=shiguzhaopian&table=anbiao_vehicle"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-success="handlesuccess1"
            :on-remove="handleremove1"
            :file-list="fileList1"
            :headers="headers"
            multiple
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="" />
          </el-dialog>
        </el-form-item>
      </el-col>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="accidentVisible = false">取 消</el-button>
      <el-button
        type="primary"
        @click="onSubmit"
        :disabled="updatedisable"
        :loading="updateLoading"
        >确 定</el-button
      >
    </span>
  </el-dialog>
</template>

<script>
import { getToken } from "@/util/auth";
import {
  getByIdJiaShiYuanList,
  getDicData,
  getByIdVehicleLis,
} from "@/api/daily/vehicle";
import {
  accidentDetail,
  getSheng,
  accidentInsert,
  accidentUpdate,
} from "@/api/daily/accident";
export default {
  props: {
    typee: {
      type: String,
    },
  },
  data() {
    let validateAddress = (rule, value, callback) => {
      if (
        this.province === "" ||
        this.country === "" ||
        this.city === "" ||
        this.address === ""
      ) {
        callback(new Error("请完善地址"));
      } else {
        callback();
      }
    };
    return {
      accidentVisible: false,
      dialogImageUrl: "",
      fileList1: [],
      headers: {
        "blade-auth": "Bearer " + getToken(),
      },
      dialogVisible: false,
      updatedisable: false,
      updateLoading: false,
      rules: {
        chepaihao: [
          { required: true, message: "请完善车牌号", trigger: "blur" },
        ],
        jiashiyuan: [
          { required: true, message: "请完善驾驶员", trigger: "blur" },
        ],
        shigufashengshijian: [
          { required: true, message: "请选择事故日期", trigger: "blur" },
        ],
        shigufenlei: [
          { required: true, message: "请选择事故等级", trigger: "blur" },
        ],
        address: [
          { required: true, validator: validateAddress, trigger: "blur" },
        ],
      },
      accidentDetail: {},
      glxxList: [],
      gljsdjList: [],
      sgzjyyList: [],
      xllxList: [],
      sgdjList: [],
      sgzrhfList: [],
      sgxzList: [],
      jiashiyuanList: [],
      chepaiList: [],
      tianqiList: [],
      proviceList: [],
      countryList: [],
      cityList: [],
      province: "",
      country: "",
      city: "",
      address: "",
      disabledForm: false,
    };
  },
  mounted() {},
  methods: {
    init() {
      this.getGlxxList();
      this.getGljsdjList();
      this.getSgzjyyList();
      this.getXllxList();
      this.getSgdjList();
      this.getSgzrhfList();
      this.getSgxzList();
      this.getTianqiList();
      this.getByIdJiaShiYuanList();
      this.getByIdVehicleLis();
      this.getSheng();
      this.province = "";
      this.country = "";
      this.city = "";
      this.address = "";
      this.accidentDetail = {};
      this.fileList1 = [];
      this.disabledForm = false;
      this.updatedisable = false;
      this.updateLoading = false;
    },
    getAccidentDetail(id) {
      accidentDetail(id).then((res) => {
        this.accidentDetail = res.data.data;
        this.province = this.accidentDetail.shigufashengdidian.split(",")[0];
        this.country = this.accidentDetail.shigufashengdidian.split(",")[1];
        this.city = this.accidentDetail.shigufashengdidian.split(",")[2];
        this.address = this.accidentDetail.shigufashengdidian.split(",")[3];

        if (this.accidentDetail.shiguzhaopian) {
          if (this.accidentDetail.shiguzhaopian.indexOf(",") != -1) {
            let zhaop = this.accidentDetail.shiguzhaopian.split(",");
            zhaop.pop();
            this.fileList1 = zhaop.map((el) => {
              return { url: el };
            });
            this.accidentDetail.shiguzhaopian = zhaop;
          }
        }
      });
    },
    //   提交
    onSubmit() {
      this.accidentDetail.shigufashengdidian =
        (this.province.title ? this.province.title : this.province) +
        "," +
        (this.country.title ? this.country.title : this.country) +
        "," +
        this.city +
        "," +
        this.address;
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.updatedisable = true;
          this.updateLoading = true;
          let isApi;
          if (this.typee === "新增") {
            isApi = accidentInsert;
          } else {
            isApi = accidentUpdate;
          }
          let ids = "";
          if (this.accidentDetail.shiguzhaopian) {
            if (typeof this.accidentDetail.shiguzhaopian !== typeof ids) {
              if (this.accidentDetail.shiguzhaopian.length > 0) {
                this.accidentDetail.shiguzhaopian.map((el) => {
                  return (ids += `${el},`);
                });
                this.accidentDetail.shiguzhaopian = ids;
              }
            }
          }
          isApi(this.accidentDetail).then((res) => {
            if (res.data.code == 200) {
              this.$message({
                type: "success",
                message: res.data.msg,
              });
              this.$parent.getAccidentList();
              this.accidentVisible = false;
              this.updatedisable = false;
              this.updateLoading = false;
            } else {
              this.$message({
                type: "error",
                message: res.data.msg,
              });
              this.updatedisable = false;
              this.updateLoading = false;
            }
          });
        } else {
          this.$message.error("请完善信息");
        }
      });
    },
    //车辆照片 上传
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handlesuccess1(file) {
      if (!this.accidentDetail.shiguzhaopian) {
        this.accidentDetail.shiguzhaopian = [file.url];
      } else {
        this.accidentDetail.shiguzhaopian.push(file.url);
      }
    },
    handleremove1(file, fileList, fileIndex) {
      if (fileList.length > 0) {
        this.accidentDetail.shiguzhaopian = fileList.map((el) => {
          return el.url;
        });
      } else {
        this.accidentDetail.shiguzhaopian = "";
      }
    },
    // 获取公路线性状况
    getGlxxList() {
      getDicData("xianxingzhuangkuang").then((res) => {
        this.glxxList = res.data.data;
      });
    },
    // 获取公路技术等级
    getGljsdjList() {
      getDicData("gonglujishudengji").then((res) => {
        this.gljsdjList = res.data.data;
      });
    },
    // 事故直接原因
    getSgzjyyList() {
      getDicData("shiguzhijieyuanyin").then((res) => {
        this.sgzjyyList = res.data.data;
      });
    },
    // 线路类别
    getXllxList() {
      getDicData("xianluleibie").then((res) => {
        this.xllxList = res.data.data;
      });
    },
    // 事故等级
    getSgdjList() {
      getDicData("shigufenlei").then((res) => {
        this.sgdjList = res.data.data;
      });
    },
    // 事故责任划分
    getSgzrhfList() {
      getDicData("zerenfenxi").then((res) => {
        this.sgzrhfList = res.data.data;
      });
    },
    // 事故性质
    getSgxzList() {
      getDicData("shiguxingtai").then((res) => {
        this.sgxzList = res.data.data;
      });
    },
    // 天气
    getTianqiList() {
      getDicData("weatherSituation").then((res) => {
        this.tianqiList = res.data.data;
      });
    },
    // 获取驾驶员
    getByIdJiaShiYuanList() {
      getByIdJiaShiYuanList(this.$store.getters.deptId).then((res) => {
        this.jiashiyuanList = res.data.data.map((el) => {
          el.label = el.jiashiyuanxingming;
          el.value = el.jiashiyuanxingming;
          return el;
        });
      });
    },
    // 获取车辆牌照
    getByIdVehicleLis() {
      getByIdVehicleLis(this.$store.getters.deptId).then((res) => {
        this.chepaiList = res.data.data.map((el) => {
          el.label = el.cheliangpaizhao;
          el.value = el.cheliangpaizhao;
          return el;
        });
      });
    },
    // 省 市 县
    getSheng() {
      getSheng(this.$store.getters.deptId, 0).then((res) => {
        this.proviceList = res.data.data;
      });
    },
    // 省 change事件
    proviceChange(val) {
      getSheng(val.id, 1).then((res) => {
        this.countryList = res.data.data;
      });
    },
    // 市 change事件
    countryChange(val) {
      getSheng(val.id, 2).then((res) => {
        this.cityList = res.data.data;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.accidentdialog {
  /deep/ .el-dialog {
    .el-dialog__body {
      padding: 10px !important;
    }
  }
}
</style>
