import axios from "axios";
import {
  Message
} from "view-design";
import router from "@/router";
import store from "@/store";
import {
  getToken
} from "@/util/auth";

axios.defaults.timeout = 30000;
// 返回其他状态吗
axios.defaults.validateStatus = function (status) {
  return status >= 200 && status <= 500; // 默认的
};
// 跨域请求，允许保存cookie
axios.defaults.withCredentials = true;

const globalParams = config => {
  const deptId = store.getters.deptId;
  const postId = store.getters.postId;
  for (const key in {
      deptId,
      postId
    }) {
    if (config.params && !config.params[key]) {
      config.params[key] = deptId;
    } else if (config.data && !config.data[key]) {
      config.data[key] = deptId;
    }
  }
  return config;
};

// HTTPrequest拦截
axios.interceptors.request.use(
  config => {
    const meta = config.meta || {};
    const isToken = meta.isToken === false;
    if (getToken() && !isToken) {
      config.headers["blade-auth"] = "Bearer " + getToken(); // 让每个请求携带token--['Authorization']为自定义key 请根据实际情况自行修改
    }
    return globalParams(config);
  },
  error => {
    return Promise.reject(error);
  }
);

// HTTPresponse拦截
axios.interceptors.response.use(
  res => {
    const status = res.data.code || 200;
    const message = res.data.msg || "未知错误";

    // 如果是401则跳转到登录页面
    if (status === 401) {
      router.push({
        path: "/login"
      });
    }

    // 如果请求为非200否者默认统一处理
    if (status !== 200) {
      Message.error({
        content: message,
        duration: 3
      });
      return Promise.reject(new Error(message));
    }
    return res;
  },
  error => {
    Message.error(error.message);
    return Promise.reject(new Error(error));
  }
);

export default axios;