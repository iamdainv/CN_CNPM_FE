<template>
  <div class="login-on-mobile-tablet header__navbar-item header__navbar-user hide-on-pc">
    <img src="@/assets/img/user.png" alt="User" class="header__navbar-user-img">

    <ul class="header__navbar-user-menu">
        <li class="header__navbar-user-item">
            <a href="#">Nguyễn Cao Thìn</a>
        </li>
        <li class="header__navbar-user-item">
            <a href="/user/profile">Tài khoản của tôi</a>
        </li>
        <li class="header__navbar-user-item">
            <a href="#">Địa chỉ của tôi</a>
        </li>
        <li class="header__navbar-user-item">
            <a href="#">Đơn mua</a>
        </li>
        <li class="header__navbar-user-item header__navbar-user-item--separate">
            <a href="#">Đăng xuất</a>
        </li>
    </ul>
</div>
</template>

<script>
export default {
  name: 'login-mobile-tablet'
}
</script>

<style>

</style>
