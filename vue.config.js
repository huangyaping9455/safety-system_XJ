const path = require("path");
const resolve = (dir) => path.join(__dirname, dir);

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
        target: "http://222.82.236.242:8896",
        // target: "http://373637f18i.wicp.vip",
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