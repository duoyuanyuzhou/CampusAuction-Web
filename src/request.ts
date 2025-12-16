import axios from "axios";
import { ElMessage } from "element-plus";
import router from "./router";
import { useUserStore } from "@/stores/user";
import { getActivePinia } from "pinia";

const request = axios.create({
  baseURL: "http://localhost:8080",
  timeout: 10000,
  withCredentials: true,
});

/**
 * 请求拦截器
 */
request.interceptors.request.use(
  (config) => {
    // ⚠️ 确保 pinia 已激活
    if (getActivePinia()) {
      const userStore = useUserStore();

      if (userStore.token) {
        config.headers["sa-token"] = userStore.token;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * 响应拦截器
 */
request.interceptors.response.use(
  (response) => {
    const res = response.data;

    // 🚨 业务异常统一处理
    if (res.code !== 200) {

      // 401 只在这里处理
      if (res.code === 555) {
        ElMessage.error(res.msg || "登录已失效，请重新登录");

        const userStore = useUserStore();
        userStore.clearUser();

        router.replace("/user/login");
      } else {
        ElMessage.error(res.msg || "操作失败");
      }

      return Promise.reject(res);
    }

    return res;
  },
  (error) => {
    // 🚨 网络 / HTTP 错误
    const status = error.response?.status;

    if (status === 401) {
      ElMessage.error("登录已失效，请重新登录");

      const userStore = useUserStore();
      userStore.clearUser();

      router.replace("/user/login");
    } else {
      ElMessage.error(error.message || "网络异常");
    }

    return Promise.reject(error);
  }
);

export default request;
