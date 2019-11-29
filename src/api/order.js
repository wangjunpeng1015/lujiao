import request from '@/utils/request'

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
