import Vue from 'vue'
import Vuex from 'vuex'

import app from './modules/app'
import user from './modules/user'

// default router permission control
import permission from './modules/permission'
import cart from './modules/cart'

// dynamic router permission control (Experimental)
// import permission from './modules/async-router'
import getters from './getters'

Vue.use(Vuex)

const vuex = new Vuex.Store({
  modules: {
    app,
    user,
    permission,
    cart
  },
  state: {},
  mutations: {},
  actions: {},
  getters
})
vuex.dispatch('initUser', null)
export default vuex
