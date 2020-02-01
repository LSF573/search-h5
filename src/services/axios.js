/**
 * axios封装
 * 请求拦截、响应拦截、错误统一处理
 */
import qs from 'qs'
import axios from 'axios'

/**
 * 请求失败后的错误统一处理
 * @param {Number} status 请求失败的状态码
 */
const errorHandle = (status, other) => {
  // 状态码判断
  switch (status) {
    case 400:
      // eslint-disable-next-line no-undef
      $toast.show(other.status)
      break
    // 404请求不存在
    case 404:
      // eslint-disable-next-line no-undef
      $toast.show('请求的资源不存在')
      break
    case 500:
      // eslint-disable-next-line no-undef
      $toast.show(other.status)
      break
    default:
      // eslint-disable-next-line no-undef
      $toast.show('服务器报错，请稍后再试！')
  }
}

// 创建axios实例
var instance = axios.create({
  baseURL: '/',
  timeout: 1000 * 12
})
// 设置post请求头
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

/**
 * 请求拦截器
 * 每次请求前，如果存在token则在请求头中携带token
 */
// instance.interceptors.request.use(
// config => {
//   登录流程控制中，根据本地是否存在token判断用户的登录情况
//   但是即使token存在，也有可能token是过期的，所以在每次的请求头中携带token
//   后台根据携带的token判断用户的登录情况，并返回给我们对应的状态码
//   而后我们可以在响应拦截器中，根据状态码进行一些统一的操作。
//   const token = store.state.token;
//   token && (config.headers.Authorization = token)
//   return config
// },
// error => Promise.error(error))

instance.interceptors.request.use(
  config => {
    !config.headers['Content-Type']
      ? (config.headers['Content-Type'] = 'application/x-www-form-urlencoded')
      : void 666
    if (
      config.method.toLowerCase() === 'post' &&
      config.data &&
      config.headers['Content-Type'] === 'application/x-www-form-urlencoded'
    ) {
      config.data = qs.stringify(config.data)
    }
    return config
  },
  error => {
    Promise.reject(error)
  }
)

// 响应拦截器
instance.interceptors.response.use(
  // 请求成功
  res => res.status === 200 ? Promise.resolve(res) : Promise.reject(res),
  // 请求失败
  error => {
    const { response } = error
    if (response) {
      // 请求已发出，但是不在2xx的范围
      errorHandle(response.status, response.data)
      return Promise.reject(response)
    } else {
      // 处理断网的情况
      // eg:请求超时或断网时，更新state的network状态
      // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
      // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
      if (!window.navigator.onLine) {
        //  store.commit('changeNetwork', false);
      } else {
        return Promise.reject(error)
      }
    }
  })

export default instance
