<template>
  <div class="auth-header__container">
    <div class="auth-header">
      <div class="wrap-brand">
        <router-link to="/"><img src="@/assets/img/LogoAuth.svg" class="img-brand" /></router-link>
        <h1 class="auth-header__title">{{ authName }}</h1>
      </div>
      <div class="auth-header__help">Bạn cần trợ giúp?</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HeaderAuth',
  data: function () {
    return {
      authName: ''
    }
  },

  methods: {
    updateAuthName () {
      this.authName = this.$route.name === 'login' ? 'Đăng nhập' : 'Đăng ký'
    }
  },

  mounted: function () {
    this.updateAuthName()
  },
  watch: {
    $route (to, from) {
      this.updateAuthName()
    }
  }
}
</script>

<style>
.auth-header__container {
  width: 100%;
  background-color: white;
}
.auth-header {
  width: 60%;
  height: 90px;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.wrap-brand {
  flex: 1;
  display: flex;
  align-items: flex-end;
}
.img-brand {
  height: 45px;
}
.auth-header__title {
  margin: 0 20px;
}
.auth-header__help {
  cursor: pointer;
  color: rgb(238, 77, 45);
}
</style>
