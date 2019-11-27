import request from '@/utils/request'
import Qs from 'qs'
//获取支付配置
export function getPays(data) {
    return request({
        url: '/payConfig/list',
        method: 'post',
        data
    })
}
//启用禁用支付方式
export function updateUse(data) {
    return request({
        url: '/payConfig/isUsed',
        method: 'post',
        data: Qs.stringify(data)
    })
}
//修改支付方式
export function updateConfigPay(data) {
    return request({
        url: '/payConfig/save',
        method: 'post',
        data
    })
}
