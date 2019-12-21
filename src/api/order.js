import request from '@/utils/request'
import Qs from 'qs'
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
//创建订单
export function createOrder(data) {
    return request({
        url: `/order/optimalPay`,
        method: 'post',
        data: Qs.stringify(data)
    })
}
