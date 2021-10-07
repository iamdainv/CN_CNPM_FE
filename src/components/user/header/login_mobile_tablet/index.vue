<template>
  <div class="login-on-mobile-tablet header__navbar-item header__navbar-user hide-on-pc">
    <img src="@/assets/img/user.png" alt="User" class="header__navbar-user-img">

    <ul class="header__navbar-user-menu">
      <li class="header__navbar-user-item">
        <div @click="gotoAccount">Tài khoản của tôi</div>
      </li>
      <li class="header__navbar-user-item">
        <div @click="gotoAddress">Địa chỉ của tôi</div>
      </li>
      <li class="header__navbar-user-item">
        <div @click="gotoPurchase">Đơn mua</div>
      </li>
      <li class="header__navbar-user-item header__navbar-user-item--separate">
        <div @click="handleLogout">Đăng xuất</div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'LoginMobileTablet',
  methods: {
    gotoAccount () {
      if (this.$route.name !== 'userInfo') {
        this.$router.push({ name: 'userInfo' })
      }
    },
    gotoAddress () {
      if (this.$route.name !== 'userAddress') {
        this.$router.push({ name: 'userAddress' })
      }
    },
    gotoPurchase () {
      if (this.$route.name !== 'purchase') {
        this.$router.push({ name: 'purchase' })
      }
    },
    handleLogout () {
      console.log('Logout')
    }
  }
}
</script>

<style>

</style>
