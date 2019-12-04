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
export function delOrder(id) {
    return request({
        url: `/order/${id}`,
        method: 'delete',
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
