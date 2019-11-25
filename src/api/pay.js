import request from '@/utils/request'

//获取支付配置
export function getPays() {
    return request({
        url: '/payConfig/getdqyhpz',
        method: 'get',
    })
}
//启用禁用支付方式
export function updateUse(data) {
    return request({
        url: '/payConfig/updateUse',
        method: 'post',
        data
    })
}
