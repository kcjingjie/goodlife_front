import Vue from 'vue'
import axios from 'axios'
import store from '@/store'
import { VueAxios } from './axios'
import notification from 'ant-design-vue/es/notification'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import router from '@/router'
import NProgress from 'nprogress'
// 创建 axios 实例
const service = axios.create({
  baseURL: 'http://localhost:10014/', // api base_url
  timeout: 6000 // 请求超时时间
})
service.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

const err = (error) => {
  if (error.response) {
    const data = error.response.data
    const token = Vue.ls.get(ACCESS_TOKEN)
    if (error.response.status === 403) {
      notification.error({ message: 'Forbidden', description: data.message })
      console.log('message,foridden')
    }
    if (error.response.status === 401) {
      console.log('message,foridden')
      notification.error({ message: 'Unauthorized', description: 'Authorization verification failed' })
      router.push({ name: 'login' })
      if (token) {
        store.dispatch('Logout').then(() => {
          setTimeout(() => {
            window.location.reload()
          }, 1500)
        })
      }
    }
  }
  return Promise.reject(error)
}

// request interceptor
service.interceptors.request.use(config => {
  const token = Vue.ls.get(ACCESS_TOKEN)
  if (token) {
    config.headers[ 'X-Auth-Token' ] = token // 让每个请求携带自定义 token 请根据实际情况自行修改
  }
  return config
}, err)

// response interceptor
service.interceptors.response.use((response) => {
  return response.data
}, err)

router.beforeEach((to, from, next) => {
  NProgress.start() // start progress bardebugger

  var token = Vue.ls.get(ACCESS_TOKEN)
  console.log(token)
  var token1 = store.token
  console.log(token1)
  if (Vue.ls.get(ACCESS_TOKEN)) {
    /* has token */
    if (to.path === '/user/login') {
      /*如果不直接next() 会进入死循环*/
      next()
      NProgress.done()
    } else {
      next()
    }
  } else {
    if (to.path === '/user/login') {
      next()
      NProgress.done()
    } else {
      next({ path: '/user/login' })
    }
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
const installer = {
  vm: {},
  install (Vue, router = {}) {
    Vue.use(VueAxios, router, service)
  }
}

export {
  installer as VueAxios,
  service as axios
}
