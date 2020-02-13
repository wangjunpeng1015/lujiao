import request from '@/utils/request'
import Qs from 'qs'
//手动转账到usdt
export function transfer(data) {
    return request({
        url: '/hb/dispatchUsdt',
        method: 'post',
        data: Qs.stringify(data)
    })
}
export function getOrdersList(data) {
    return request({
        url: '/order/list',
        method: 'post',
        data
    })
}
export function getSettlementList(data) {
    return request({
        url: '/settlement/list',
        method: 'post',
        data
    })
}
export function getSettlement(data) {
    return request({
        url: '/settlement',
        method: 'post',
        data
    })
}
//结算
export function goSettlement(data) {
    return request({
        url: '/settlement/save',
        method: 'post',
        data
    })
}
//代理、申请人确认结算
export function goAccept(id) {
    return request({
        url: `/settlement/isOK/${id}`,
        method: 'get',
    })
}
//代理拒绝结算
export function refuse(id) {
    return request({
        url: `/settlement/reject/${id}`,
        method: 'get',
    })
}
//删除结算记录
export function delRecord(id) {
    return request({
        url: `/settlement/${id}`,
        method: 'delete',
    })
}
export function delOrder(id) {
    return request({
        url: `/order/${id}`,
        method: 'delete',
    })
}
export function getMerchants() {
    return request({
        url: `/order`,
        method: 'get',
    })
}
export function changeStatus(id) {
    return request({
        url: `/pay/${id}`,
        method: 'get',
    })
}
export function supplement(data) {
    return request({
        url: `/order/replacementOrder`,
        method: 'post',
        data: Qs.stringify(data)
    })
}
export function settleCreate(data) {
    return request({
        url: `/settlement/create`,
        method: 'post',
        data
    })
}
//创建正式订单
export function createOrder(data) {
    return request({
        url: `/order/optimalPay`,
        method: 'post',
        data: Qs.stringify(data)
    })
}
//创建测试订单
export function createTestOrder(data) {
    return request({
        url: `/pcAccountTestOrder`,
        method: 'post',
        data: Qs.stringify(data)
    })
}
