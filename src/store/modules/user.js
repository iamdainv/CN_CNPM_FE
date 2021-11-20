import Vue from 'vue'
import { loginByToken } from '@/api/user/auth'
import { getUserAddress } from '@/api/user/user'
import _ from 'lodash'

const user = {
  state: {
    token: null,
    isLogin: false,
    info: {
      firstName: 'Nguyễn Cao',
      lastName: 'Thìn',
      photoURL: 'https://cf.shopee.vn/file/3fc286d5073fbafafdcf616a505672eb',
      numberPhone: '08345345345',
      email: 'shobbebus@gmail.com',
      currentAddress: 'Số 26, ngõ 62, Vân Canh, Hoài Đức, Hà Nội',
      shopName: 'Shop của Thìn',
      address: '',
      id: 0
    },
    userAddress: []
  },
  getters: {
    isLogin: state => state.isLogin,
    userId: state => state.info.id,
    shopName: state => state.info.shopName ?? `${state.info.firstName}`,
    address: state => state.userAddress
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
      state.isLogin = true
    },
    SET_INFO: (state, info) => {
      state.info = info
      state.isLogin = true
    },
    SET_USER_ADDRESS: (state, address) => {
      state.userAddress = _.cloneDeep(address)
    },
    LOGOUT: (state, info) => {
      state.info = {}
      state.isLogin = false
    },
    RESET_STATE (state) {
      // Merge rather than replace so we don't lose observers
      // https://github.com/vuejs/vuex/issues/1118
      Object.assign(state, user)
    }
  },

  actions: {
    initUser ({ commit }, userInfo) {
      commit('SET_INFO', userInfo)
      commit('SET_TOKEN', userInfo.token)
    },
    logout ({ commit }, userInfo) {
      commit('LOGOUT')
    },
    loginToken ({ commit, dispatch }, userInfo) {
      return new Promise((resolve, reject) => {
        const token = Vue.$cookies.get('token')
        if (token) {
          loginByToken(token).then(response => {
            const { data } = response.data
            commit('SET_INFO', data)
            resolve(data)
          }).catch(error => {
            Vue.$cookies.remove('token')
            dispatch('handleTokenIllegal')
            reject(error)
          }).finally(() => {
            dispatch('getUserAddress')
          })
        } else {
          dispatch('handleTokenIllegal')
          reject(new Error('Không có token'))
        }
      })
    },
    getUserAddress ({ commit }) {
      getUserAddress().then(rs => {
        const userAddress = rs.data.data
        commit('SET_USER_ADDRESS', userAddress)
      })
    },
    resetUserState ({ commit }) {
      commit('RESET_STATE')
    },
    handleTokenIllegal ({ commit, dispatch }) {
      // TODO: reset state cart
      dispatch('resetUserState')
    }
  }
}

export default user
