import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8101/api",
  timeout: 100000,
});
// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    const res = response.data;
    if (res.code === 0) {
      return res.data;
    }
    console.log("请求出错：", res);
    return response.data;
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);
export default instance;
