import { axios } from '@/utils/request'

const api = {
  user: '/video/chartData'
}

export default api

export function getVideoChartData (parameter) {
  return axios({
    url: api.user,
    method: 'get',
    params: parameter
  })
}
