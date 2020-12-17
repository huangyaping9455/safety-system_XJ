const path = require("path");
const resolve = (dir) => path.join(__dirname, dir);
// const baseUrl = 'http://www.xjhslc.cn:8200';
// const baseUrl = 'http://wujing.vipgz1.idcfengye.com';
// const baseUrl = 'http://localhost:8200';

module.exports = {
  productionSourceMap: false,
  transpileDependencies: ["vue-echarts", "resize-detector"],
  chainWebpack: (config) => {
    config.resolve.alias
      .set("@", resolve("src"))
      .set("A", resolve("src/assets"))
      .set("C", resolve("src/components"))
      .set("U", resolve("src/utils"))
      .set("V", resolve("src/views"))
      .set("S", resolve("src/style"));
  },
  devServer: {
    proxy: {
      "/api": {
        // target: "http://36.133.42.216:8200",//http://60.171.241.126:8200  http://127.0.0.1:8200
        target: "http://222.82.236.242:8896",
        ws: true,
        pathRewrite: {
          "^/api": "/",
        },
      },
      "/baidu": {
        target: "http://api.map.baidu.com/",
        ws: true,
        pathRewrite: {
          "^/baidu": "/",
        },
      },
    },
  },
};
