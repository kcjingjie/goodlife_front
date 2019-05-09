import { axios } from '@/utils/request'
import QS from 'qs'

const api = {
  user: '/user/userList'
}

export default api

export function getUserList (parameter) {
  return axios({
    url: api.user,
    method: 'post',
    data: QS.stringify(parameter)
  })
}
