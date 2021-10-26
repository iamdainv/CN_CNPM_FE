import { mapState } from 'vuex'
import store from './index'
const baseMixin = {
  computed: {
    ...mapState({
      layout: state => state.app.layout,
      navTheme: state => state.app.theme,
      primaryColor: state => state.app.color,
      colorWeak: state => state.app.weak,
      fixedHeader: state => state.app.fixedHeader,
      fixedSidebar: state => state.app.fixedSidebar,
      contentWidth: state => state.app.contentWidth,
      autoHideHeader: state => state.app.autoHideHeader,

      isMobile: state => state.app.isMobile,
      sideCollapsed: state => state.app.sideCollapsed,
      multiTab: state => state.app.multiTab
    }),
    isTopMenu () {
      return this.layout === 'topmenu'
    },
    partialUserEmail () {
      return store.getters.userInfo.email.replace(/(\w{3})[\w.-]+@([\w.]+\w)/, '$1***@$2')
    },
    partialUserNumberPhone () {
      return store.getters.userInfo.numberPhone.replace(/(\d{3})\d{6}(\d{2})/, '$1*******$2')
    }
  },
  methods: {
    isSideMenu () {
      return !this.isTopMenu
    }
  }
}

export {
  baseMixin
}
