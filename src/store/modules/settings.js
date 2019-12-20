import defaultSettings from '@/settings'
import { getConfig } from '@/api/index'
const { showSettings, fixedHeader, sidebarLogo } = defaultSettings

const state = {
  payWay: [{
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
    value.PayWay.dicts = value.PayWay.dicts.filter(item => {
      return item.id != 7 && item.id != 12 && item.id != 13;
    })
    state.dict = value
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

