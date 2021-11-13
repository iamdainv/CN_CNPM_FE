<template>
  <div class="col-lbr l-2-4 m-4 c-6-lbr">
    <div class="home-produce-item" @click="gotoDetail">
      <div
        class="home-produce-item__img"
        :style="'background-image: url(' + product.image + ');'"></div>
      <h4 class="home-produce-item__name">{{ product.name }}</h4>
      <div class="home-produce-item__price">
        <span class="home-produce-item__price-old">{{ formatPriceToVND(product.price) }}</span>
        <span class="home-produce-item__price-new">{{ formatPriceToVND(newPrice) }}</span>
      </div>
      <div class="home-produce-item__action">
        <span class="home-produce-item__like home-produce-item__liked">
          <i class="home-produce-item__like-icon--empty far fa-heart"></i>
          <i class="home-produce-item__like-icon--fill fas fa-heart"></i>
        </span>

        <div class="home-produce-item__rating">
          <i class="home-produce-item__star-gold fas fa-star" v-for="index in Number.parseInt(product.numberOfStar)" :key="index"></i>
          <i class="fas fa-star" v-for="index in (5 - Number.parseInt(product.numberOfStar))" :key="product.numberOfStar + index"></i>
        </div>
        <span class="home-produce-item__sold">{{ product.selled }} đã bán</span>
      </div>
      <div class="home-produce-item__origin">
        <span class="home-produce-item__origin-brand">Whoo</span>
        <span class="home-produce-item__origin-name">Nhật bản</span>
      </div>
      <div class="home-produce-item__favourite">
        <i class="fas fa-check"></i>
        <span>Yêu thích</span>
      </div>
      <div class="home-produce-item__sale-off" v-if="product.discount > 0">
        <span class="home-produce-item__sale-off-percent">{{ product.discount }}%</span>
        <span class="home-produce-item__sale-off__sale-off-label">Giảm</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductItem',
  props: {
    product: {
      required: true,
      type: Object
    }
  },
  data () {
    return {
      newPrice: 0
    }
  },
  watch: {
    product () {
      this.newPrice = Math.floor(this.product.price - (this.product.discount / 100) * this.product.price)
    }
  },
  created () {
    this.newPrice = Math.floor(this.product.price - (this.product.discount / 100) * this.product.price)
  },
  methods: {
    gotoDetail () {
      console.log(this.product.id)
      this.$router.push({ name: 'product-detail', params: { productId: this.product.id } })
    }
  }
}
</script>

<style>

</style>
