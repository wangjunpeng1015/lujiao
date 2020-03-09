import request from '@/utils/request'
export function getAppList(data) {
    return request({
        url: 'backend/merchant/list',
        method: 'post',
        data
    })
}
export function saveApp(data) {
    return request({
        url: 'backend/merchant/save',
        method: 'post',
        data
    })
}
export function delApp(id) {
    return request({
        url: 'backend/merchant/' + id,
        method: 'delete'
    })
}
