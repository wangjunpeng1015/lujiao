import request from '@/utils/request'

export function getOrdersList(data) {
    return request({
        url: '/order/list',
        method: 'post',
        data
    })
}
