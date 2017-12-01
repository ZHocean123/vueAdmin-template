import { login, logout, getInfo } from '@/api/login'
import {
  getToken,
  setToken,
  removeToken,
  getLoginName,
  setLoginName,
  removeLoginName
} from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    name: getLoginName(),
    avatar: '',
    roles: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const loginName = userInfo.loginName.trim()
      return new Promise((resolve, reject) => {
        login(loginName, userInfo.password)
          .then(response => {
            const data = response
            setToken(data.user.id)
            setLoginName(loginName)
            commit('SET_TOKEN', data.user.id)
            commit('SET_NAME', loginName)
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo(state.token)
          .then(response => {
            const data = response.data
            commit('SET_ROLES', data.role)
            commit('SET_NAME', data.name)
            commit('SET_AVATAR', data.avatar)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token)
          .then(() => {
            commit('SET_TOKEN', '')
            commit('SET_ROLES', [])
            removeToken()
            removeLoginName()
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        removeLoginName()
        resolve()
      })
    }
  }
}

export default user
