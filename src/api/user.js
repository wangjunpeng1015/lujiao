import request from '@/utils/request'
import Qs from 'qs'
export function login(data) {
  return request({
    url: '/login',
    method: 'post',
    data: Qs.stringify(data)
  })
}
//注册
export function register(data) {
  return request({
    url: '/base/user',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/base/user/getCurrentUser',
    method: 'get',
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
