<template>
  <div class="header__cart">
    <div class="header__cart-wrap">
      <i class="fas fa-shopping-cart header__cart-icon"></i>
      <span class="header__cart-notify">{{ listProductInCart.length }}</span>
      <!-- No cart: header__cart-list--no-cart -->
      <div class="header__cart-list" :class="listProductInCart.length === 0 ? 'header__cart-list--no-cart' : ''">
        <img src="@/assets/img/no-cart.png" alt="No cart" class="header__cart--no-cart-img" />
        <span class="header__cart-list--no-cart-msg">Chưa có sản phẩm</span>
        <h4 class="header__cart-heading">Sản phẩm đã thêm</h4>
        <ul class="header__cart-list-item">
          <li class="header__cart-item" v-for="(productInfo, index) in listProductInCart" :key="index">
            <img :src="productInfo.product.img" alt="img" class="header__cart-img" />
            <div class="header__cart-item-info">
              <div class="header__cart-item-head">
                <h5 class="header__cart-item-name">
                  {{ productInfo.product.name }}
                </h5>
                <div class="header__cart-item-price-wrap">
                  <span class="header__cart-item-price"> {{ formatPriceToVND(calcNewPrice(productInfo.product.price, productInfo.product.discount)) }}</span>
                  <span class="header__cart-item-multiply">x</span>
                  <span class="header__cart-item-qnt">{{ productInfo.quantity }}</span>
                </div>
              </div>

              <div class="header__cart-item-body">
                <span class="header__cart-item-description">
                  Phân loại: Bạc
                </span>
                <span class="header__cart-item-remove" @click="handleDeleteProductInCart(productInfo.product.id)">Xóa</span>
              </div>
            </div>
          </li>
        </ul>
        <div class="header__cart-view-cart btn btn--primary" @click="gotoCart">Xem giỏ hàng</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'CartHeader',
  computed: {
    listProductInCart () {
      return this.$store.getters.listProductInCart
    }
  },
  watch: {
    listProductInCart (newList, oldList) {
    }
  },
  created () {
    this.$store.dispatch('GetListProductInCart')
  },
  methods: {
    ...mapActions(['GetListProductInCart', 'RemoveProductInCart']),
    gotoCart () {
      if (this.$route.name !== 'cart') {
        this.$router.push({ name: 'cart' })
      }
    },
    calcNewPrice (price, discount) {
      return price - Math.floor((discount / 100) * price)
    },
    handleDeleteProductInCart (id) {
      this.$store.dispatch('RemoveProductInCart', { id: id })
    }
  }
}
</script>

<style></style>
