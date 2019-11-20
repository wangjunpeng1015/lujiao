import request from '@/utils/request'

export function getConfig() {
    return request({
        url: '/base/dict/dictMaps',
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
        data
    })
}
