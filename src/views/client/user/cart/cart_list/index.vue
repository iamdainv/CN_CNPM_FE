<template>
  <div class="cart-list">
    <cart-shop
      v-for="(item, index) in listBillBySeller"
      :key="index"
      :index="index"
      :idSeller="item.idSeller"
      :seller="item.seller"
      :bills="item.bills"
      @productChecked="handleProductChecked"
      @cartShopChecked="handleCartShopChecked"
    >
    </cart-shop>
  </div>
</template>

<script>
import CartShop from '@/views/client/user/cart/cart_shop'
export default {
  name: 'CartList',
  props: {
    listBillBySeller: {
      type: Array,
      required: true
    }
  },
  components: {
    CartShop
  },
  methods: {
    handleProductChecked ({ idBill }) {
      this.$emit('productChecked', { idBill })
    },
    handleCartShopChecked ({ idSeller, checkto }) {
      this.$emit('cartShopChecked', { idSeller, checkto })
    }
  }
}
</script>

<style>

</style>
