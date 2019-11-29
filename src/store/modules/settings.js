import defaultSettings from '@/settings'
import { getConfig } from '@/api/index'
const { showSettings, fixedHeader, sidebarLogo } = defaultSettings

const state = {
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
      return item.id != 7 && item.id != 9;
    })
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

