<template>
  <li class="header__navbar-item header__navbar-user">
    <img src="@/assets/img/user.png" alt="User" class="header__navbar-user-img">
    <span class="header__navbar-item-name">{{ username }}</span>

    <ul class="header__navbar-user-menu">
      <li class="header__navbar-user-item">
        <a href="#">Tài khoản của tôi</a>
      </li>
      <li class="header__navbar-user-item">
        <a href="#">Địa chỉ của tôi</a>
      </li>
      <li class="header__navbar-user-item">
        <a href="#">Đơn mua</a>
      </li>
      <li class="header__navbar-user-item header__navbar-user-item--separate">
        <a href>Đăng xuất</a>
      </li>
    </ul>
  </li>
</template>

<script>
export default {
  name: 'LoginPc',
  data () {
    return {
      username: ''
    }
  },
  mounted () {
    const { isLogin } = this.$store.getters.userInfo
    if (isLogin) {
      const { firstName } = this.$store.getters.userInfo.info
      this.username = firstName
    }
  }
}
</script>

<style>

</style>
