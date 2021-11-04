<template>
  <a-pagination
    v-model="currentPage"
    show-size-changer
    :page-size.sync="pageSize"
    :total="total"
    @showSizeChange="onShowSizeChange"
    class="pagination produce-pagination"/>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    total: {
      required: true,
      type: Number
    }
  },
  data () {
    return {
      currentPage: 1,
      pageSize: 20
    }
  },
  created () {
    console.log('total: ', this.total)
  },
  watch: {
    currentPage (current) {
      this.$emit('getByPagination', { page: current, limit: this.pageSize })
    }
  },
  methods: {
    onShowSizeChange (current, pageSize) {
      this.$emit('getByPagination', { page: current, limit: pageSize })
    }
  }
}
</script>

<style>

</style>
