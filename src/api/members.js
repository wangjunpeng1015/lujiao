import request from '@/utils/request'
import Qs from 'qs'
//获取列表
export const getMerchants = (data) => {
    return request({
        url: 'backend/home/userPage',
        method: 'post',
        data
    })
}
//修改利率
export const changeRate = (data) => {
    return request({
        url: 'backend/merchantCR/renewalRate',
        method: 'post',
        data: Qs.stringify(data)
    })
}
//修改回调url
export const changeUrl = (data) => {
    return request({
        url: 'backend/merchantSign',
        method: 'post',
        data: Qs.stringify(data)
    })
}
//关闭通道
export const shutdownChannel = (id) => {
    return request({
        url: `backend/merchantCR/shutdownChannel/${id}`,
        method: 'get',
    })
}
//商户通道利率
export const getMerchantChannel = (data) => {
    return request({
        url: 'backend/merchantCR/pageList',
        method: 'post',
        data

    })
}
//商户通道添加
export const addMerchantChannel = (data) => {
    return request({
        url: 'backend/merchantCR/save',
        method: 'post',
        data
    })
}
//删除商户
export function delMerchant(id) {
    return request({
        url: `backend/base/user/${id}`,
        method: 'delete',
    })
}
//删除商户下通道
export const delMerchantChannel = (id) => {
    return request({
        url: `backend/merchantCR/${id}`,
        method: 'delete',
    })
}
//修改码商账号状态
export const changeCoderStatus = id => {
  return request({
    url: `backend/pcAccount/codeMerchant/${id}`,
    method: 'get'
  })
}
