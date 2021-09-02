<template>
  <div class="app__container">
    <div class="grid wide">
      <div class="row-lbr sm-gutter app__content">
        <div class="col-lbr l-2 m-0 c-0-lbr">
          <!-- list category pc -->
          <list-category></list-category>
        </div>

        <div class="col-lbr l-10 m-12 c-12-lbr">
          <!-- filter products -->
          <filter-products></filter-products>
          <div class="home-produce">
            <!-- category mobile -->
            <category-mobile></category-mobile>
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
import ListCategory from '@/views/user/products_by_category/list_category'
import FilterProducts from '@/views/user/products_by_category/filter_products'
import CategoryMobile from '@/components/user/category_mobile'
import ListProduct from '@/views/user/products_by_category/list_product'
import Pagination from '@/views/user/products_by_category/pagination'
export default {
  name: 'products-by-category',
  components: {
    ListCategory,
    FilterProducts,
    CategoryMobile,
    ListProduct,
    Pagination
  }
}
</script>

<style>

</style>
