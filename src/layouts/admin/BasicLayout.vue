<template>
  <pro-layout
    :menus="menus"
    :collapsed="collapsed"
    :mediaQuery="query"
    :isMobile="isMobile"
    :handleMediaQuery="handleMediaQuery"
    :handleCollapse="handleCollapse"
    :i18nRender="i18nRender"
    v-bind="settings"
  >
    <template v-slot:menuHeaderRender>
      <div align="center">
        <logo-svg/>
      </div>
    </template>
    <template v-slot:headerContentRender>
      <div>
      </div>
    </template>
    <setting-drawer :settings="settings" @change="handleSettingChange">
    </setting-drawer>
    <template v-slot:rightContentRender>
      <right-content :top-menu="settings.layout === 'topmenu'" :is-mobile="isMobile" :theme="settings.theme" @menu="onChangeMenu"/>
    </template>
    <template v-slot:footerRender>
      <global-footer />
    </template>
    <router-view />
  </pro-layout>
</template>

<script>
// import { SettingDrawer } from '@ant-design-vue/pro-layout'
import SettingDrawer from '@/components/SettingDrawer'
import { i18nRender } from '@/locales'
import { mapState } from 'vuex'
import { CONTENT_WIDTH_TYPE } from '@/store/mutation-types'
import {
  asyncRouterMap
} from '@/config/router.config.js'
import defaultSettings from '@/config/defaultSettings'
import RightContent from '@/components/GlobalHeader/RightContent'
import GlobalFooter from '@/components/GlobalFooter'
import Ads from '@/components/Other/CarbonAds'
import LogoSvg from '../../assets/logo.svg?inline'
import { themeColor } from '@ant-design-vue/pro-layout/lib/utils/dynamicTheme'
export default {
  name: 'BasicLayout',
  components: {
    SettingDrawer,
    RightContent,
    GlobalFooter,
    LogoSvg,
    Ads
  },
  data () {
    return {
      isProPreviewSite: process.env.VUE_APP_PREVIEW === 'true' && process.env.NODE_ENV !== 'development',
      isDev: process.env.NODE_ENV === 'development' || process.env.VUE_APP_PREVIEW === 'true',

      menus: [],
      collapsed: false,
      title: defaultSettings.title,
      settings: {
        layout: defaultSettings.layout, // 'sidemenu', 'topmenu'
        contentWidth: defaultSettings.layout === 'sidemenu' ? CONTENT_WIDTH_TYPE.Fluid : defaultSettings.contentWidth,
        theme: defaultSettings.navTheme,
        primaryColor: defaultSettings.primaryColor,
        fixedHeader: defaultSettings.fixedHeader,
        fixSiderbar: defaultSettings.fixSiderbar,
        colorWeak: defaultSettings.colorWeak,
        hideHintAlert: true,
        hideCopyButton: true
      },
      query: {},

      isMobile: false
    }
  },
  computed: {
    ...mapState({
      mainMenu: state => state.permission.addRouters
    }),
    menuType () {
      return localStorage.getItem('menu')
    }
  },
  created () {
    if (this.menuType) {
      this.onChangeMenu(this.menuType)
    } else {
      this.menus = asyncRouterMap.find((item) => item.path === '/').children
    }
    // this.menus = this.mainMenu.find((item) => item.path === '/').children
  },
  mounted () {
    console.log(this.menuType)
    const userAgent = navigator.userAgent
    if (userAgent.indexOf('Edge') > -1) {
      this.$nextTick(() => {
        this.collapsed = !this.collapsed
        setTimeout(() => {
          this.collapsed = !this.collapsed
        }, 16)
      })
    }

    // first update color
    // TIPS: THEME COLOR HANDLER!! PLEASE CHECK THAT!!
    if (process.env.NODE_ENV !== 'production' || process.env.VUE_APP_PREVIEW === 'true') {
      // updateTheme(this.settings.primaryColor)
    }
    this.updateTheme('#1890ff')
  },
  methods: {
    updateTheme (newPrimaryColor) {
      // var hideMessage = message.loading('ĐỔI MÀY CHỦ ĐỀ', 0)
      // themeColor.changeColor(newPrimaryColor).then(function (r) {hideMessage()})
      themeColor.changeColor(newPrimaryColor)
    },
    i18nRender,
    handleMediaQuery (val) {
      this.query = val
      if (this.isMobile && !val['screen-xs']) {
        this.isMobile = false
        return
      }
      if (!this.isMobile && val['screen-xs']) {
        this.isMobile = true
        this.collapsed = false
        this.settings.contentWidth = CONTENT_WIDTH_TYPE.Fluid
        // this.settings.fixSiderbar = false
      }
    },
    handleCollapse (val) {
      this.collapsed = val
    },
    handleSettingChange ({ type, value }) {
      console.log('type', type, value)
      type && (this.settings[type] = value)
      switch (type) {
        case 'contentWidth':
          this.settings[type] = value
          break
        case 'layout':
          if (value === 'sidemenu') {
            this.settings.contentWidth = CONTENT_WIDTH_TYPE.Fluid
          } else {
            this.settings.fixSiderbar = false
            this.settings.contentWidth = CONTENT_WIDTH_TYPE.Fixed
          }
          break
      }
    },
    onChangeMenu (val) {
      if (val) {
        switch (val) {
          case 'CLIENT':
            this.menus = asyncRouterMap.find((item) => item.path === '/').children
            break
          default:
            return val
        }
      }
    }
  }
}
</script>

<style lang="less">
@import "BasicLayout.less";
@import "/src/assets/style/index";
.ant-menu-item {
  text-transform: uppercase;
}
.ant-sub-item {
  text-transform: uppercase;
}
.ant-menu-submenu-title {
  text-transform: uppercase;
}
</style>
