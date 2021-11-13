<template>
  <a-pagination
    v-model="pageNum"
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
    },
    currentPage: {
      required: true,
      type: Number
    }
  },
  data () {
    return {
      pageNum: 1,
      pageSize: 20,
      showSizeChange: true,
      pageSizeOptions: ['20', '40', '60']
    }
  },
  watch: {
    pageNum (current) {
      if (current !== this.currentPage) {
        this.$emit('getByPagination', { page: current, limit: this.pageSize })
      }
    },
    currentPage () {
      this.pageNum = this.currentPage
    }
  },
  methods: {
    onShowSizeChange (current, pageSize) {
      this.$emit('getByPagination', { page: 1, limit: pageSize })
    }
  }
}
</script>

<style>

</style>
