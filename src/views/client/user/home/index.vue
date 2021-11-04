<template>
  <div class="app__container">
    <div class="grid wide">
      <div class="row sm-gutter app__content">
        <div class="col-lbr l-12 m-12 c-12">
          <div class="home-produce">
            <!-- category mobile -->
            <category-mobile :listCategory="listCategory"></category-mobile>
            <!-- home carousel -->
            <home-carousel style="margin-bottom: 18px"></home-carousel>
            <!-- category home pc -->
            <category-home :listCategory="listCategory"></category-home>
            <!-- list product -->
            <div class="row-lbr sm-gutter list-product" style="padding-bottom: 40px; margin-top: 20px; min-height: 50px">
              <a-spin size="large" :spinning="loadingListProduct" style="width: 100%"></a-spin>
              <product-item v-for="(product, index) in listProduct" :key="index" :product="product"></product-item>
            </div>
            <button class="btn btn--primary btn-watch-more-product" v-if="visiblePagination === false" @click="handleWatchMore">Xem thêm</button>
            <pagination
              v-else
              :total="pagination.total"
              @getByPagination="getByPagination"
            ></pagination>
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
import Pagination from '@/components/user/pagination'
import { getListProduct } from '@/api/user/product'
import { getListCategoryParent } from '@/api/user/category'
export default {
  name: 'Home',
  components: {
    HomeCarousel,
    CategoryMobile,
    CategoryHome,
    ProductItem,
    Pagination
  },
  data () {
    return {
      listProduct: [],
      listCategory: [],
      visiblePagination: false,
      loadingListProduct: false,
      pagination: {
        current: 1,
        total: 0,
        pageSize: 20
      }
    }
  },
  created () {
    this.getListCategory()
    this.getListProduct()
  },
  methods: {
    getListProduct () {
      const params = {
        pageNum: this.pagination.current,
        pageSize: this.pagination.pageSize
      }
      this.loadingListProduct = true
      this.listProduct = []
      getListProduct(params).then(res => {
        this.listProduct = res.data.data.list ? res.data.data.list : []
        this.pagination.total = res.data.data.total ? res.data.data.total : 0
      }).catch(err => {
        this.$error({
          content: err
        })
      }).finally(() => {
        this.loadingListProduct = false
      })
    },
    getListCategory () {
      getListCategoryParent().then(res => {
        this.listCategory = res.data.data ? res.data.data : []
      }).catch(err => {
        this.$error({
          content: err
        })
      })
    },
    getByPagination ({ page, limit }) {
      this.pagination.current = page
      this.pagination.pageSize = limit !== undefined ? limit : this.pagination.pageSize
      this.getListProduct()
    },
    handleWatchMore () {
      this.visiblePagination = true
    }
  }
}
</script>

<style>
.home-produce {
  margin-bottom: 20px;
}
.btn-watch-more-product {
  display: block;
  margin: 0 auto !important;
}
</style>
