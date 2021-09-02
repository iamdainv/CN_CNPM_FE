<template>
    <div class="cart-list">
        <cart-shop
          v-for="(item, index) in listBillBySeller"
          :key="index"
          :index="index"
          :idSeller="item.idSeller"
          :seller="item.seller"
          :bills="item.bills"
          v-on:changeQuantityProduct="handleChangeQuantityProduct"
          v-on:productChecked="handleProductChecked"
          v-on:cartShopChecked="handleCartShopChecked"
        >
        </cart-shop>
    </div>
</template>

<script>
import CartShop from '@/views/user/cart/cart_shop'
export default {
  name: 'cart-list',
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
    handleChangeQuantityProduct ({ idSeller, indexBill, n }) {
      this.$emit('changeQuantityProduct', { idSeller, indexBill, n })
    },
    handleProductChecked ({ idSeller, indexBill }) {
      this.$emit('productChecked', { idSeller, indexBill })
    },
    handleCartShopChecked ({ idSeller, checkto }) {
      this.$emit('cartShopChecked', { idSeller, checkto })
    }
  }
}
</script>

<style>

</style>
