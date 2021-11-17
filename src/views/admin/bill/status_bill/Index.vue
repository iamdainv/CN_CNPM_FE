<template>
  <div class="cart__content">
    <div class="cart-list">
      <status-bill-detail
        v-for="(product, index) in listBillDetail"
        :key="index"
        :product="product"
        @cancelPurchase="cancelPurchase"
      ></status-bill-detail>
    </div>
  </div>
</template>

<script>
import StatusBillDetail from '@/views/admin/bill/status_bill_detail/Index'
export default {
  name: 'Index',
  components: {
    StatusBillDetail
  },
  props: {
    listBillDetail: {
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
