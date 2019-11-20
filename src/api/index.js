import request from '@/utils/request'

export function getConfig() {
    return request({
        url: '/base/dict/dictMaps',
        method: 'get',
    })
}
