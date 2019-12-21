import request from '@/utils/request'
import Qs from 'qs'
//获取列表
export const getMerchants = (data) => {
    return request({
        url: '/home/userPage',
        method: 'post',
        data
    })
}
//修改利率
export const changeRate = (data) => {
    return request({
        url: '/merchantCR/renewalRate',
        method: 'post',
        data: Qs.stringify(data)
    })
}
//修改回调url
export const changeUrl = (data) => {
    return request({
        url: '/merchantSign',
        method: 'post',
        data: Qs.stringify(data)
    })
}
//关闭通道
export const shutdownChannel = (id) => {
    return request({
        url: `/merchantCR/shutdownChannel/${id}`,
        method: 'get',
    })
}
//商户通道利率
export const getMerchantChannel = (data) => {
    return request({
        url: '/merchantCR/pageList',
        method: 'post',
        data

    })
}
//删除商户
export function delMerchant(id) {
    return request({
        url: `/base/user/${id}`,
        method: 'delete',
    })
}
//删除商户下通道
export const delMerchantChannel = (data) => {
    return request({
        url: `/merchantCR/${id}`,
        method: 'delete',
    })
}