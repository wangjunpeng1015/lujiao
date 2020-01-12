import request from '@/utils/request'
import Qs from 'qs'
//添加账号
export function addUsdtAccount(data) {
    return request({
        url: '/hb/addConfigKey',
        method: 'post',
        data
    })
}
//获取全部账号
export function getUsdtAccount(data) {
    return request({
        url: '/hb/getConfig',
        method: 'post',
        data
    })
}
//修改用户配置信息
export function updateUsdtAccount(data) {
    return request({
        url: '/hb/updateConfigKey',
        method: 'post',
        data
    })
}
//获取用户余额
export function getUsdtBalance(data) {
    return request({
        url: '/hb/getBalance',
        method: 'post',
        data
    })
}
//提币额度查询
export function getUsdtQuota(data) {
    return request({
        url: '/hb/withdrawQuota',
        method: 'post',
        data
    })
}
//获取充币地址
export function getUsdtAddress(data) {
    return request({
        url: '/hb/depositAddress',
        method: 'post',
        data
    })
}
//获取充提记录
export function getRecord(data) {
    return request({
        url: '/hb/getRecord',
        method: 'post',
        data
    })
}
//获取充提记录
export function getCurrencies(data) {
    return request({
        url: '/hb/currencies',
        method: 'post',
        data
    })
}
//删除usdt配置
export function deleteUsdt (data) {
    return request({
        url: '/hb/delUsdt',
        method: 'post',
        data
    })
}
