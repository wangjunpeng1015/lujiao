import defaultSettings from '@/settings'
import { getConfig } from '@/api/index'
const { showSettings, fixedHeader, sidebarLogo } = defaultSettings

const state = {
  channel: null,
  payWay: [{
    label: '其它',
    value: 'other'
  }, {
    label: '支付宝',
    value: 'ali'
  }, {
    label: '微信',
    value: 'wx'
  }, {
    label: '银行卡',
    value: 'bank'
  }, {
    label: '云闪付',
    value: 'cloud'
  }],
  // payWay: [{
  //   label: '云靓刷',
  //   value: '8000101'
  // }, {
  //   label: '轻松经费',
  //   value: '8000103'
  // }, {
  //   label: '宝转卡',
  //   value: '8000102'
  // },
  //  {
  //   label: '微信个码',
  //   value: 'wxgm'
  // }, 
  // {
  //   label: '支付宝转账码',
  //   value: '8000104'
  // }, {
  //   label: '钱方通道-H5',
  //   value: '8000107'
  // }, {
  //   label: '钱方通道-微信',
  //   value: '8000105'
  // }, {
  //   label: '当面付',
  //   value: '8000106'
  // }],
  website: 'http://wangjunpeng.online',
  dict: null,
  showSettings: showSettings,
  fixedHeader: fixedHeader,
  sidebarLogo: sidebarLogo
}

const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    if (state.hasOwnProperty(key)) {
      state[key] = value
    }
  },
  SET_DIC: (state, value) => {
    // value.PayWay.dicts = value.PayWay.dicts.filter(item => {
    //   return item.id != 7 && item.id != 12 && item.id != 13;
    // })
    state.dict = value
  },
  SET_CHANNEL: (state, value) => {
    state.channel = value
  },
}

const actions = {
  changeSetting({ commit }, data) {
    commit('CHANGE_SETTING', data)
  },
  getdic({ commit }) {
    return new Promise((resolve, reject) => {
      getConfig().then(response => {
        const { data } = response
        commit('SET_DIC', data.dictMap)
        resolve()
      }).catch(error => {
        reject()
      })
    })
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

