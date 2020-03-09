import request from '@/utils/request'
import Qs from 'qs'
export function changeRate(data) {
    return request({
        url: 'backend/proxyCA/renewalRate',
        method: 'post',
        data: Qs.stringify(data)
    })
}
export function getAllchannel(data) {
    return request({
        url: 'backend/proxyCA/pageList',
        method: 'post',
        data
    })
}
//代理下所有配置的通道
export function getProxyChannel() {
    return request({
        url: 'backend/proxyCA',
        method: 'get',
    })
}
//
export function getMerchantChannel(id) {
    return request({
        url: `backend/merchantCR/findUsedProxyPayWay/${id}`,
        method: 'get',
    })
}

export function delChannel(id) {
    return request({
        url: `backend/proxyCA/${id}`,
        method: 'delete',
    })
}
export function addChannel(data) {
    return request({
        url: 'backend/proxyCA/channelAuthorization',
        method: 'post',
        data
    })
}

