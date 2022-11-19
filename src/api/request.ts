import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

const request: AxiosInstance = axios.create({
  baseURL: "https://3yya.com/u/d8cf630cf5f367cc/rest/app",
  timeout: 60000,
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
});

//Response Interceptors
// request.interceptors.response.use((res:AxiosResponse)=>{
//     return res.data
// })

request.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

export default request;
