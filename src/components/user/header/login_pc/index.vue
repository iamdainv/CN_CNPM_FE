<template>
  <li class="header__navbar-item header__navbar-user" @mousemove="visible = true" @mouseleave="visible = false">
    <img :src="image" alt="User" class="header__navbar-user-img" />
    <span class="header__navbar-item-name"> {{ username }} </span>

    <ul class="header__navbar-user-menu" v-if="visible">
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
  </li>
</template>

<script>
export default {
  name: 'LoginPc',
  data () {
    return {
      username: '',
      image: '',
      visible: false
    }
  },
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
        this.visible = false
        this.$cookies.remove('token')
        this.$store.dispatch('logout')
        location.reload()
    }
  },
  mounted () {
    const { isLogin } = this.$store.getters.userInfo
    if (isLogin) {
      const { firstName, image } = this.$store.getters.userInfo.info
      this.username = firstName
      this.image = image
    }
  }
}
</script>

<style></style>
