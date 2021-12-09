import axios from 'axios'

/* 
专门请求mock接口的axios封装
*/
const req = axios.create({
  baseURL: '/mock', //基础路径
  timeout: 5000, //超时时间5s
})

req.interceptors.request.use((config) => {
  return config
})

req.interceptors.response.use(
  (res) => {
    return res.data
  },

  (error) => {
    return new Promise.reject(error)
  }
)
export default req
