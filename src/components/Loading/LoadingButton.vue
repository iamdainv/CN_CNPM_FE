<template>
  <div v-if="isLoading">
    <a-spin>
      <a-icon slot="indicator" type="loading" style="font-size: 24px" spin/>
    </a-spin>
    <a-spin :indicator="indicator"/>
  </div>
</template>
<script>
export default {
  props: {
    isLoading: Boolean
  },
  data () {
    return {
      indicator: <a-icon type="loading" style="font-size: 24px" spin/>
    }
  }
}
</script>
