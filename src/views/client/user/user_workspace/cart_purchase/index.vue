<template>
  <div class="cart__content">
    <div v-if="listProduct.length === 0" class="purchase-empty-order__container purchase-list-page__empty-page-wrapper" style="height: 100%">
      <div class="purchase-empty-order__icon"></div>
      <div class="purchase-empty-order__text">Chưa có đơn hàng</div>
    </div>
    <div v-else class="cart-list">
      <cart-purchase-item
        v-for="(product, index) in listProduct"
        :key="index"
        :product="product"></cart-purchase-item>
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
    }
}
</script>

<style>
    .cart__content{
        height : 100%;
    }
</style>
