<template>
  <div>
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

    <template v-else>
      <div class="purchase-order__container">
        <cart-purchase :listBills="listBills" @purchaseAction="purchaseAction"></cart-purchase>
      </div>
    </template>
    <div v-if="listBills.length === 0" class="purchase-empty-order__container purchase-list-page__empty-page-wrapper" >
      <div class="purchase-empty-order__icon"></div>
      <div class="purchase-empty-order__text">Chưa có đơn hàng</div>
    </div>
  </div>
</template>

<script>
import CartPurchase from '@/views/client/user/user_workspace/cart_purchase'
import { PurchaseType } from '@/const/app.const'
import { getPurchaseListByUser } from '@/api/user/purchase'

const { updatePurchaseStatusOfUser } = require('@/api/user/purchase')

export default {
    name: 'Purchase',
    components: {
        CartPurchase
    },
    data () {
        return {
          indexActive: 0,
            loading: true,
            purchaseType: PurchaseType.ALL,
          listBills: []
        }
    },
    methods: {
        changeIndexActive (indexActive) {
            this.indexActive = indexActive
            this.purchaseType = indexActive
            this.loading = true
            this.getListPurchase()
        },
      purchaseAction (bill, callback) {
        updatePurchaseStatusOfUser(bill.id, bill.actionType).then(response => {
          if (response.status === 200) { callback ? callback() : this.getListPurchase() }
        })
      },

      getListPurchase () {
        getPurchaseListByUser(this.purchaseType).then(res => {
          const { status, data } = res.data
          if (status === 200) {
            this.listBills = Array.isArray(data) ? data : []
          } else {
            this.listBills = []
          }
          this.loading = false
        })
      }
    },
    mounted () {
      this.getListPurchase()
    }
}
</script>

<style>

</style>
