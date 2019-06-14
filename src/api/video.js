import { axios } from '@/utils/request'

const api = {
  chartData: '/video/chartData',
  watchCount: '/video/getVideoWatchCount',
  hotVideos: '/video/getHotVideos',
  getVideoById: '/video/getVideoById',
  getVideosByUserId:'/video/getVideosByUserId'
}

export default api

export function getVideoChartData () {
  return axios({
    url: api.chartData,
    method: 'get'
  })
}

export function getVideoWatchCount () {
  return axios({
    url: api.watchCount,
    method: 'get'
  })
}

export function getHotVideos () {
  return axios({
    url: api.hotVideos,
    method: 'get'
  })
}

export function getVideoById (parameter) {
  return axios({
    url: api.getVideoById,
    method: 'post',
    params: parameter
  })
}

export function getVideosByUserId(parameter) {
  return axios({
    url:api.getVideosByUserId,
    method: 'post',
    params:parameter
  })
}