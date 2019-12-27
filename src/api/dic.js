import request from '@/utils/request'
import Qs from 'qs'
export function getDicList(data) {
    return request({
        url: '/base/dict/pagelist',
        method: 'post',
        data
    })
}
export function updateDic(data) {
    return request({
        url: '/base/dict',
        method: 'post',
        data
    })
}
export function delDic(id) {
    return request({
        url: `/base/dict/${id}`,
        method: 'delete',
    })
}

