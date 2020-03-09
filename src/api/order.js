import request from '@/utils/request'
import axios from 'axios'
import Qs from 'qs'
//手动转账到usdt
export function transfer(data) {
    return request({
        url: 'backend/hb/dispatchUsdt',
        method: 'post',
        data: Qs.stringify(data)
    })
}
export function getOrdersList(data) {
    return request({
        url: 'backend/order/list',
        method: 'post',
        data
    })
}
export function getSettlementList(data) {
    return request({
        url: 'backend/settlement/list',
        method: 'post',
        data
    })
}
export function getSettlement(data) {
    return request({
        url: 'backend/settlement',
        method: 'post',
        data
    })
}
//结算
export function goSettlement(data) {
    return request({
        url: 'backend/settlement/save',
        method: 'post',
        data
    })
}
//代理、申请人确认结算
export function goAccept(id) {
    return request({
        url: `backend/settlement/isOK/${id}`,
        method: 'get',
    })
}
//代理拒绝结算
export function refuse(id) {
    return request({
        url: `backend/settlement/reject/${id}`,
        method: 'get',
    })
}
//删除结算记录
export function delRecord(id) {
    return request({
        url: `backend/settlement/${id}`,
        method: 'delete',
    })
}
export function delOrder(id) {
    return request({
        url: `backend/order/${id}`,
        method: 'delete',
    })
}
export function getMerchants() {
    return request({
        url: `backend/order`,
        method: 'get',
    })
}
export function changeStatus(id) {
    return request({
        url: `backend/pay/${id}`,
        method: 'get',
    })
}
export function supplement(data) {
    return request({
        url: `backend/order/replacementOrder`,
        method: 'post',
        data: Qs.stringify(data)
    })
}
export function settleCreate(data) {
    return request({
        url: `backend/settlement/create`,
        method: 'post',
        data
    })
}
//创建正式订单
export function createOrder(data) {
    return request({
        url: `backend/order/optimalPay`,
        method: 'post',
        data: Qs.stringify(data)
    })
}
// node下单
export function nodeCreateOrder(data) {
  return request({
      url: 'alipay_web/add_order',
      method: 'post',
      data
  })
}
//创建测试订单
export function createTestOrder(data) {
    return request({
        url: `backend/pcAccountTestOrder`,
        method: 'post',
        data: Qs.stringify(data)
    })
}
//钱方H5通道模拟登陆
export function getQfCookie({ username, password, udid }) {
    return axios({
        headers: {
            "User-Agent": "NearMerchant/042100(iPhone;iOS13.3;Scale/3.00;Language/zh-CN)",
            "Host": "o.qfpay.com",
            "Connection": "keep-alive",
            "Accept-Language": "zh-Hans-CN;q=1, en-CN;q=0.9",
            "Content-Length": 97,
            "Access-Control-Allow-Origin": '*',
            "Accept-Encoding": "gzip, deflate, br"
        },
        method: 'post',
        url: 'https://o.qfpay.com/mchnt/user/login',
        data: Qs.stringify({
            "expire_time": 864000,
            "username": username || "15232443958",
            "password": password || "010216",
            "udid": udid || '7CD39D5C-482B-4DF6-8724-3B8B61FB2D1F',
        })
    })
}
//钱方H5给后端cookie
export function setQfCookie(data) {
    return request({
        url: `backend/pcAccountTestOrder`,
        method: 'post',
        data: Qs.stringify(data)
    })
}
