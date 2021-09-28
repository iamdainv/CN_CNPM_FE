import axios from 'axios'
import store from '@/store'
import notification from 'ant-design-vue/lib/notification'
import router from '@/router'
import _merge from 'lodash/merge'
const API_SUCCESS_CODES = ['API000']

export async function executor (sys, url, parameter, method = 'get', requestConfigs = {}) {
  const baseUrl = process.env.VUE_APP_API_ADMIN_URL
  const request = axios.create({
    baseURL: baseUrl,
    timeout: -1
  })
  const errorHandler = (error) => {
    if (error.response) {
      const data = error.response.data
      const token = store.getters.token
      if (data !== undefined) {
        if (data.code === '403') {
          notification.error({
            message: 'Forbidden',
            description: data.message
          })
        }
        if (data.code === '401') {
          notification.error({
            message: 'Unauthorized',
            description: 'Authorization verification failed'
          })
          if (token) {
            store.dispatch('Logout').then(() => {
              setTimeout(() => {
                router.push({ name: 'loginAdmin' })
              }, 1500)
            })
          }
        }
      }
    }
    return Promise.reject(error)
  }
  const apiError = (message, response) => {
    const err = new Error(message)
    err.response = response
    return err
  }
  request.interceptors.request.use(config => {
    const token = store.getters.token
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token
    }
    return _merge(config, requestConfigs)
  }, errorHandler)

  request.interceptors.response.use((response) => {
    const data = response.data
    if (API_SUCCESS_CODES.indexOf(data.code) !== -1) {
      return data
    } else { // Return lỗi khi api trả về lỗi
      if (['API004', '401', 401].indexOf(data.code) !== -1) { // Lỗi 401
        const token = store.getters.token
        if (token) {
          store.dispatch('Logout').then(() => {
            setTimeout(() => {
              router.push({ name: 'loginAdmin' })
            }, 1500)
          })
        }
      }
      const error = apiError(data.message, response)
      return Promise.reject(error)
    }
  }, errorHandler)
  return request({
    url: url,
    method: method,
    [method.toUpperCase() === 'POST' ? 'data' : 'params']: parameter
  })
}
