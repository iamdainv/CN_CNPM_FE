<template>
  <div class="row-lbr sm-gutter list-product">
    <product-item v-for="(product, index) in listProduct" :key="index"></product-item>
  </div>
</template>

<script>
import ProductItem from '@/views/client/user/products_by_category/product_item'
export default {
  name: 'ListProduct',
  components: {
    ProductItem
  },
  data () {
    return {
      listProduct: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    }
  }
}
</script>

<style>

</style>
