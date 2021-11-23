<template>
  <div>
    <breadcrumb/>
    <div class="tab">
      <button class="purchase-list-page__tab" :class="indexActive===0?' active':''" @click="changeIndexActive(0)" id="allbill" data-purchase="0">Tất cả</button>
      <button class="purchase-list-page__tab" :class="indexActive===2?' active':''" @click="changeIndexActive(2)" id="billConfirmation" data-purchase="2">Chờ xác nhận</button>
      <button class="purchase-list-page__tab" :class="indexActive===3?' active':''" @click="changeIndexActive(3)" id="billWaitTake" data-purchase="3">Chờ lấy hàng</button>
      <button class="purchase-list-page__tab" :class="indexActive===4?' active':''" @click="changeIndexActive(4)" id="billDelivering" data-purchase="4">Đang giao</button>
      <button class="purchase-list-page__tab" :class="indexActive===5?' active':''" @click="changeIndexActive(5)" id="billDelivered" data-purchase="5">Đã giao</button>
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
        <status-bill :listBillDetail="this.listBill" @acceptPurchase="acceptPurchase" @acceptDelivery="acceptDelivery"></status-bill>
      </div>
    </template>
    <div v-if="this.listBill.length === 0" class="purchase-empty-order__container purchase-list-page__empty-page-wrapper" >
      <div class="purchase-empty-order__icon"></div>
      <div class="purchase-empty-order__text">Chưa có đơn hàng</div>
    </div>
  </div>
</template>

<script>
import { ACTION_TYPE, PurchaseType } from '@/const/app.const'
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
    acceptPurchase (billId) {
      updatePurchaseStatusOfUser(billId, ACTION_TYPE.WAIT_CONFIRM).then(response => {
        if (response.status === 200) { this.getListBillDetail(this.indexActive) }
      })
    },
    acceptDelivery (billId) {
      updatePurchaseStatusOfUser(billId, ACTION_TYPE.DELIVERING).then(response => {
        if (response.status === 200) { this.getListBillDetail(this.indexActive) }
      })
    },
    getListBillDetail (indexActive) {
      const params = {
        status: indexActive
      }
      this.listBill = []
      getPurchaseListByAdmin(params).then(res => {
        this.listBill = res.data.data[0].bills.filter(item => item.id_user !== res.data.data[0].idSeller) ?? []
      }).finally(() => {
        this.loading = false
      })
    }
  },
  mounted () {
    this.getListBillDetail(this.indexActive)
  }
}
</script>

<style lang="scss">
.tab {
  overflow: hidden;
  display: flex;
  margin-bottom: 10px;
}

.tab button {
  width: 20%;
  float: left;
  border: none;
  outline: none;
  cursor: pointer;
  padding: 15px;
  font-size: 16px;
  position: relative;
  background-color: rgb(255,255,255);
}

.tab button.active:after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background-color: var(--primary-color);
}

.tab button:hover {
  color: var(--primary-color);
}

.tab button.active {
  color: var(--primary-color);
}
.purchase-list-page__empty-page-wrapper {
  background-color: rgb(255,255,255);
  /*    height: calc(100% - 59px);*/
  overflow: hidden;
  padding: 20px;
}

.purchase-order__container {
  display: block;
  padding: 5px 0 5px 0;
  position: relative;
  width: 100%;
}

.purchase-empty-order__container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60rem;
}

.purchase-empty-order__icon {
  background-position: 50%;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url(https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/assets/5fafbb923393b712b96488590b8f781f.png);
  width: 10rem;
  height: 10rem;
  margin-bottom: 1.25rem;
}
.spinner {
  text-align: center;
  display: flex;
  justify-content: center;
  /* line-height: 60px; */
  height: 50px;
  align-items: center;
}

.spinner > div {
  width: 18px;
  height: 18px;
  background-color: var(--primary-color) !important;
  border-radius: 100%;
  display: inline-block;
  -webkit-animation: sk-bouncedelay 1.4s infinite ease-in-out both;
  animation: sk-bouncedelay 1.4s infinite ease-in-out both;
}

.spinner .bounce1 {
  -webkit-animation-delay: -0.32s;
  animation-delay: -0.32s;
}

.spinner .bounce2 {
  -webkit-animation-delay: -0.16s;
  animation-delay: -0.16s;
}

@-webkit-keyframes sk-bouncedelay {
  0%, 80%, 100% {
    -webkit-transform: scale(0)
  }

  40% {
    -webkit-transform: scale(1.0)
  }
}

@keyframes sk-bouncedelay {
  0%, 80%, 100% {
    -webkit-transform: scale(0);
    transform: scale(0);
  }

  40% {
    -webkit-transform: scale(1.0);
    transform: scale(1.0);
  }
}

/*end loadding */

#user-image img{
  width : 100px;
  height : 100px;
  border-radius : 50%;
  object-fit : cover;
}
</style>
