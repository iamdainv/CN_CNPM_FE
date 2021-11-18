<template>

  <div class="container app__container">
    <a-modal
      title="Lỗi"
      :visible="visibleModalProductNotFound"
      @ok="handleProductNotFound"
    >
      <p> Sản phẩm này không tồn tại </p>
    </a-modal>
    <template v-if="product.productDetail.id">
      <div class="row product">
        <div class="col col-lg-5 col-md-5 col-sm-12">
          <!-- depicted product -->
          <depicted-product
            :images="product.depicted"
            :mainImageProduct="product.productDetail.image"
            :productName="product.productDetail.name">

          </depicted-product>
        </div>

        <div class="col col-lg-7 col-md-7 col-sm-12">
          <!-- sale product -->
          <sale-product :product="product.productDetail"></sale-product>
          <!-- guarantee product -->
          <a class="guarantee-product" href="#">
            <div>
              <img
                src="@/assets/img/GuaranteeProduct.png"
                alt="guarantee product"
                class="guarantee-product-img">
              <span class="guarantee-product-title">Shopee Đảm Bảo</span>
            </div>
            <span class="guarantee-product-desc">3 Ngày Trả Hàng / Hoàn Tiền</span>
          </a>
        </div>
      </div>
      <div class=" product mt-5 p-5">
        <!-- detail product -->
        <detail-product :productDetail="product.productDetail"></detail-product>
      </div>
      <div class=" product mt-5 p-5">
        <!-- comment -->
        <comment
          :isBought="product.productDetail.userCanComment"
          :comments="comments"
          :isLoading="loadingComment"
          :totalComment="totalComment"
          @getByPagination="getByPagination"
          @onSubmitCreateComment="onSubmitCreateComment"
        ></comment>
        <a-spin size="large" :spinning="loadingComment" style="width: 100%"></a-spin>
        <pagination
          :total="totalComment"
          :show-size="false"
          :page-size-prop="5"
          :currentPage="pagination.pageNum"
          @getByPagination="getByPagination"
        ></pagination>
      </div>
    </template>
    <template v-else>
      <div style="height: 100vh">  </div>
    </template>
  </div>
</template>

<script>
import DepictedProduct from '@/views/client/user/product_detail/depicted_product'
import SaleProduct from '@/views/client/user/product_detail/sale_product'
import DetailProduct from '@/views/client/user/product_detail/detail_product'
import Comment from '@/views/client/user/product_detail/comment'
import { getProductById } from '@/api/user/product'
import { getListCommentOfProduct, createNewComment } from '@/api/user/comment'
import Pagination from '@/components/user/pagination'
export default {
  name: 'ProductDetail',
  components: {
    DepictedProduct,
    SaleProduct,
    DetailProduct,
    Comment,
    Pagination
  },
  data () {
    return {
        comment: [],
        product: {
          depicted: [],
          productDetail: {}
        },
      pagination: {
        pageNum: 1,
        pageSize: 5
      },
      loadingComment: true,
      comments: [],
      totalComment: 0,
      visibleModalProductNotFound: false
    }
  },
  mounted () {
    const { slugWithId } = this.$route.params
      getProductById(this.getIdProductFromSlug(slugWithId)).then(response => {
        const { data, status } = response.data

        if (status === 200) {
          this.product.depicted = [ {
            id: 0,
            id_product: data.id,
            path: data.image
          }, ...data.images]
          this.product.productDetail = data
          console.log(data)
          this.getListComment(data.id)
        } else if (status === 404) {
          this.visibleModalProductNotFound = true
        }
      })
  },
  methods: {
    getIdProductFromSlug (slugWithId) {
      const arrayTruncate = slugWithId.split('.')
        return arrayTruncate[arrayTruncate.length - 1]
    },
    handleProductNotFound () {
      this.$router.push({ path: '/' })
    },
    getListComment: function (productId) {
      getListCommentOfProduct(productId, this.pagination.pageNum, this.pagination.pageSize).then(response => {
        const { list, total } = response.data.data
        this.comments = list
        this.totalComment = total
        this.loadingComment = false
      })
    },
    getByPagination ({ page, limit }) {
      this.pagination.pageNum = page
      this.pagination.pageSize = 5
      this.loadingComment = true
      this.comments = []
      this.getListComment(this.product.productDetail.id)
    },
    onSubmitCreateComment (commentText, listFileImage, star) {
      const formData = new FormData()

      const commentObj = {
        id_product: this.product.productDetail.id,
        comment: commentText,
        star
      }

      listFileImage.forEach(file => formData.append('files', file.fileImage))
      formData.append(
        'comment',
        new Blob([JSON.stringify(commentObj)], { type: 'application/json' })
      )

      createNewComment(formData).then(response => {
        this.comments.unshift(response.data.data)
      })
    }
  }
}
</script>

<style>
.product{
    padding: 15px 0;
    background-color: #fff;
    border-radius: 2px;
}

.guarantee-product {
    display: flex;
    align-items: center;
    padding: 25px 20px;
    font-size: 1.4rem;
    text-decoration: none;
    font-weight: 500;
    flex-wrap:wrap;
}

.guarantee-product:hover {
    text-decoration: none;
}

.guarantee-product-desc {
    color: rgb(0, 0, 0, 0.54);
}

.guarantee-product-img {
    width: 20px;
    height: 20px;
}

.guarantee-product-title {
    margin: 0 20px 0 5px;
    color: #222;
}

.title__name {
    font-size: 2rem;
    line-height: 2.4rem;
}

@media (max-width: 768px) {
    .product-option__select, .guarantee-product, .quantity-product {
        justify-content: space-around;
        margin-bottom: 8px;
    }
    .depicted-product__social {
        flex-wrap: wrap;
        justify-content:space-around;
    }
    .product-option__select-btn-color {
        margin-bottom: 8px;
    }
}
</style>
