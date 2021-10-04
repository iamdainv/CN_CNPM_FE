import storage from 'store'
import { login, getInfo, logout } from '@/api/general/login'
import { welcome } from '@/utils/util'

const lsKey = 'vuex_user'

const user = {
  state: {
    currentApp: 'o2oService',
    token: null,
    name: null,
    welcome: null,
    avatar: null,
    roles: [],
    info: {}
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
      storage.set(lsKey, state)
    },
    SET_NAME: (state, name) => {
      state.name = name
      storage.set(lsKey, state)
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
      storage.set(lsKey, state)
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
      storage.set(lsKey, state)
    },
    SET_INFO: (state, info) => {
      state.info = info
      storage.set(lsKey, state)
    },
    SET_WELCOME: (state, welcome) => {
      state.welcome = welcome
      storage.set(lsKey, state)
    },
    SET_CURRENT_APP: (state, app) => {
      state.currentApp = app
      storage.set(lsKey, state)
    }
  },

  actions: {
    initUser ({ commit }, userInfo) {
      if (!userInfo) {
        userInfo = storage.get(lsKey)
      }
      if (userInfo) {
        for (const k in userInfo) {
          if (userInfo.hasOwnProperty(k)) {
            const key = 'SET_' + k.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`).toUpperCase()
            commit(key, userInfo[k])
          }
        }
      }
    },
    Login ({ commit, dispatch }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo).then(rs => {
          console.log(rs)
          if (rs.code === 'API000') {
            const result = rs.body
            const userInfo = {
              token: result.tokenData.accessToken,
              name: result.name,
              welcome: 'Xin chào, ' + result.name,
              avatar: null,
              roles: [],
              info: result
            }
            dispatch('initUser', userInfo)
            resolve(result)
          } else {
            reject(rs)
          }
        }).catch(error => {
          reject(error)
        })
      })
    },

    GetInfo ({ commit }) {
      return new Promise((resolve, reject) => {
        getInfo().then(response => {
          const result = response.result

          if (result.role && result.role.permissions.length > 0) {
            const role = result.role
            role.permissions = result.role.permissions
            role.permissions.map(per => {
              if (per.actionEntitySet != null && per.actionEntitySet.length > 0) {
                const action = per.actionEntitySet.map(action => { return action.action })
                per.actionList = action
              }
            })
            role.permissionList = role.permissions.map(permission => { return permission.permissionId })
            commit('SET_ROLES', result.role)
            commit('SET_INFO', result)
          } else {
            reject(new Error('getInfo: roles must be a non-null array !'))
          }

          commit('SET_NAME', { name: result.name, welcome: welcome() })
          commit('SET_AVATAR', result.avatar)

          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    Logout ({ dispatch, state }) {
      return new Promise((resolve, reject) => {
        logout({ refreshToken: state.info.tokenData.refreshToken, 'client': 'o2oService' }).then((rs) => {
          if (rs.code === 'API000') {
            const userInfo = {
              token: null,
              name: null,
              welcome: null,
              avatar: null,
              roles: [],
              info: {}
            }
            dispatch('initUser', userInfo)
            resolve(rs)
          } else {
            reject(rs)
          }
        }).catch((err) => {
          reject(err)
        }).finally(() => {
        })
      })
    }

  }
}

export default user
