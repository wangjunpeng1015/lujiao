import { login, logout, getInfo, register, changePassword } from '@/api/user'
import { getIp } from '@/api/index'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { router, resetRouter } from '@/router'
const state = {
  token: getToken(),
  userinfo: null,
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_USER_INFO: (state, data) => {
    state.userinfo = data
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
        this.dispatch('user/getInfo')
        this.dispatch("settings/getdic")
        setToken(data.token)
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
  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo().then(response => {
        const { data } = response
        if (!data) {
          reject('请重新登录！')
        }
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

