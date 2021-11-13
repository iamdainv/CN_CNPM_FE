<template>
  <div class="app__container" style="padding-bottom: 20px;">
    <div class="grid wide">
      <div class="row-lbr sm-gutter app__content">
        <div class="col-lbr l-2 m-0 c-0-lbr">
          <!-- list category pc -->
          <list-category :listCategory="listCategory" @getByCategoryId="getByCategoryId"></list-category>
        </div>

        <div class="col-lbr l-10 m-12 c-12-lbr">
          <!-- filter products -->
          <filter-products
            @sortProducts="sortProducts"
            @getByPagination="getByPagination"
            :totalPage="totalPage"
            :currentPage="params.pageNum"
            :sortType="sortType"
            :currentSortType="params.sortType"
            :orderType="orderType"
            :currentOrderType="params.orderType"></filter-products>
          <div class="home-produce">
            <!-- category mobile -->
            <category-mobile :listCategory="listCategory" @getByCategoryId="getByCategoryId"></category-mobile>
            <!-- list product -->
            <a-spin v-if="loadingListProduct" :spinning="loadingListProduct" size="large" style="width: 100%; height: 100px; padding: 30px 50px; margin: 20px 0;">
            </a-spin>
            <list-product :listProduct="listProduct"></list-product>
          </div>

          <!-- pagination -->
          <pagination @getByPagination="getByPagination" :total="total" :currentPage="params.pageNum" style="margin: 30px 0px;"></pagination>
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
import Pagination from '@/components/user/pagination'
import { getListCategoryParent } from '@/api/user/category'
import { getListProductByCategory } from '@/api/user/productsByCategory'
import { SortType, OrderType } from '@/const/app.const.js'
import { bus } from '@/main.js'
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
      listCategory: [],
      listProduct: [],
      total: 0,
      totalPage: 0,
      sortType: { ...SortType },
      orderType: { ...OrderType },
      loadingListProduct: false,
      params: {
        idCategory: 1,
        keyword: '',
        pageNum: 1,
        pageSize: 20,
        sortType: SortType.NEWEST,
        orderType: OrderType.DESC
      }
    }
  },
  created () {
    this.params.idCategory = this.$route.params.categoryId
    this.getListCategory()
    this.getListProductByCategory()
    bus.$on('searchProductsCategoryByKeyword', this.searchProductsCategoryByKeyword)
  },
  destroyed () {
    bus.$off('searchProductsCategoryByKeyword', this.searchProductsCategoryByKeyword)
  },
  updated () {
    this.params.idCategory = this.$route.params.categoryId
  },
  methods: {
    getListCategory () {
      getListCategoryParent().then(res => {
        this.listCategory = res.data.data ? res.data.data : []
      }).catch(err => {
        this.$error({ content: err })
      })
    },
    getListProductByCategory () {
      const param = {
        idCategory: this.params.idCategory,
        keyword: this.params.keyword,
        pageNum: this.params.pageNum,
        pageSize: this.params.pageSize,
        sortBy: this.params.sortType,
        order: this.params.orderType
      }
      this.listProduct = []
      this.total = 0
      this.loadingListProduct = true
      getListProductByCategory(param).then(rs => {
        this.listProduct = rs.data.data.list ? rs.data.data.list : []
        this.total = rs.data.data.total ? Number.parseInt(rs.data.data.total) : 0
        this.totalPage = rs.data.data.pages ? Number.parseInt(rs.data.data.pages) : 1
      }).catch(err => {
        console.log(err)
      }).finally(() => {
        this.loadingListProduct = false
      })
    },
    getByCategoryId (idCategory) {
      this.params.idCategory = idCategory
      this.params.pageNum = 1
      this.getListProductByCategory()
    },
    searchProductsCategoryByKeyword (keyword) {
      this.params.keyword = keyword
      this.params.pageNum = 1
      console.log('keyword: ', this.params.keyword)
      this.getListProductByCategory()
    },
    sortProducts ({ sortType, orderType = OrderType.DESC }) {
      this.params.sortType = sortType
      this.params.orderType = orderType
      this.getListProductByCategory()
    },
    getByPagination ({ page, limit }) {
      this.params.pageNum = !page === false ? page : 1
      this.params.pageSize = limit !== undefined ? limit : this.params.pageSize
      this.getListProductByCategory()
    }
  }
}
</script>

<style>

</style>
