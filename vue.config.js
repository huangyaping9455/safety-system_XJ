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
        // target: "http://222.82.236.242:8896",
        // target: "http://61.136.101.78:8896",
        target: "http://58.144.142.198:8896",
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
      "/prod-api": {
        // target: "http://222.82.236.242:28089",
        target: "http://58.144.142.198:28089",
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          "^/prod-api": "/prod-api",
        },
      }
    },
  },
};