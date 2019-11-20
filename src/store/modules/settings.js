import defaultSettings from '@/settings'
import { getConfig } from '@/api/index'
const { showSettings, fixedHeader, sidebarLogo } = defaultSettings

const state = {
  website: 'http://wangjunpeng.online',
  payWay: [
    {
      value: "支付宝",
      label: "支付宝"
    },
    {
      value: "微信",
      label: "微信"
    },
    {
      value: "银行卡",
      label: "银行卡"
    }],
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
    state.dict = value
  }
}

const actions = {
  changeSetting({ commit }, data) {
    commit('CHANGE_SETTING', data)
  },
  getdic({ commit }) {
    getConfig().then(response => {
      const { data } = response
      commit('SET_DIC', data.dictMap)
    }).catch(error => {
    })
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

