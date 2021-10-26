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

    <!-- <div class="purchase-empty-order__container purchase-list-page__empty-page-wrapper">
        <div class="purchase-empty-order__icon"></div>
        <div class="purchase-empty-order__text">Chưa có đơn hàng</div>
    </div> -->
    <template v-else>
      <div class="purchase-order__container">
        <cart-purchase :listProduct="listProduct" @cancelPurchase="cancelPurchase"></cart-purchase>
      </div>
    </template>
    <div v-if="listProduct.length === 0" class="purchase-empty-order__container purchase-list-page__empty-page-wrapper" >
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
            listProduct: []
        }
    },
    methods: {
        changeIndexActive (indexActive) {
            this.indexActive = indexActive
            this.loading = true
            this.getListPurchase()
        },
      cancelPurchase (idPurchase) {
        updatePurchaseStatusOfUser(idPurchase, PurchaseType.CANCELED).then(response => {
          if (response.status === 200) { this.getListPurchase() }
        })
      },

      getListPurchase () {
        getPurchaseListByUser(this.purchaseType).then(res => {
          this.listProduct = res.data
          this.loading = false
        })
      }
    },
    mounted () {
      this.getListPurchase()
        // this.listProduct = [
        //     {
        //         seller: {
        //             id: 1,
        //             firstname: 'Nguyen',
        //             lastname: 'Thin'
        //         },
        //         product: {
        //             id: 1,
        //             name: 'May tinh Lenovo',
        //             discount: 5,
        //             price: 15000000,
        //             img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzMIpyOtk71s3veC01pXEh1Wv9lOOCS9UMkg&usqp=CAU'
        //         },
        //         category: {
        //             name: 'may tinh'
        //         },
        //         billDetail: {
        //             quantity: 3,
        //             idStatus: 3
        //         }
        //     },
        //     {
        //         seller: {
        //             id: 2,
        //             firstname: 'Dai',
        //             lastname: 'Nguyen'
        //         },
        //         product: {
        //             id: 2,
        //             name: 'Iphone 12',
        //             discount: 2,
        //             price: 30000000,
        //             img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSI050R1gkcYOdb678_B_nTPArPZLyi_U8BZA&usqp=CAU'
        //         },
        //         category: {
        //             name: 'dien thoai'
        //         },
        //         billDetail: {
        //             quantity: 1,
        //             idStatus: 2
        //         }
        //     },
        //     {
        //         seller: {
        //             id: 2,
        //             firstname: 'Dai',
        //             lastname: 'Nguyen'
        //         },
        //         product: {
        //             id: 3,
        //             name: 'MacBook Pro 13" 2020 Touch Bar M1 16GB/512GB',
        //             discount: 4,
        //             price: 50000000,
        //             img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMtvElzSx2c1CgQJiz0T_PtToXucSDf3lPVQ&usqp=CAU'
        //         },
        //         category: {
        //             name: 'dien thoai'
        //         },
        //         billDetail: {
        //             quantity: 1,
        //             idStatus: 6
        //         }
        //     }
        // ]
        setTimeout(() => { this.loading = false }, 2000)
    }
}
</script>

<style>

</style>
