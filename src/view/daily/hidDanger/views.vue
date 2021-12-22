<template>
  <el-dialog title="隐患排查详情" :visible.sync="viewVisible" width="35%">
    <el-descriptions title="隐患情况" :column="2">
      <el-descriptions-item label="隐患等级">
        {{ detailList.dengji }}
      </el-descriptions-item>
      <el-descriptions-item label="等级说明">
        {{ detailList.troubleDjsm }}
      </el-descriptions-item>
      <el-descriptions-item label="隐患编号">
        {{ detailList.troubleBh }}
      </el-descriptions-item>
      <el-descriptions-item label="发现日期">
        {{ detailList.troubleFxsj }}
      </el-descriptions-item>
      <el-descriptions-item label="隐患名称">
        {{ detailList.troubleMc }}
      </el-descriptions-item>
      <el-descriptions-item label="发现人">
        {{ detailList.troubleFxr }}
      </el-descriptions-item>
      <el-descriptions-item label="隐患来源">
        {{ detailList.troubleLy }}
      </el-descriptions-item>
      <el-descriptions-item label="责任人">
        {{ detailList.troubleZrr }}
      </el-descriptions-item>
    </el-descriptions>
    <!-- ----------------- -->
    <el-descriptions title="整改情况" :column="1">
      <el-descriptions-item label="限期整改时间">
        {{ detailList.troubleXqzgsj }}
      </el-descriptions-item>
      <el-descriptions-item label="整改完成日期">
        {{ detailList.troubleZgwcrq }}
      </el-descriptions-item>
      <el-descriptions-item label="整改进度">
        {{ detailList.troubleZgjd }}
      </el-descriptions-item>
      <el-descriptions-item label="隐患描述">
        {{ detailList.troubleYhms }}
      </el-descriptions-item>
      <el-descriptions-item label="整改措施">
        {{ detailList.troubleZgcs }}
      </el-descriptions-item>
      <el-descriptions-item label="惩罚情况">
        {{ detailList.troubleCfqk }}
      </el-descriptions-item>
      <el-descriptions-item label="附件"> </el-descriptions-item>
    </el-descriptions>
  </el-dialog>
</template>

<script>
import { troubledetail } from "@/api/daily/trouble";
export default {
  data() {
    return {
      viewVisible: false,
      detailList: {},
    };
  },
  methods: {
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
          this.detailList = res.data.data;
        } else {
          this.$message.error("查询详情失败");
        }
      });
    },
  },
};
</script>

<style></style>
