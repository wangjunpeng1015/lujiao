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
    const { account, password, captcha } = userInfo
    return new Promise((resolve, reject) => {
      login({ account: account.trim(), password: password.trim(), captcha, ip: returnCitySN.cip }).then(response => {
        if (response.code === 200) {
          const { data } = response
          commit('SET_TOKEN', data.token)
          setToken(data.token)
          this.dispatch('user/getInfo')
          this.dispatch("settings/getdic")
          resolve()
        } else {
          reject('验证码错误，请重新输入')
        }
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
        let { data } = response
        if (!data) {
          reject('请重新登录！')
        }
        // let hash = Math.random().toString(36).substr(2)
        // initWebSocket(getToken(), data.account, hash)
        let roles = [state.roles.find((n) => n.id === data.role_id)]
        commit('SET_USER_INFO', Object.assign(data, {
          roles
        }))
        resolve(Object.assign(data, {
          roles
        }))
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

