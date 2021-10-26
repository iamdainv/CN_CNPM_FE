<template>
  <div class="cart__content">

    <div class="cart-list">
      <cart-purchase-item
        v-for="(product, index) in listProduct"
        :key="index"
        :product="product"
        @cancelPurchase="cancelPurchase"
      ></cart-purchase-item>
    </div>
  </div>
</template>

<script>
import CartPurchaseItem from '@/views/client/user/user_workspace/cart_purchase_item'
export default {
    name: 'CartPurchase',
    components: {
        CartPurchaseItem
    },
    props: {
        listProduct: {
            type: Array,
            required: true
        }
    },
    methods: {
      cancelPurchase (purchaseId) {
        this.$emit('cancelPurchase', purchaseId)
      }
    }
}
</script>

<style>
    .cart__content{
        height : 100%;
    }
</style>
