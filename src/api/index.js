import request from '@/utils/request'
import Qs from 'qs'
export function getConfig() {
    return request({
        url: 'backend/base/dict/dictMaps',
        method: 'get',
    })
}
export function getHead() {
    return request({
        url: 'backend/home/head',
        method: 'get',
    })
}
export function getBody(data) {
    return request({
        url: 'backend/home/body',
        method: 'post',
        data: Qs.stringify(data)
    })
}
