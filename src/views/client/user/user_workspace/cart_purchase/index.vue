<template>
  <div class="cart__content">

    <div class="cart-list">
      <cart-purchase-item
        v-for="(bill, index) in listBills"
        :key="index"
        :bill="bill"
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
      listBills: {
            type: Array,
            require: false
        }
    },
    methods: {
      cancelPurchase (purchaseId) {
        this.$emit('cancelPurchase', purchaseId)
      }
    },
  watch: {

  }
}
</script>

<style>
    .cart__content{
        height : 100%;
    }
</style>
