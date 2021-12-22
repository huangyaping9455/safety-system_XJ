<template>
  <el-dialog title="隐患排查整改" :visible.sync="updateVisible" width="35%">
    <el-divider>隐患情况</el-divider>
    <el-descriptions title="" :column="2">
      <el-descriptions-item label="隐患等级">
        {{ updateList.dengji }}
      </el-descriptions-item>
      <el-descriptions-item label="等级说明">
        {{ updateList.troubleDjsm }}
      </el-descriptions-item>
      <el-descriptions-item label="隐患编号">
        {{ updateList.troubleBh }}
      </el-descriptions-item>
      <el-descriptions-item label="发现日期">
        {{ updateList.troubleFxsj }}
      </el-descriptions-item>
      <el-descriptions-item label="隐患名称">
        {{ updateList.troubleMc }}
      </el-descriptions-item>
      <el-descriptions-item label="发现人">
        {{ updateList.troubleFxr }}
      </el-descriptions-item>
      <el-descriptions-item label="隐患来源">
        {{ updateList.troubleLy }}
      </el-descriptions-item>
      <el-descriptions-item label="责任人">
        {{ updateList.troubleZrr }}
      </el-descriptions-item>
    </el-descriptions>
    <!-- ----------------- -->
    <el-divider>整改情况</el-divider>
    <el-form ref="uform" :model="updateList" label-width="auto">
      <el-form-item label="隐患描述">
        <el-input
          type="textarea"
          v-model="updateList.troubleYhms"
          placeholder="请输入隐患描述"
        ></el-input>
      </el-form-item>
      <el-form-item label="整改进度">
        <el-radio-group v-model="updateList.troubleZgjd">
          <el-radio label="1">待整改</el-radio>
          <el-radio label="2">整改中</el-radio>
          <el-radio label="3">整改完成</el-radio>
          <el-radio label="4">整改延期</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="整改措施">
        <el-input
          type="textarea"
          v-model="updateList.troubleZgcs"
          placeholder="请输入整改措施"
        ></el-input>
      </el-form-item>
      <el-form-item label="惩罚情况">
        <el-input
          type="textarea"
          v-model="updateList.troubleCfqk"
          placeholder="请输入惩罚情况"
        ></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="updateVisible = false">取 消</el-button>
      <el-button type="primary" @click="zhenggai">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { troubledetail, zhenggai, fucha } from "@/api/daily/trouble";
export default {
  data() {
    return {
      updateVisible: false,
      updateList: {},
    };
  },
  methods: {
    //   数据回显
    troubledetail(id) {
      troubledetail(id).then((res) => {
        if (res.data.code === 200) {
          if (res.data.data.troubleDj == 1) {
            res.data.data.dengji = "一级";
          } else if (res.data.data.troubleDj == 2) {
            res.data.data.dengji = "二级";
          } else if (res.data.data.troubleDj == 3) {
            res.data.data.dengji = "三级";
          } else {
            res.data.data.dengji = "四级";
          }
          this.updateList = res.data.data;
        } else {
          this.$message.error("查询详情失败");
        }
      });
    },
    zhenggai() {
      let isApi;
      if (
        this.updateList.troubleMc === "抽检未达标" &&
        this.updateList.troubleZgjd == 3
      ) {
        isApi = fucha;
      } else {
        isApi = zhenggai;
      }
      isApi(this.updateList).then((res) => {
        if (res.data.code === 200) {
          this.updateVisible = false;
          this.$parent.getTroubleList();
        } else {
          this.$message.error("新增失败");
        }
      });
    },
  },
};
</script>
<style lang="scss">
.el-dialog {
  .el-dialog__body {
    padding: 0 20px 20px 20px !important;
  }
}
</style>
