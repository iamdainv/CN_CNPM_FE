<template>
  <div>
    <header-user></header-user>
    <router-view></router-view>
    <footer-user></footer-user>
  </div>
</template>

<script>

import '@/assets/css/index.scss'
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
