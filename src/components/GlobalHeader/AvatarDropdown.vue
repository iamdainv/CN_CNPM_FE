<template>
  <a-dropdown v-if="currentUser && currentUser.name" placement="bottomRight" style="margin-right: 0px">
    <span class="ant-pro-account-avatar">
      <span >{{ currentUser.name }}</span>
      <a-avatar style="margin-left: 10px" size="small" src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png" class="antd-pro-global-header-index-avatar" />
    </span>
    <template v-slot:overlay>
      <a-menu class="ant-pro-drop-down menu" :selected-keys="selectedKeys">
        <a-menu-item v-if="menu" key="settings" @click="handleToSettings">
          <a-icon type="user" />
          {{ $t('menu.account.settings') }}
        </a-menu-item>
        <a-menu-divider v-if="menu" />
        <a-menu-item v-if="menu" key="client" @click="handleToCenter('CLIENT')">
          <a-icon type="shopping" />
          {{ $t('menu.account.sub-system.client') }}
        </a-menu-item>
        <a-menu-divider v-if="menu" />
        <a-menu-item key="logout" @click="handleLogout">
          <a-icon type="logout" />
          {{ $t('menu.account.logout') }}
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
  <span v-else>
    <a-spin size="small" :style="{ marginLeft: 8, marginRight: 8 }" />
  </span>
</template>

<script>
import { Modal } from 'ant-design-vue'

export default {
  name: 'AvatarDropdown',
  data () {
    return {
      selectedKeys: []
    }
  },
  props: {
    currentUser: {
      type: Object,
      default: () => null
    },
    menu: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    menuType () {
      return localStorage.getItem('menu')
    }
  },
  created () {
    if (this.menuType) {
      this.selectedKeys = [this.menuType]
    }
  },
  methods: {
    handleToCenter () {
      this.$router.push({ path: '/' })
    },
    handleToSettings () {
      this.$router.push({ path: '/account/settings' })
    },
    handleLogout (e) {
      Modal.confirm({
        title: this.$t('layouts.usermenu.dialog.title'),
        content: this.$t('layouts.usermenu.dialog.content'),
        onOk: () => {
          return this.$store.dispatch('Logout').then(() => {
            this.$router.push({ name: 'login' })
          })
        },
        onCancel () {}
      })
    }
  }
}
</script>

<style lang="less" scoped>
.ant-pro-drop-down {
  /deep/ .action {
    margin-right: 8px;
  }
  /deep/ .ant-dropdown-menu-item {
    min-width: 160px;
  }
}
</style>
