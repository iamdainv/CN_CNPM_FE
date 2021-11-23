<template>
  <div class="cart__content">
    <div class="cart-list">
      <status-bill-detail
        v-for="(product, index) in listBillDetail"
        :key="index"
        :product="product"
        @acceptPurchase="acceptPurchase"
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
    acceptPurchase (purchaseId) {
      this.$emit('acceptPurchase', purchaseId)
    }
  }
}
</script>

<style>
.cart__content{
  height : 100%;
}
</style>
