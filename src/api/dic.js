import request from '@/utils/request'
import Qs from 'qs'
export function getDicList(data) {
    return request({
        url: 'backend/base/dict/pagelist',
        method: 'post',
        data
    })
}
export function updateDic(data) {
    return request({
        url: 'backend/base/dict',
        method: 'post',
        data
    })
}
export function delDic(id) {
    return request({
        url: `backend/base/dict/${id}`,
        method: 'delete',
    })
}

