import { axios } from '@/utils/request'
import QS from 'qs'

const api = {
  user: '/user/userList',
  userSearch: '/user/userSearch',
  userById:'/user/getUserById',
  updateUser:'/user/updateUserState'
}

export default api

export function getUserList (parameter) {
  return axios({
    url: api.user,
    method: 'post',
    data: QS.stringify(parameter)
  })
}
export function getUsersByParam (parameter) {
  return axios({
    url: api.userSearch,
    method: 'post',
    data: QS.stringify(parameter)
  })
}
export function getUserInfoById(parameter) {
  return axios({
    url: api.userById,
    method: 'post',
    params: parameter
  })
}
export function updateUser(parameter) {
  return axios({
    url:api.updateUser,
    method:'post',
    params: parameter
  })
}