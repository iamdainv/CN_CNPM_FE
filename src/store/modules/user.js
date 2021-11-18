import Vue from 'vue'
import { loginByToken } from '@/api/user/auth'

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
    userAddress: [
      {
        id: 1,
        name: 'Nguyễn Viêt Đại',
        phone: '(+84) 888539611',
        address: 'Số nhà 26 ngõ 62 đường Hậu Ái, Vân Canh , Hoài Đức , Hà Nội',
        ward: 'Xã Vân Canh',
        district: 'Huyện Hoài Đức',
        city: 'Hà Nội',
        is_delivery_address: true
      },
      {
        id: 4,
        name: 'Nguyễn Viêt Đại',
        phone: '(+84) 888539611',
        address: 'Số nhà 26 ngõ 62 đường Hậu Ái, Vân Canh , Hoài Đức , Hà Nội',
        ward: 'Xã Vân Canh',
        district: 'Huyện Hoài Đức',
        city: 'Hà Nội',
        is_delivery_address: false
      },
      {
        id: 2,
        name: 'Nguyễn Viêt Đại',
        phone: '(+84) 888539611',
        address: 'Số nhà 26 ngõ 62 đường Hậu Ái, Vân Canh , Hoài Đức , Hà Nội',
        ward: 'Xã Vân Canh',
        district: 'Huyện Hoài Đức',
        city: 'Hà Nội',
        is_delivery_address: false
      },
      {
        id: 123,
        name: 'Nguyễn Viêt Đại',
        phone: '(+84) 888539611',
        address: 'Số nhà 26 ngõ 62 đường Hậu Ái, Vân Canh , Hoài Đức , Hà Nội',
        ward: 'Xã Vân Canh',
        district: 'Huyện Hoài Đức',
        city: 'Hà Nội',
        is_delivery_address: false
      }
    ]
  },
  getters: {
    isLogin: state => state.isLogin,
    userId: state => state.info.id,
    shopName: state => state.info.shopName ?? `${state.info.firstName}`
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
    LOGOUT: (state, info) => {

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
          })
        } else {
          dispatch('handleTokenIllegal')
          reject(new Error('Không có token'))
        }
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
