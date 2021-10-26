<template>
  <a-pagination
    v-model="currentPage"
    show-size-changer
    :page-size.sync="pageSize"
    :total="total"
    @showSizeChange="onShowSizeChange"
    class="pagination produce-pagination"/>
  <!-- <ul class="pagination produce-pagination">
    <li class="pagination-item">
      <a href="#" class="pagination-item__link">
        <i class="pagination-item__icon fas fa-angle-left"></i>
      </a>
    </li>
    <li class="pagination-item pagination-item-active">
      <a href="#" class="pagination-item__link">1</a>
    </li>
    <li class="pagination-item">
      <a href="#" class="pagination-item__link">2</a>
    </li>
    <li class="pagination-item">
      <a href="#" class="pagination-item__link">3</a>
    </li>
    <li class="pagination-item">
      <a href="#" class="pagination-item__link">4</a>
    </li>
    <li class="pagination-item">
      <a href="#" class="pagination-item__link">...</a>
    </li>
    <li class="pagination-item">
      <a href="#" class="pagination-item__link">14</a>
    </li>
    <li class="pagination-item">
      <a href="#" class="pagination-item__link">
        <i class="pagination-item__icon fas fa-angle-right"></i>
      </a>
    </li>
  </ul> -->
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
      pageSize: 10
    }
  },
  created () {
    console.log('total: ', this.total)
  },
  watch: {
    currentPage (val) {
      this.$emit('getByPagination', { page: val, limit: this.pageSize })
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
