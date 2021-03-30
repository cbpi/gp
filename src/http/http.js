/*
 * @Author: your name
 * @Date: 2021-02-23 15:28:48
 * @LastEditTime: 2021-02-23 15:38:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-mongodb-test\http\http.js
 */
import axios from 'axios'

// create an axios instance
const service = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 90000 // request timeout
})

axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'

// request interceptor
service.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  (response) => {
    let res = null
    if (response.data.type === 'application/octet-stream') {
      res = response
    } else {
      res = response.data
    }
    if (res.code == 401) {
      localStorage.clear()
      window.location.href = '/'
    }
    return res
  },
  (error) => {
    console.log('err' + error) // for debug
    return Promise.reject(error)
  }
)

export default service
