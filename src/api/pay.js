import request from '@/utils/request'
import Qs from 'qs'

export function resetFail(id) {
  return request({
    url: '/payConfig/reset/' + id,
    method: 'get'
  })
}


//获取支付配置
export function getPays(data) {
    return request({
        url: '/payConfig/list',
        method: 'post',
        data
    })
}
//账号启用禁用支付方式
export function updateUse(data) {
    return request({
        url: '/pcAccount/isUsed',
        method: 'post',
        data: Qs.stringify(data)
    })
}
//通道启用禁用支付方式
export function updatePayUse(data) {
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
//删除通道
export function delConfigPay(id) {
    return request({
        url: `/payConfig/${id}`,
        method: 'delete',
    })
}
//获取全部账号
export function getAllAcount(data) {
    return request({
        url: '/pcAccount/list',
        method: 'post',
        data
    })
}
//添加账号
export function addAcount(data) {
    return request({
        url: '/pcAccount',
        method: 'post',
        data
    })
}
//删除账号
export function delAcount(id) {
    return request({
        url: `/pcAccount/${id}`,
        method: 'delete',
    })
}
