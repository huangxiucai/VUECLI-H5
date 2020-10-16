import axios from 'axios'

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
// 创建axios实例
const service = axios.create({
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  baseURL: '',
  // 超时
  timeout: 10000
})
// request拦截器
service.interceptors.request.use(config => {
  // 是否需要设置 token
 // config.headers['Authorization'] = 'Bearer ' +  // 让每个请求携带自定义token 请根据实际情况自行修改
  return config
}, error => {
    console.log(error)
    Promise.reject(error)
})

// 响应拦截器
service.interceptors.response.use(res => {
    // 未设置状态码则默认成功状态
    const code = res.data.code || 200;
    // 获取错误信息
    const msg = errorCode[code] || res.data.msg || errorCode['default']
    if (code === 401) {
        Toast.fail('登录状态已过期')
    } else if (code === 500) {
      Toast.fail(msg)
      return Promise.reject(new Error(msg))
    } else if (code !== 200) {
    Toast.fail(msg)
      return Promise.reject('error')
    } else {
      return res.data
    }
  },
  error => {
    console.log('err' + error)
    let { message } = error;
    if (message == "Network Error") {
      message = "后端接口连接异常";
    }
    else if (message.includes("timeout")) {
      message = "系统接口请求超时";
    }
    else if (message.includes("Request failed with status code")) {
      message = "系统接口" + message.substr(message.length - 3) + "异常";
    }
    Toast.fail(message)
    return Promise.reject(error)
  }
)

export default service
