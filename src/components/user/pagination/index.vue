<template>
  <a-pagination
    v-model="currentPage"
    :page-size.sync="pageSize"
    :total="total"
    show-size-changer
    :page-size-options="pageSizeOptions"
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
      pageSize: 20,
      showSizeChange: true,
      pageSizeOptions: ['20', '40', '60']
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
