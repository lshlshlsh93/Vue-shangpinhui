import axios from 'axios'

//引入进度条
import nProgress from 'nprogress'
// 引入进度条样式
import 'nprogress/nprogress.css'

/**
 * 利用axios的对象方法create,去创建一个axios实例
 */
const req = axios.create({
  baseURL: '/api', //基础路径
  timeout: 5000, //超时时间5s
  // headers: 'headers',
})

/**
 * 请求拦截器
 * config 配置对象里边有一个配置属性很重要：headers请求头
 */
req.interceptors.request.use((config) => {
  // 开启进度条
  nProgress.start()
  return config
})

/**
 * 响应拦截器
 */
req.interceptors.response.use(
  /**
   *
   * @param {响应成功的回调函数} res
   * @returns
   */
  (res) => {
    // 关闭进度条
    nProgress.done()
    return res.data
  },
  /**
   *
   * @param {响应失败的回调函数} error
   * @returns
   */
  () => {
    return new Promise.reject(new Error('error'))
  }
)
export default req
