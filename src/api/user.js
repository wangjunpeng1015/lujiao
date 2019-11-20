import request from '@/utils/request'
import Qs from 'qs'
//登录
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
//用户登录记录
export function getloginLog() {
  return request({
    url: '/loginlog/list',
    method: 'get',
  })
}
//用户信息
export function getInfo(token) {
  return request({
    url: '/base/user/getCurrentUser',
    method: 'get',
  })
}
//退出
export function logout() {
  return request({
    url: '/logout',
    method: 'post'
  })
}
