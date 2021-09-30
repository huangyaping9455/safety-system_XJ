<template>
  <el-dialog
    title="编辑"
    :visible.sync="vehicleVisible"
    width="70%"
    top="10vh"
    center
  >
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      label-width="140px"
      style="padding:1vh;height:680px;overflow:auto;"
    >
      <el-col :span="8">
        <el-form-item label="企业名称：" prop="deptName">
          <el-select
            v-model="form.deptNames"
            placeholder="请选择企业名称"
            style="width:100%;"
            filterable
            @change="deptChange"
          >
            <el-option
              :label="item.label"
              :value="item.value"
              v-for="(item, index) in deptNameList"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="驾驶员姓名：" prop="jiashiyuanxingming">
          <el-input
            v-model="form.jiashiyuanxingming"
            placeholder="请输入驾驶员姓名"
          />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="性别：" prop="xingbie">
          <el-select
            v-model="form.xingbie"
            placeholder="请选择性别"
            style="width:100%;"
          >
            <el-option label="男" value="1"></el-option>
            <el-option label="女" value="2"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="身份证号：" prop="shenfenzhenghao">
          <el-input
            v-model="form.shenfenzhenghao"
            placeholder="请输入身份证号"
          />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="手机号码：" prop="shoujihaoma">
          <el-input v-model="form.shoujihaoma" placeholder="请输入手机号码" />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="出生年月：">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="form.chushengshijian"
            style="width: 100%;"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="年龄：">
          <el-input v-model="form.nianling" placeholder="请输入年龄" />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="从业人员类型：" prop="congyerenyuanleixing">
          <el-input
            v-model="form.congyerenyuanleixing"
            placeholder="请输入从业人员类型"
          />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="身份证有效期：">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="form.shenfenzhengyouxiaoqi"
            style="width: 100%;"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="文化程度：">
          <el-input v-model="form.wenhuachengdu" placeholder="请输入文化程度" />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="聘用日期：">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="form.pinyongriqi"
            style="width: 100%;"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="机动驾驶员：">
          <el-input
            v-model="form.jidongjiashiyuan"
            placeholder="请输入机动驾驶员"
          />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="驾驶员类型：">
          <el-input
            v-model="form.jiashiyuanleixing"
            placeholder="请输入驾驶员类型"
          />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="家庭住址：" prop="jiatingzhuzhi">
          <el-input v-model="form.jiatingzhuzhi" placeholder="请输入家庭住址" />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="档案编号：">
          <el-input v-model="form.danganbianhao" placeholder="请输入档案编号" />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="驾驶证号：">
          <el-input
            v-model="form.jiashizhenghao"
            placeholder="请输入驾驶证号"
          />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="准驾车型：">
          <el-input
            v-model="form.zhunjiachexing"
            placeholder="请输入准驾车型"
          />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="驾龄：">
          <el-input v-model="form.jialing" placeholder="请输入驾龄" />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="违法记分：">
          <el-input v-model="form.weifajifen" placeholder="请输入违法记分" />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="驾驶证初领日期：">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="form.jiashizhengchulingri"
            style="width: 100%;"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="驾驶证有效期：" prop="jiashizhengyouxiaoqi">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="form.jiashizhengyouxiaoqi"
            style="width: 100%;"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="体检有效期：">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="form.tijianyouxiaoqi"
            style="width: 100%;"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="从业资格证：" prop="congyezigezheng">
          <el-input
            v-model="form.congyezigezheng"
            placeholder="请输入从业资格证"
          />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="从业类别：">
          <el-input v-model="form.congyeleibie" placeholder="请输入从业类别" />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="从业证有效期：" prop="congyezhengyouxiaoqi">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="form.congyezhengyouxiaoqi"
            style="width: 100%;"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="从业证初领日期：">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="form.congyezhengchulingri"
            style="width: 100%;"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="证件核发机关：">
          <el-input
            v-model="form.zhengjianhefajiguan"
            placeholder="请输证件核发机关"
          />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="发证机关：">
          <el-input v-model="form.fazhengjiguan" placeholder="请输入发证机关" />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="诚信考核时间：">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="form.chengxinkaoheshijian"
            style="width: 100%;"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="下次诚信考核时间：">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="form.xiacichengxinkaoheshijian"
            style="width: 100%;"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="继续教育时间：">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="form.jixvjiaoyushijian"
            style="width: 100%;"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="下次继续教育时间：">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="form.xiacijixvjiaoyushijian"
            style="width: 100%;"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="从业资格类别：">
          <el-input
            v-model="form.congyezigeleibie"
            placeholder="请输入从业资格类别"
          />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="证件状态：">
          <el-input
            v-model="form.zhengjianzhuangtai"
            placeholder="请输入证件状态"
          />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="护照号码：">
          <el-input v-model="form.huzhaohaoma" placeholder="请输入护照号码" />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="护照类别：">
          <el-input v-model="form.huzhaoleibie" placeholder="请输入护照类别" />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="国家码：">
          <el-input v-model="form.guojiama" placeholder="请输入国家码" />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="护照有效期：">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="form.huzhaoyouxiaoqi"
            style="width: 100%;"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="准驾证号：">
          <el-input
            v-model="form.zhunjiazhenghao"
            placeholder="请输入准驾证号"
          />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="准假类型：">
          <el-input
            v-model="form.zhunjialeixing"
            placeholder="请输入准假类型"
          />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="准运线：">
          <el-input v-model="form.zhunyunxian" placeholder="请输入准运线" />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="准驾证有效期：">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="form.zhunjiazhengyouxiaoqi"
            style="width: 100%;"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="缴纳标准：">
          <el-input
            v-model="form.jiaonabiaozhun"
            placeholder="请输入缴纳标准"
          />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="缴纳金额：">
          <el-input v-model="form.jiaonajine" placeholder="请输入缴纳金额" />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="是否缴纳：">
          <el-input v-model="form.shifoujiaona" placeholder="请输入是否缴纳" />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="超速违法记录：">
          <el-input
            v-model="form.chaosuweifajilu"
            placeholder="请输入超速违法记录"
          />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="交通违法记录：">
          <el-input
            v-model="form.jiaotongweifajilu"
            placeholder="请输入交通违法记录"
          />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="致人死亡责任：">
          <el-input
            v-model="form.zhirensiwangzeren"
            placeholder="请输入致人死亡责任"
          />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="违规类型：">
          <el-input
            v-model="form.weiguileoixing"
            placeholder="请输入违规类型"
          />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="驾车经历：">
          <el-input v-model="form.jiachejingli" placeholder="请输入驾车经历" />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="备注：">
          <el-input v-model="form.beizhu" placeholder="请输入备注" />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="部门：">
          <el-input v-model="form.bumen" placeholder="请输入部门" />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="离职时间：">
          <el-input v-model="form.lizhishijian" placeholder="请输入离职时间" />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="登录账号：">
          <el-input
            v-model="form.dengluzhanghao"
            placeholder="请输入登录账号"
          />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="照片：">
          <el-upload
            action="/api/blade-upload/upload/upload?fileId=cheliangzhaopian&table=anbiao_vehicle"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview1"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible1">
            <img width="100%" :src="dialogImageUrl1" alt="" />
          </el-dialog>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="身份证复印件：">
          <el-upload
            action="/api/blade-upload/upload/upload?fileId=cheliangzhaopian&table=anbiao_vehicle"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview2"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible2">
            <img width="100%" :src="dialogImageUrl2" alt="" />
          </el-dialog>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="从业证复印件：">
          <el-upload
            action="/api/blade-upload/upload/upload?fileId=cheliangzhaopian&table=anbiao_vehicle"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview3"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible3">
            <img width="100%" :src="dialogImageUrl3" alt="" />
          </el-dialog>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="驾驶证复印件：">
          <el-upload
            action="/api/blade-upload/upload/upload?fileId=cheliangzhaopian&table=anbiao_vehicle"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview4"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible4">
            <img width="100%" :src="dialogImageUrl4" alt="" />
          </el-dialog>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="复印件：">
          <el-upload
            action="/api/blade-upload/upload/upload?fileId=cheliangzhaopian&table=anbiao_vehicle"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview5"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible5">
            <img width="100%" :src="dialogImageUrl5" alt="" />
          </el-dialog>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item style="display:flex;justify-content:center;">
          <el-button
            type="primary"
            @click="onSubmit"
            :disabled="updatedisable"
            :loading="updateLoading"
            >修改</el-button
          >
          <el-button @click="vehicleVisible = false">取消</el-button>
        </el-form-item>
      </el-col>
    </el-form>
  </el-dialog>
