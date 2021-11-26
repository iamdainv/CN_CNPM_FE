<template>
  <div class="app__container">
    <div class="grid wide pt-5 f-14 d-flex">
      <user-sidebar></user-sidebar>
      <div class="account-section ml-5">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import UserSidebar from '@/views/client/user/user_workspace/user_sidebar'
require('@/assets/css/userprofile.css')
export default {
    name: 'UserWorkspace',
    components: {
        UserSidebar
    }
}
</script>

<style>

</style>
