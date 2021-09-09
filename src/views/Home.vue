<template>
  <div class="home">
    <img alt="Vue logo" class="flex m-auto" src="../assets/shobbe.png" />
    <template v-if="loadingData">
      <div><a-spin size="small" /></div>
    </template>
    <template v-else-if="loadingData === false">
      <HelloWorld :msg="msg" />
      <HelloWorld :msg="msg" />
      <p> Test call api axios </p>
      <pre> {{ JSON.stringify(jsonParse, null, '\t') }} </pre>
    </template>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import { apiService } from '@/api/api'
import { staticClientStorage } from '@/service/localStorage.service.ts'
export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  data () {
    return {
      msg: 'Các bạn sịn',
      jsonParse: '',
      loadingData: true
    }
  },
  mounted () {
    // DEMO get mock api
    const queryParams = {
      page: 2
    }
    staticClientStorage.set('abc', '1234')
    apiService.get('/users', queryParams).then(res => {
      this.loadingData = false
      this.jsonParse = res.data
    })
  }
}
</script>
