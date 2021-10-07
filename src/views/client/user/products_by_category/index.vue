<template>
  <div class="app__container">
    <div class="grid wide">
      <div class="row-lbr sm-gutter app__content">
        <div class="col-lbr l-2 m-0 c-0-lbr">
          <!-- list category pc -->
          <list-category :listCategory="listCategory"></list-category>
        </div>

        <div class="col-lbr l-10 m-12 c-12-lbr">
          <!-- filter products -->
          <filter-products></filter-products>
          <div class="home-produce">
            <!-- category mobile -->
            <category-mobile :listCategory="listCategory"></category-mobile>
            <!-- list product -->
            <list-product></list-product>
          </div>

          <!-- pagination -->
          <pagination></pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ListCategory from '@/views/client/user/products_by_category/list_category'
import FilterProducts from '@/views/client/user/products_by_category/filter_products'
import CategoryMobile from '@/components/user/category_mobile'
import ListProduct from '@/views/client/user/products_by_category/list_product'
import Pagination from '@/views/client/user/products_by_category/pagination'
import { getListCategory } from '@/api/user/category'
export default {
  name: 'ProductsByCategory',
  components: {
    ListCategory,
    FilterProducts,
    CategoryMobile,
    ListProduct,
    Pagination
  },
  data () {
    return {
      listCategory: []
    }
  },
  created () {
    this.getListCategory()
  },
  methods: {
    getListCategory () {
      getListCategory().then(res => {
        this.listCategory = res.data
      })
    }
  }
}
</script>

<style>

</style>
