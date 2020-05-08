import axios from 'axios';

export const baseUrl = "http://localhost:3003";;

// 实例拦截器
const axiosInstance = axios.create({
  baseURL: baseUrl
});

axiosInstance.interceptors.response.use(
  res => res.data,
  err => {
    console.log('网络错误', err);
  }
);
export {
  axiosInstance
}

