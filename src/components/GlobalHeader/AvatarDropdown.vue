<template>
  <a-dropdown v-if="currentUser && currentUser.name" placement="bottomRight" style="margin-right: 0px">
    <span class="ant-pro-account-avatar">
      <span >{{ $store.getters.shopName }}</span>
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
      </a-menu>
    </template>
  </a-dropdown>
  <span v-else>
    <a-spin size="small" :style="{ marginLeft: 8, marginRight: 8 }" />
  </span>
</template>

<script>
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
