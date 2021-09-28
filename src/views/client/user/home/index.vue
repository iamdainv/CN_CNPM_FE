<template>
  <div class="app__container">
    <div class="grid wide">
      <div class="row sm-gutter app__content">
        <div class="col-lbr l-12 m-12 c-12">
          <div class="home-produce">
            <!-- category mobile -->
            <category-mobile></category-mobile>
            <!-- home carousel -->
            <home-carousel style='margin-bottom: 18px'></home-carousel>
            <!-- category home pc -->
            <category-home :listCategory="listCategory"></category-home>
            <!-- list product -->
            <div class="row-lbr sm-gutter list-product" style="padding-bottom: 40px; margin-top: 20px">
              <product-item v-for="(product, index) in listProduct" :key="index"></product-item>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HomeCarousel from '@/components/user/home_carousel'
import CategoryMobile from '@/components/user/category_mobile'
import CategoryHome from '@/components/user/category_home_pc'
import ProductItem from '@/views/client/user/home/product_item'
export default {
  name: 'Home',
  components: {
    HomeCarousel,
    CategoryMobile,
    CategoryHome,
    ProductItem
  },
  data () {
    return {
      listProduct: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      listCategory: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
    }
  }
}
</script>

<style>

</style>
