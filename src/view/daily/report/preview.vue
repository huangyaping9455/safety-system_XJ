<template>
  <div class="preview">
    <div class="preview_body">
      <!-- <div class="preview_head"> -->
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
          ><img src="~A/daily/fanhui.png" alt="" /> 返回</span
        >
        <span @click="downLoad"
          ><img src="~A/daily/xiazai.png" alt="" />下载</span
        >
        <span @click="print"><img src="~A/daily/dayin.png" alt="" />打印</span>
      </div>
      <!-- </div> -->
      <div class="preview-main">
        <div class="preview-img">
          <!--startprint-->
          <el-carousel
            :interval="4000"
            type="card"
            :loop="false"
            arrow="always"
            height="100%"
            @change="change"
            style="height:calc(100%);"
          >
            <el-carousel-item v-for="(item, index) in imgList" :key="index">
              <viewer :images="imgList" :Options="Options">
                <img
                  :src="item"
                  alt=""
                  :data-source="item"
                  class="preview-print"
                />
              </viewer>
            </el-carousel-item>
          </el-carousel>
          <!--endprint-->
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
      Options: {
        inline: true, // 启用 inline 模式
        button: true, // 显示右上角关闭按钮
        navbar: false, // 显示缩略图导航
        title: false, // 显示当前图片的标题
        toolbar: false, // 显示工具栏
        tooltip: true, // 显示缩放百分比
        movable: true, // 图片是否可移动
        zoomable: true, // 图片是否可缩放
        rotatable: false, // 图片是否可旋转
        scalable: false, // 图片是否可翻转
        transition: true, // 使用 CSS3 过度
        fullscreen: false, // 播放时是否全屏
        keyboard: false, // 是否支持键盘
        url: "data-source", // 设置大图片的 url
      },
    };
  },
  mounted() {
    this.getPreviewImg();
  },
  methods: {
    change(item, index) {},
    // 图片点击
    // imgClick(index) {
    // },
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
      this.$router.push({
        path: "/daily/report",
        query: { tab: this.$route.query.tab },
      });
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
          // "http://222.82.236.242:8894/" + res.data.data.path;
          // "http://61.136.101.78:8894/" + res.data.data.path;
          "http://58.144.142.198:8894/" + res.data.data.path;
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
      let printclass = document.getElementsByClassName("preview-print");
      let newWindow = window.open("", "_blank");
      for (let i = 0; i < printclass.length; i++) {
        let printConent = printclass[i].parentNode.cloneNode(true);
        newWindow.document.querySelector("body").appendChild(printConent);
      }
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
  height: calc(100% - 98px);
  background-color: #f2f9ff;
  .preview_body {
    height: 100%;
    width: 100%;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 0 10px rgb(119, 118, 118);
    position: relative;
    // .preview_head {
    // height: 2%;
    // width: 100%;
    // display: flex;
    // justify-content: space-between;
    // background-color: #97f9a1;
    .preview-head-top {
      position: absolute;
      left: 1.5rem;
      top: 1.5rem;
      z-index: 100;
      // padding: 1.5rem;
    }
    .preview-head-bottom {
      position: absolute;
      right: 1.5rem;
      top: 1.5rem;
      z-index: 100;
      // padding: 1.5rem;
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
          opacity: 1;
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
    // }
    .preview-main {
      height: 100%;
      width: 100%;
      padding: 0 1rem;
      .preview-img {
        width: 100%;
        height: 100%;
        overflow: auto;
        img {
          width: 100%;
          height: 100%;
          border: 1px solid gainsboro;
          box-shadow: 0 0 10px #9c9c9c;
        }
      }
    }
  }
}
</style>
<style>
.el-carousel__item img {
  color: #475669;
  font-size: 14px;
  opacity: 1;
  line-height: 200px;
  margin: 0;
}
.is-active {
  margin-top: 5px;
  /* transform: translateX(0) scale(1) !important; */
}
.el-carousel__item:nth-child(2n + 1) {
  background-color: white;
  box-shadow: 0 0 10px rgb(124, 111, 111);
}
.el-carousel__item:nth-child(2n) {
  background-color: white;
  box-shadow: 0 0 10px rgb(141, 135, 135);
}
.el-carousel__item--card {
  width: 34%;
  margin-left: 130px;
  display: flex;
  overflow: auto;
}
.el-carousel__container {
  height: calc(100% - 33px) !important;
}
.el-carousel__container button {
  background: #37a9f7;
  height: 50px;
  width: 50px;
}
.el-carousel__container button:hover {
  background: #86c7f3;
}
.viewer-canvas img {
  width: 661px !important;
  height: 935px !important;
  margin-left: 630px !important;
  margin-top: 1rem !important;
}
.viewer-navbar {
  display: none;
}
.viewer-footer {
  display: none;
}
.el-carousel__indicators--outside button {
  background-color: #37a9f7;
}
.el-carousel__button {
  height: 4px;
}
</style>
