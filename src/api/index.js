import request from '@/utils/request'
import Qs from 'qs'
export function getConfig() {
    return request({
        url: '/api/common/dictMaps',
        method: 'get',
    })
}
export function getHead() {
    return request({
        url: '/home/head',
        method: 'get',
    })
}
export function getBody(data) {
    return request({
        url: '/home/body',
        method: 'post',
        data: Qs.stringify(data)
    })
}
