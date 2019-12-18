import request from '@/utils/request'
import Qs from 'qs'
//获取列表
export const getMerchants = (data) => {
    return request({
        url: '/home/userPage',
        method: 'post',
        data
    })
}
//修改利率
export const changeRate = (data) => {
    return request({
        url: '/merchantIR',
        method: 'post',
        data: Qs.stringify(data)

    })
}