<template>
  <div class="cart__content">

    <div class="cart-list">
      <div v-for="(bill, index) in listBills" :key="index">
        <cart-purchase-item
          v-for="(bill, idx) in bill.bills"
          :key="idx"
          :bill="bill"
          @purchaseAction="purchaseAction"
        ></cart-purchase-item>
      </div>
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
      purchaseAction (bill, callback) {
        this.$emit('purchaseAction', bill, callback)
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