</template>

<script>
import { getByIdDeptList, updatedriver } from "@/api/daily/vehicle";
export default {
  props: {
    vehiclemsgList: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      vehicleVisible: false,
      form: {
        deptNames: "",
        jiashiyuanxingming: "",
        xingbie: "",
        shenfenzhenghao: "",
        shoujihaoma: "",
        chushengshijian: "",
        nianling: "",
        congyerenyuanleixing: "",
        shenfenzhengyouxiaoqi: "",
        wenhuachengdu: "",
        pinyongriqi: "",
        jidongjiashiyuan: "",
        jiashiyuanleixing: "",
        jiatingzhuzhi: "",
        danganbianhao: "",
        jiashizhenghao: "",
        zhunjiachexing: "",
        jialing: "",
        weifajifen: "",
        jiashizhengchulingri: "",
        jiashizhengyouxiaoqi: "",
        tijianyouxiaoqi: "",
        congyezigezheng: "",
        congyeleibie: "",
        congyezhengyouxiaoqi: "",
        congyezhengchulingri: "",
        zhengjianhefajiguan: "",
        fazhengjiguan: "",
        chengxinkaoheshijian: "",
        xiacichengxinkaoheshijian: "",
        jixvjiaoyushijian: "",
        xiacijixvjiaoyushijian: "",
        congyezigeleibie: "",
        zhengjianzhuangtai: "",
        huzhaohaoma: "",
        huzhaoleibie: "",
        guojiama: "",
        huzhaoyouxiaoqi: "",
        zhunjiazhenghao: "",
        zhunjialeixing: "",
        zhunyunxian: "",
        zhunjiazhengyouxiaoqi: "",
        jiaonabiaozhun: "",
        jiaonajine: "",
        shifoujiaona: "",
        chaosuweifajilu: "",
        jiaotongweifajilu: "",
        zhirensiwangzeren: "",
        weiguileoixing: "",
        jiachejingli: "",
        beizhu: "",
        bumen: "",
        lizhishijian: "",
        dengluzhanghao: "",
      },
      dialogImageUrl1: "",
      dialogImageUrl2: "",
      dialogImageUrl3: "",
      dialogImageUrl4: "",
      dialogImageUrl5: "",
      dialogVisible1: false,
      dialogVisible2: false,
      dialogVisible3: false,
      dialogVisible4: false,
      dialogVisible5: false,
      deptNameList: [],
      chepaiyanselist: [],
      shiyongxingzhilist: [],
      xinghaolist: [],
      jiahsiyuanlist: [],
      updatedisable: false,
      updateLoading: false,
      rules: {
        deptName: [
          { required: true, message: "请输入企业名称", trigger: "blur" },
        ],
        jiashiyuanxingming: [
          { required: true, message: "请输入驾驶员姓名", trigger: "blur" },
        ],
        xingbie: [{ required: true, message: "请输入性别", trigger: "blur" }],
        shenfenzhenghao: [
          { required: true, message: "请选择身份证号", trigger: "blur" },
        ],
        shoujihaoma: [
          { required: true, message: "请选择手机号码", trigger: "blur" },
        ],
        congyerenyuanleixing: [
          { required: true, message: "请输入从业人员类型", trigger: "blur" },
        ],
        jiatingzhuzhi: [
          { required: true, message: "请输入家庭住址", trigger: "blur" },
        ],
        congyezigezheng: [
          { required: true, message: "请输入从业资格证", trigger: "blur" },
        ],
        congyezhengyouxiaoqi: [
          {
            required: true,
            message: "请输入从业资格证有效期",
            trigger: "blur",
          },
        ],
        jiashizhengyouxiaoqi: [
          { required: true, message: "请输入驾驶证有效期", trigger: "blur" },
        ],
      },
    };
  },
  mounted() {
    // this.getdeptName();
  },
  methods: {
    // 企业改变
    deptChange(val) {
      this.form.deptId = val;
    },
    // 提交
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.updatedisable = true;
          this.updateLoading = true;
          this.form.zhaopian = this.dialogImageUrl1;
          this.form.shenfenzhengfuyinjian = this.dialogImageUrl2;
          this.form.congyezhengfuyinjian = this.dialogImageUrl3;
          this.form.jiashizhengfuyinjian = this.dialogImageUrl4;
          this.form.fuyinjian = this.dialogImageUrl5;
          delete this.form.deptNames;
          delete this.form.deptName;
          delete this.form.xingbies;
          updatedriver(this.form).then((res) => {
            if (res.data.code == 200) {
              this.$message({
                type: "success",
                message: res.data.msg,
              });
              this.$parent.getDriverList();
              this.vehicleVisible = false;
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
    //照片 上传
    handlePictureCardPreview1(file) {
      this.dialogImageUrl1 = file.url;
      this.dialogVisible1 = true;
    },
    //照片 上传
    handlePictureCardPreview2(file) {
      this.dialogImageUrl2 = file.url;
      this.dialogVisible2 = true;
    },
    //照片 上传
    handlePictureCardPreview3(file) {
      this.dialogImageUrl3 = file.url;
      this.dialogVisible3 = true;
    },
    //照片 上传
    handlePictureCardPreview4(file) {
      this.dialogImageUrl4 = file.url;
      this.dialogVisible4 = true;
    },
    //照片 上传
    handlePictureCardPreview5(file) {
      this.dialogImageUrl5 = file.url;
      this.dialogVisible5 = true;
    },
    // 获取企业名称
    getdeptName() {
      getByIdDeptList(1, "").then((res) => {
        this.deptNameList = res.data.data.map((el) => {
          el.label = el.deptName;
          el.value = el.id;
          return el;
        });
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
