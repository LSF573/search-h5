import axios from './axios'
const api = {}
// 首页
api.select = params => {
  return axios.post('/selectMsgByCondition', params)
}
// code获得open_id
// api.openId = code => {
//   return axios.get(`/h5/public/get_open_id?code=${code}`)
// }

export default api
