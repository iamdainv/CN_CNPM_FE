// with polyfills
import 'core-js/stable'
import 'regenerator-runtime/runtime'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
import i18n from './locales'
import { VueAxios } from './utils/request'
import ProLayout, { PageHeaderWrapper } from '@ant-design-vue/pro-layout'
import themePluginConfig from '../config/themePluginConfig'
import 'ant-design-vue/dist/antd.css'
import { Carousel, Pagination, TreeSelect } from 'ant-design-vue'

// import './mock'

import bootstrap from './core/bootstrap'
import './core/lazy_use' // use lazy load components
// import './permission' // permission control
import './utils/filter' // global filter
import './global.less' // global style
import Breadcrumb from './components/breadcrumb/Breadcrumb.vue'
import VueEasyLightbox from 'vue-easy-lightbox'
import VueCookies from 'vue-cookies'
import 'vue-toast-notification/dist/theme-sugar.css'
import VueToast from 'vue-toast-notification'
Vue.config.productionTip = false

Vue.use(VueToast)
Vue.use(VueEasyLightbox) // global variable
Vue.use(VueCookies)
Vue.use(VueAxios)
Vue.use(Carousel)
Vue.use(Pagination)
Vue.use(TreeSelect)
// use pro-layout components
Vue.component('pro-layout', ProLayout)
Vue.component('page-container', PageHeaderWrapper)
Vue.component('page-header-wrapper', PageHeaderWrapper)
Vue.component('breadcrumb', Breadcrumb)
require('./utils/mixins')
window.umi_plugin_ant_themeVar = themePluginConfig.theme

export const bus = new Vue()

new Vue({
  router,
  store,
  i18n,
  created: bootstrap,
  render: h => h(App)
}).$mount('#app')
