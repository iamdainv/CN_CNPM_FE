<template>
  <div class="app__container">
    <div class="grid wide">
      <div class="row-lbr sm-gutter app__content">
        <div class="col-lbr l-2 m-0 c-0-lbr">
          <!-- list category pc -->
          <list-category :listCategory="listCategory" @getByCategoryId="getByCategoryId"></list-category>
        </div>

        <div class="col-lbr l-10 m-12 c-12-lbr">
          <!-- filter products -->
          <filter-products
            @getBySortType="getBySortType"
            @getByPrice="getByPrice"
            @getByPagination="getByPagination"
            :totalPage="totalPage"
            :page="param.page"
            :sortType="sortType"
            :currentSortType="this.param.sortType"
            :sortPrice="sortPrice"
            :currentSortPrice="this.param.sortPrice"></filter-products>
          <div class="home-produce">
            <!-- category mobile -->
            <category-mobile :listCategory="listCategory" @getByCategoryId="getByCategoryId"></category-mobile>
            <!-- list product -->
            <list-product :listProduct="listProduct"></list-product>
          </div>

          <!-- pagination -->
          <pagination @getByPagination="getByPagination" :total="total"></pagination>
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
import { getListProductByCategory } from '@/api/user/productsByCategory'
const sortPrice = {
  asc: 0,
  desc: 1
}
const sortType = {
  latest: 0,
  popular: 1,
  hotSelling: 2
}
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
      sortType,
      sortPrice,
      param: {
        categoryId: undefined,
        page: 1,
        limit: 10,
        sortPrice: sortPrice.asc,
        sortType: sortType.latest
      }
    }
  },
  created () {
    this.param.categoryId = this.$route.params.categoryId
    this.getListCategory()
    this.getListProductByCategory()
  },
  updated () {
    this.param.categoryId = this.$route.params.categoryId
  },
  methods: {
    getListCategory () {
      getListCategory().then(res => {
        this.listCategory = res.data
      })
    },
    getListProductByCategory () {
      // const param = {
      //   idCagegory: this.param.idCategory,
      //   currentPage: this.param.currentPage,
      //   price: this.param.price,
      //   sortType: this.param.sortType
      // }
      // getListProductByCategory(param).then(rs => {
      //   this.listProduct = rs.data.listProduct
      //   this.total = Number.parseInt(rs.data.total)
      //   this.totalPage = Number.parseInt(rs.data.totalPage)
      // }).catch(err => {
      //   console.log(err)
      // })
      const param = {
        id_category: this.param.categoryId,
        page: this.param.page,
        limit: this.param.limit
      }
      getListProductByCategory(param).then(rs => {
        this.listProduct = rs.data
        this.total = rs.data.length
        this.totalPage = Math.ceil(this.listProduct.length / this.param.limit)
      }).catch(err => {
        console.log(err)
      })
    },
    getByCategoryId (idCategory) {
      this.param.categoryId = idCategory
      this.getListProductByCategory()
    },
    getBySortType (sortType) {
      this.param.sortType = sortType
      this.getListProductByCategory()
    },
    getByPrice (sortPrice) {
      this.param.sortPrice = sortPrice
      this.getListProductByCategory()
    },
    getByPagination ({ page, limit }) {
      this.param.page = page
      this.param.limit = limit !== undefined ? limit : this.param.limit
      this.getListProductByCategory()
    }
  }
}
</script>

<style>

</style>
