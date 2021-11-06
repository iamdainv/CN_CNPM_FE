<template>
  <div class="container app__container">
    <div class="row product">
      <div class="col col-lg-5 col-md-5 col-sm-12">
        <!-- depicted product -->
        <depicted-product :images="product.depicted" :mainImageProduct="product.productDetail.image"></depicted-product>
      </div>

      <div class="col col-lg-7 col-md-7 col-sm-12">
        <!-- sale product -->
        <sale-product></sale-product>
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
      <comment :isBought="isBought" :comments="comments"></comment>
    </div>
  </div>
</template>

<script>
import DepictedProduct from '@/views/client/user/product_detail/depicted_product'
import SaleProduct from '@/views/client/user/product_detail/sale_product'
import DetailProduct from '@/views/client/user/product_detail/detail_product'
import Comment from '@/views/client/user/product_detail/comment'
import { getProductById } from '@/api/user/product'
import { getListCommentOfProduct } from '@/api/user/comment'
export default {
  name: 'ProductDetail',
  components: {
    DepictedProduct,
    SaleProduct,
    DetailProduct,
    Comment
  },
  data () {
    return {
        comment: [],
        product: {
          depicted: [],
          productDetail: {}
        },
      isBought: true,
      comments: []
    }
  },
  mounted () {
    const { slugWithId } = this.$route.params
    const params = {
      productId: this.getIdProductFromSlug(slugWithId)
    }
      getProductById(params).then(response => {
        const { data } = response
        this.product.depicted = data.depicted.images
        this.product.productDetail = data.product
        getListCommentOfProduct(data.product.id, 0, 20).then(response => {
          this.comments = response.data
        })
      })
  },
  methods: {
    getIdProductFromSlug (slugWithId) {
      const arrayTruncate = slugWithId.split('.')
        return arrayTruncate[arrayTruncate.length - 1]
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
