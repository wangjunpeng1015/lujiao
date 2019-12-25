import { login, logout, getInfo, getRoles, register, changePassword } from '@/api/user'
import { getIp } from '@/api/index'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { router, resetRouter } from '@/router'
import { initWebSocket } from '@/api/socket'

const state = {
  token: getToken(),
  userinfo: null,
  roles: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_USER_INFO: (state, data) => {
    state.userinfo = data
  },
  SET_ROLES: (state, data) => {
    state.roles = data
  },
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { account, password, type } = userInfo
    return new Promise((resolve, reject) => {
      login({ account: account.trim(), password: password.trim(), type, ip: returnCitySN.cip }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        this.dispatch('user/getInfo')
        this.dispatch("settings/getdic")
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  register({ commit }, info) {
    return new Promise((resolve, reject) => {
      register(info).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getRoles({ commit }) {
    return new Promise((resolve, reject) => {
      getRoles().then(response => {
        commit('SET_ROLES', response.data)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo().then(response => {
        const { data } = response
        if (!data) {
          reject('请重新登录！')
        }
        // let hash = Math.random().toString(36).substr(2)
        // initWebSocket(getToken(), data.account, hash)
        commit('SET_USER_INFO', data)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout().then(() => {
        commit('SET_TOKEN', '')
        commit('SET_USER_INFO', '')
        removeToken()
        resetRouter()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // change password
  changePassword({ commit }, data) {
    return new Promise((resolve, reject) => {
      changePassword(data).then(() => {
        commit('SET_TOKEN', '')
        removeToken()
        resetRouter()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      removeToken()
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

