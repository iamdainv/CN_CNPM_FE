<template>
  <div class="home">
    <img alt="Vue logo" class="flex m-auto" src="../assets/shobbe.png" />
    <template v-if="loadingData">
      <div><a-spin size="small" /></div>
    </template>
    <template v-else-if="loadingData === false">
      <HelloWorld :msg="msg" />
      <HelloWorld :msg="msg" />
    </template>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import { apiService } from '@/api/api'
export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  data () {
    return {
      msg: 'Các bạn sịn',
      loadingData: true
    }
  },
  mounted () {
    // DEMO get mock api
    apiService.getMockResponse('demo', 1000).then(res => {
      this.msg = res.demo.text
      this.loadingData = false
    })
  }
}
</script>
