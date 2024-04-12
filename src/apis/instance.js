import axios from "axios";

// 自定义配置
// 新建一个 axios 实例
const instance = axios.create({
  timeout: 1000 * 60,
  // `withCredentials` 表示跨域请求时是否需要使用凭证
  withCredentials: true,
  // `validateStatus` 定义对于给定的HTTP 响应状态码是 resolve 或 reject  promise 。
  // 如果 `validateStatus` 返回 `true` (或者设置为 `null` 或 `undefined`)，promise 将被 resolve; 否则，promise 将被 rejecte
  validateStatus: (status) => status >= 200 && status < 600,
  baseURL: "https://api.trtst.com",
});

// 拦截器
// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  return config;
}, Promise.reject);

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 未登录，需要重新登录
  if (response.status == 301) console.log(301);
//   if (response.status !== 200) return Promise.reject(response.message)
  return response;
}, Promise.reject);

const request = (method) => (url, data, config) =>
  instance({ url, method, data, ...config });
  
const api = {
  get: request("get"),
  post: request("post"),
};

export default api;
