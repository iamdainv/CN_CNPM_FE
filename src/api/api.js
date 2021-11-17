import axios from 'axios'
import { envConfig } from '@/config'
import { objectToQueryString } from '@/helpers'
import request from '@/assets/response'
import Vue from 'vue'
const instance = axios.create({
  baseURL: envConfig.baseUrl,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Request interceptor for API calls
instance.interceptors.request.use(
  async config => {
    // eslint-disable-next-line semi

    // config.headers = {
    //   Accept: 'application/json',
    //   'Content-Type': 'application/x-www-form-urlencoded'
    // }
    if (Vue.$cookies.get('token')) {
      config.headers.Authorization = `Bearer ${Vue.$cookies.get('token')}`
    }

    return config
  },
  error => {
    Promise.reject(error)
  }
)

// Response interceptor for API calls
instance.interceptors.response.use(
  response => {
    return response
  },
  async function (error) {
    const originalRequest = error.config

    if (error?.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true
      // TODO refreshAccessToken when token exprie
      // const access_token = await refreshAccessToken();
      // axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;
      // return axiosApiInstance(originalRequest);
    }
    if (error?.response?.status === 401) {
      Vue.$router.push({ path: '/' })
    }
    return Promise.reject(error)
  }
)

class ApiService {
  makeRequest (method = 'GET', url = '', body = null, headers = {}) {
    console.log('body', body)
    return instance({
      url: url,
      method,
      headers: { ...instance.defaults.headers, ...headers },
      data: body
    })
  }

  get (url, params = {}, headers = {}) {
    const queryString = objectToQueryString(params)
    const urlParam = queryString ? `?${queryString}` : ''
    console.log('queryString', queryString)
    return this.makeRequest('GET', url + urlParam, null, headers)
  }

  post (url, body, headers = {}) {
    return this.makeRequest('POST', url, body, headers)
  }

  put (url, body = {}, headers = {}) {
    return this.makeRequest('PUT', url, body, headers)
  }

  delete (url, body = {}, headers = {}) {
    return this.makeRequest('DELETE', url, body, headers)
  }

  getMockResponse (url, timeout = 300) {
    return new Promise((resolve, reject) => {
      try {
        setTimeout(() => resolve(request[url]), timeout)
      } catch (error) {
        reject(error)
      }
    })
  }

  upload () {}
}

export const apiService = new ApiService()
