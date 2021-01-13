// 配置编译环境和线上环境之间的切换

let baseUrl = "";
const env = process.env;

if (env.NODE_ENV == "development") { // 开发环境地址
  baseUrl = "http://222.82.236.242:8896";
} else if (env.NODE_ENV == "production") {
  baseUrl = "http://202.100.168.150:8896"; // 生产环境地址
} else if (env.NODE_ENV == "test") {
  baseUrl = ""; // 测试环境地址
}

export {
  baseUrl,
  env
};