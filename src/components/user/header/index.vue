<template>
  <div class="header">
    <div class="grid wide">
      <nav class="header__navbar hide-on-mobile-tablet">
        <ul class="header__navbar-list">
          <li class="header__navbar-item">
            <a class="header__navbar-title--no-pointer btn-linkto-producer" @click="goToAdmin">Vào trang người bán</a>
          </li>
          <li class="header__navbar-item header__navbar-item--has-qr header__navbar-item--separate">
            Vào cửa hàng ứng dụng
            <div class="header__qr">
              <img src="@/assets/img/QR.png" alt="QR code" class="header__qr-img" />
              <div class="header__qr-apps">
                <a href="#" class="header__qr-link">
                  <img src="@/assets/img/GooglePlay.png" alt="Google play" class="header__qr-download-img" />
                </a>
                <a href="#" class="header__qr-link">
                  <img src="@/assets/img/AppStore.png" alt="App store" class="header__qr-download-img" />
                </a>
              </div>
            </div>
          </li>
          <li class="header__navbar-item">
            <span class="header__navbar-title--no-pointer">Kết nối</span>
            <div class="header_navbar-icon-link">
              <i class="header__navbar-icon fab fa-facebook"></i>
              <i class="header__navbar-icon fab fa-instagram"></i>
            </div>
          </li>
          <li class="header__navbar-item">
            <p>Test cicd</p>
          </li>
        </ul>

        <ul class="header__navbar-list">
          <li class="header__navbar-item header__navbar-item--strong header__navbar-item--has-notify">
            <a href="#" class="header__navbar-item-link">
              <i class="header__navbar-icon far fa-bell"></i>
              Thông báo
            </a>
            <!-- header notify -->
            <header-notify></header-notify>
          </li>
          <li class="header__navbar-item header__navbar-item--strong">
            <a href="#" class="header__navbar-item-link">
              <i class="header__navbar-icon far fa-question-circle"></i>
              Trợ giúp
            </a>
          </li>
          <!-- login on pc -->
          <template v-if="!$store.getters.userInfo.isLogin">
            <li class="header__navbar-item header__navbar-item--strong header__navbar-item--separate">
              <router-link :to="{ name: 'register' }" class="header__navbar-item-link">Đăng ký</router-link>
            </li>
            <li class="header__navbar-item header__navbar-item--strong">
              <router-link :to="{ name: 'login' }" class="header__navbar-item-link">Đăng nhập</router-link>
            </li>
          </template>

          <LoginPC v-if="$store.getters.userInfo.isLogin"></LoginPC>
        </ul>
      </nav>

      <!-- Header with search -->
      <div class="header-with-search">
        <label for="mobile-search-checkbox" class="header__mobile-search">
          <i class="fas fa-search header__mobile-search-icon"></i>
        </label>

        <div class="header__logo hide-on-tablet">
          <div class="header__logo-link" @click="gotoHome">
            <img src="@/assets/img/logo.svg" class="header__logo-img" />
          </div>
        </div>

        <input type="checkbox" hidden id="mobile-search-checkbox" class="header__search-checkbox" />

        <div class="header__search">
          <div class="header__search-input-wrap">
            <input v-model="keyword" type="text" class="header__search-input" placeholder="Nhập để tìm kiếm sản phẩm" />
            <div class="header__search-history">
              <h3 class="header__search-history-heading">Lịch sử tìm kiếm</h3>
              <ul class="header__search-history-list"></ul>
            </div>
          </div>
          <div class="header__search-select">
            <span class="header__search-select-label">Trong shop</span>
            <i class="fas fa-angle-down header__search-select-icon"></i>

            <ul class="header__search-option">
              <li class="header__search-option-item">
                <span>Trong shop</span>
                <i class="fas fa-check"></i>
              </li>

              <li class="header__search-option-item">
                <span>Ngoài shop</span>
                <i class="fas fa-check"></i>
              </li>
            </ul>
          </div>
          <button class="header__search-btn" @click="handleSearchProduct">
            <i class="header__search-btn-icon fas fa-search"></i>
          </button>
        </div>

        <div class="wrap-cart-login">
          <!-- Cart -->
          <cart-header></cart-header>

          <!-- Login on mobile and tablet -->
          <login-mobile-tablet></login-mobile-tablet>
        </div>
        <sort-mobile></sort-mobile>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderNotify from '@/components/user/header/header_notify'
import LoginPC from '@/components/user/header/login_pc'
import CartHeader from '@/components/user/header/cart_header'
import SortMobile from '@/components/user/header/sort_mobile'
import LoginMobileTablet from '@/components/user/header/login_mobile_tablet'
import { bus } from '@/main.js'
export default {
  name: 'HeaderUser',
  components: {
    HeaderNotify,
    LoginPC,
    CartHeader,
    SortMobile,
    LoginMobileTablet
  },
  data () {
    return {
      keyword: ''
    }
  },
  methods: {
    gotoHome () {
      if (this.$route.name !== 'home') {
        this.$router.push({ name: 'home' })
      }
    },
    goToAdmin () {
      if (this.$store.getters.isLogin) {
        this.$router.push({ name: 'dashboard' })
      } else {
        this.$notification.warning({
          message: 'Bạn chưa đăng nhập',
          duration: 5
        })
        this.$router.push({ name: 'login' })
      }
    },
    handleSearchProduct () {
      if (this.$route.name === 'home') {
        bus.$emit('searchProductsByKeyword', this.keyword)
      } else if (this.$route.name === 'productsByCategory') {
        bus.$emit('searchProductsCategoryByKeyword', this.keyword)
      } else {
        this.$router.push({ name: 'productsByCategory', params: { categoryId: 1 } })
        setTimeout(() => { bus.$emit('searchProductsCategoryByKeyword', this.keyword) }, 0)
      }
    }
  }
}
</script>

<style></style>
