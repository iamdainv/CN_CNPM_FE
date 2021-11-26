<template>
  <div class="cart__content">
    <div class="cart-list">
      <status-bill-detail
        v-for="(bill, index) in listBillDetail"
        :key="index"
        :bill="bill"
        @acceptPurchase="acceptPurchase"
        @acceptDelivery="acceptDelivery"
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
    acceptPurchase (billId) {
      this.$emit('acceptPurchase', billId)
    },
    acceptDelivery (billId) {
      this.$emit('acceptDelivery', billId)
    }
  }
}
</script>

<style>
.cart__content{
  height : 100%;
}
</style>
