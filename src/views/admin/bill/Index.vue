<template>
  <div>
    <breadcrumb/>
    <div class="tab">
      <button class="purchase-list-page__tab" :class="indexActive===0?' active':''" @click="changeIndexActive(0)" id="allbill" data-purchase="0">Tất cả</button>
      <button class="purchase-list-page__tab" :class="indexActive===2?' active':''" @click="changeIndexActive(2)" id="billConfirmation" data-purchase="2">Chờ xác nhận</button>
      <button class="purchase-list-page__tab" :class="indexActive===3?' active':''" @click="changeIndexActive(3)" id="billWaitTake" data-purchase="3">Chờ lấy hàng</button>
      <button class="purchase-list-page__tab" :class="indexActive===4?' active':''" @click="changeIndexActive(4)" id="billDelivering" data-purchase="4">Đang giao</button>
      <button class="purchase-list-page__tab" :class="indexActive===5?' active':''" @click="changeIndexActive(5)" id="billDelivered" data-purchase="5">Đã giao</button>
      <button class="purchase-list-page__tab" :class="indexActive===6?' active':''" @click="changeIndexActive(6)" id="billCanceled" data-purchase="6">Đã hủy</button>
    </div>
    <div class="spinner" v-if="loading">
      <div class="bounce1"></div>
      <div class="bounce2"></div>
      <div class="bounce3"></div>
    </div>

    <!-- <div class="purchase-empty-order__container purchase-list-page__empty-page-wrapper">
        <div class="purchase-empty-order__icon"></div>
        <div class="purchase-empty-order__text">Chưa có đơn hàng</div>
    </div> -->
    <template v-else>
      <div class="purchase-order__container">
        <status-bill :listBillDetail="listBill" @cancelPurchase="cancelPurchase"></status-bill>
      </div>
    </template>
    <div v-if="listBill.length === 0" class="purchase-empty-order__container purchase-list-page__empty-page-wrapper" >
      <div class="purchase-empty-order__icon"></div>
      <div class="purchase-empty-order__text">Chưa có đơn hàng</div>
    </div>
  </div>
</template>

<script>
import { PurchaseType } from '@/const/app.const'
import { getPurchaseListByAdmin } from '@/api/user/purchase'
import StatusBill from '@/views/admin/bill/status_bill/Index'
const { updatePurchaseStatusOfUser } = require('@/api/user/purchase')

export default {
  name: 'Index',
  components: {
    StatusBill
  },
  data () {
    return {
      indexActive: 0,
      loading: true,
      purchaseType: PurchaseType.ALL,
      listBill: []
    }
  },
  methods: {
    changeIndexActive (indexActive) {
      this.indexActive = indexActive
      this.loading = true
      this.getListBillDetail(indexActive)
    },
    cancelPurchase (idPurchase) {
      updatePurchaseStatusOfUser(idPurchase, PurchaseType.CANCELED).then(response => {
        if (response.status === 200) { this.getListPurchase() }
      })
    },
    getListBillDetail (indexActive) {
      const params = {
        status: indexActive
      }
      getPurchaseListByAdmin(params).then(res => {
        this.listBill = res.data.data[0].bills
      })
    }
  },
  mounted () {
    this.getListBillDetail(this.indexActive)
  }
}
</script>

<style>

</style>
