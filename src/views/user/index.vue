<template>
  <div>
    <header-user></header-user>
    <router-view></router-view>
    <footer-user></footer-user>
  </div>
</template>

<script>

// import '@/assets/css/grid.css'
// import '@/assets/css/base.css'
// import '@/assets/css/main.css'
// import '@/assets/css/footer.css'
// import '@/assets/css/responsive.css'
// import '@/assets/css/theme.css'

import HeaderUser from '@/components/user/header/index.vue'
import FooterUser from '@/components/user/footer/index.vue'
export default {
  data () {
    return {

    }
  },
  components: {
    HeaderUser,
    FooterUser
  }
}
</script>

<style>

</style>
