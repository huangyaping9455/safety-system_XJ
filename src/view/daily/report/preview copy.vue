<template>
  <div class="preview">
    <div class="preview_body">
      <div class="preview_head">
        <div class="preview-head-top">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item>日常工作</el-breadcrumb-item>
            <el-breadcrumb-item
              :to="{ path: '/daily/report' }"
              style="cursor: pointer;"
              >安全报告</el-breadcrumb-item
            >
            <el-breadcrumb-item>报文预览</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="preview-head-bottom">
          <span @click="backTo"
            ><img src="~A/daily/返回.png" alt="" /> 返回</span
          >
          <span @click="downLoad"
            ><img src="~A/daily/下载.png" alt="" />下载</span
          >
          <span @click="print"><img src="~A/daily/打印.png" alt="" />打印</span>
        </div>
      </div>
      <div class="preview-main">
        <div class="preview-img">
          <img
            @mouseenter="onMouseenter(index)"
            @mouseout="onMouseout(index)"
            class="imgshow"
            v-for="(item, index) in imgList"
            :key="index"
            :src="item"
            alt=""
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getPreview } from "@/api/daily/report";
export default {
  data() {
    return {
      imgList: [{}],
      fileName: "",
    };
  },
  mounted() {
    this.getPreviewImg();
  },
  methods: {
    // 图片点击
    // imgClick(index) {
    //   let imgs = document.getElementsByClassName("imgshow");
    //   if (index === 5) {
    //     imgs[index].style.zIndex = index + 1;
    //   } else if (index === 4) {
    //     imgs[index].style.zIndex = index + 2;
    //   } else if (index === 3) {
    //     imgs[index].style.zIndex = index + 3;
    //   } else if (index === 2) {
    //     imgs[index].style.zIndex = index + 4;
    //   } else if (index === 1) {
    //     imgs[index].style.zIndex = index + 5;
    //   } else {
    //     imgs[index].style.zIndex = index + 6;
    //   }
    // },
    // 鼠标移入图片
    onMouseenter(index) {
      let imgs = document.getElementsByClassName("imgshow");
      imgs[index].style.zIndex = 11;
    },
    // 鼠标移出图片
    onMouseout(index) {
      let imgs = document.getElementsByClassName("imgshow");
      if (index === 9) {
        imgs[index].style.zIndex = 1;
      } else if (index === 8) {
        imgs[index].style.zIndex = 2;
      } else if (index === 7) {
        imgs[index].style.zIndex = 3;
      } else if (index === 6) {
        imgs[index].style.zIndex = 4;
      } else if (index === 5) {
        imgs[index].style.zIndex = 5;
      } else if (index === 4) {
        imgs[index].style.zIndex = 6;
      } else if (index === 3) {
        imgs[index].style.zIndex = 7;
      } else if (index === 2) {
        imgs[index].style.zIndex = 8;
      } else if (index === 1) {
        imgs[index].style.zIndex = 9;
      } else {
        imgs[index].style.zIndex = 10;
      }
    },
    // 获取图片
    getPreviewImg() {
      let data = {
        fileType: 2,
        id: this.$route.query.id,
      };
      getPreview(data).then((res) => {
        this.imgList = res.data.data.imgList;
        this.fileName = res.data.data.fileName;
      });
    },
    //  返回
    backTo() {
      this.$router.push({ path: "/daily/report" });
    },
    // 下载
    downLoad() {
      let data = {
        fileType: 4,
        id: this.$route.query.id,
      };
      getPreview(data).then((res) => {
        if (!res.data.data.path) {
          this.$message.warning("暂不支持下载");
          return;
        }
        window.location.href =
          "http://222.82.236.242:8894/" + res.data.data.path;
      });
    },
    // 打印
    print() {
      if (this.imgList.length == 0) {
        this.$message.info({
          content: "无文件可打印！",
          duration: 3,
        });
        return;
      }
      let printConent = document.querySelector(".preview-img").cloneNode(true);
      let newWindow = window.open("", "_blank");
      newWindow.document.querySelector("body").appendChild(printConent);
      newWindow.document.title = `文件打印-${this.fileName}`;
      this.$nextTick(() => {
        newWindow.print();
        newWindow.close();
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.preview {
  margin: 0;
  padding: 1.5rem;
  width: 100%;
  height: calc(100% - 60px);
  background-color: #f2f9ff;
  .preview_body {
    height: 100%;
    width: 100%;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 0 10px rgb(119, 118, 118);
    .preview_head {
      height: 12%;
      width: 100%;
      // background-color: #97f9a1;
      .preview-head-top {
        padding: 1.5rem;
      }
      .preview-head-bottom {
        padding: 0.2rem 1.5rem;
        span {
          margin-right: 1.5rem;
          padding: 0.6rem 1.5rem;
          color: white;
          font-size: 15px;
          background: #37a9f7;
          cursor: pointer;
          img {
            height: 17px;
            width: 16px;
            margin-bottom: 4px;
            margin-right: 1.2rem;
          }
        }
        span:first-child {
          background: white;
          color: #37a9f7;
          border: 1px solid #37a9f7;
        }
      }
    }
    .preview-main {
      height: 88%;
      width: 100%;
      padding: 1.5rem;
      // background: #f9f397;
      .preview-img {
        width: 100%;
        height: 100%;
        padding: 1.3rem 1rem;
        overflow: hidden;
        position: relative;
        overflow: auto;
        img {
          width: 28%;
          height: auto;
          box-shadow: 0 0 10px #9c9c9c;
          position: absolute;
        }
        img:nth-child(1) {
          margin-left: 0;
          z-index: 10;
          pointer-events: none;
        }
        img:nth-child(2) {
          margin-left: 14%;
          z-index: 9;
          margin-top: -1px;
        }
        img:nth-child(3) {
          margin-left: 28%;
          z-index: 8;
          margin-top: -2px;
        }
        img:nth-child(4) {
          margin-left: 42%;
          z-index: 7;
          margin-top: -4px;
        }
        img:nth-child(5) {
          margin-left: 56%;
          z-index: 6;
          margin-top: -6px;
        }
        img:nth-child(6) {
          margin-left: 70%;
          z-index: 5;
          margin-top: -8px;
        }
        img:nth-child(7) {
          margin-left: 84%;
          z-index: 4;
          margin-top: -10px;
        }
        img:nth-child(8) {
          margin-left: 98%;
          z-index: 3;
          margin-top: -12px;
        }
        img:nth-child(9) {
          margin-left: 112%;
          z-index: 2;
          margin-top: -14px;
        }
        img:nth-child(10) {
          margin-left: 126%;
          z-index: 1;
          margin-top: -14px;
        }
      }
    }
  }
}
</style>
