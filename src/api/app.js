import request from '@/utils/request'
export function getAppList(data) {
    return request({
        url: '/merchant/list',
        method: 'post',
        data
    })
}
export function saveApp(data) {
    return request({
        url: '/merchant/save',
        method: 'post',
        data
    })
}
export function delApp(id) {
    return request({
        url: '/merchant/' + id,
        method: 'delete'
    })
}
