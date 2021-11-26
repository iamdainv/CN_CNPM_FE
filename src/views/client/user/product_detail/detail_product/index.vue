<template>
  <div>
    <div class="detail-product__information w-100">
      <div class="bg-blur detail-product__information w-100">
        <div class="title__name py-3 pl-3">Chi tiết sản phẩm</div>
      </div>
      <div class="content-detail-product__information py-3 pl-3">
        <div class="category_name f-14 p-3 d-flex">
          <label class="-w100 text-blur product-detail__name">Danh Mục</label>
          <Breadcrumb :breadcrumb="breadCrumbList"/>
        </div>
        <div class="origin f-14 p-3">
          <label class="-w100 text-blur product-detail__name">Xuất xứ</label>
          <span> USA </span>
        </div>
        <div class="quantity f-14 p-3">
          <label class="-w100 text-blur product-detail__name">Kho hàng</label>
          <span> {{ productDetail.quantity }} </span>
        </div>
        <div class="address f-14 p-3 ">
          <label class="-w100 text-blur product-detail__name">Gửi từ</label>
          <span> {{ productDetail.address }} </span>
        </div>
      </div>
    </div>
    <div class="description-product__information w-100">
      <div class="bg-blur detail-product__information w-100">
        <div class="title__name py-3 pl-3">Mô tả sản phẩm</div>
      </div>
      <div class="f-14 p-3 product-detail__description" v-html="productDetail.description" style="white-space: pre-wrap;">
      </div>
    </div>
  </div>
</template>

<script>
import Breadcrumb from '@/components/breadcrumb/Breadcrumb-user'
export default {
  name: 'DetailProduct',
  components: { Breadcrumb },
  props: {
    productDetail: Object
  },
  data () {
    return {
      breadCrumbList: []
    }
  },
  watch: {

  },
  mounted () {
    this.breadCrumbList = this.productDetail?.categories?.map(categoryItem => ({
      id: categoryItem.id,
      text: categoryItem.original_category_name
    })).reverse()
    this.breadCrumbList.unshift({
      text: 'Shobbe',
      routerName: '/'
    })
  }
}
</script>

<style>
.product-detail__name{
  width: 12%;
}
.product-detail__description{
  white-space: pre-wrap;
  color: rgba(0,0,0,.8);
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 3rem;
}
</style>
