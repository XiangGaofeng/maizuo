// 1- 对于数据请求的封装
// import axios from 'axios'
// function httpForList () {
//   return axios({
//     url:
//           'https://m.maizuo.com/gateway?cityId=440100&pageNum=1&pageSize=10&type=1&k=5196770',
//     headers: {
//       'X-Client-Info':
//             '{"a":"3000","ch":"1002","v":"5.0.4","e":"1606697250632532718583809","bc":"440100"}',
//       'X-Host': 'mall.film-ticket.film.list'
//     }
//   })
// }
// function httpForDetail (params) {
//   return axios({
//     url: `https://m.maizuo.com/gateway?filmId=${params}&k=5501344`,
//     headers: {
//       'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"1606697250632532718583809","bc":"440100"}',
//       'X-Host': 'mall.film-ticket.film.info'
//     }
//   })
// }

// export default {
//   httpForDetail,
//   httpForList
// }
// 2- 对于数据请求的封装
import axios from 'axios'
import Vue from 'vue'
import { Toast } from 'vant'
const http = axios.create({
  baseURL: 'https://m.maizuo.com',
  timeout: 8000,
  headers: {
    'X-Client-Info':
    '{"a":"3000","ch":"1002","v":"5.0.4","e":"1606697250632532718583809","bc":"440100"}'
  }
})

// 在发请求之前拦截 -- showLoading
// Add a request interceptor
http.interceptors.request.use(function (config) {
  // Do something before request is sent
  Toast.loading({
    message: '加载中...',
    forbidClick: true
  })

  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

// 在成功后拦截 -- hideLoading
// Add a response interceptor
http.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  Toast.clear()
  return response
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
//  Toast.clear()
  return Promise.reject(error)
})

export default http
