import axios from './axios'
const api = {}
// 首页
api.select = params => {
  return axios.post('http://shiwanjia.zzgcyun.com/ssm_admin/ncov2019/selectMsgByCondition', params)
}
// api.openId = code => {
//   return axios.get(`/h5/public/get_open_id?code=${code}`)
// }

export default api
