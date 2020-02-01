import axios from './axios'
const api = {}
// 福袋首页
api.lucky = params => {
  return axios.post('/h5/lottery', params)
}
// 打开福袋
api.open = params => {
  return axios.post('/h5/lottery/open', params)
}
// code获得open_id
api.openId = code => {
  return axios.get(`/h5/public/get_open_id?code=${code}`)
}
// 充值页面信息
api.pageInfo = () => {
  return axios.get('/h5/public/recharge_page_info')
}
// user_id搜索昵称
api.getUserName = user_id => {
  return axios.get(`/h5/public/get_username?user_id=${user_id}`)
}
// 充值提交
api.rechargeSubmit = params => {
  return axios.post('/h5/public/recharge_submit', params)
}
export default api