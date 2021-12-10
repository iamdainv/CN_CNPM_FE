<template>
  <div class="cart-shop">
    <div class="cart-shop-header" style="padding : 10px;">
      <div class="cart-shop-header-content">
        <div class="order-content__header">
          <img src="@/assets/img/user.png" alt="User" class="header__navbar-user-img">&nbsp;&nbsp;
          <span href="#" class="cart-page-shop-header__shop-name fw-600">
            {{ bill.seller }}
          </span>
          <div
            type="button"
            class="h-button__red  h-color__white cursor-pointer purchase-button-primary chat-button-red"
            style="height: 22px; margin-left: 10px; font-size: 12px; padding: 10px;"
          >
            <svg viewBox="0 0 17 17" class="shopee-svg-icon icon-btn-chat" style="fill: white; width : 12px"><g fill-rule="evenodd"><path d="M13.89 0C14.504 0 15 .512 15 1.144l-.003.088-.159 2.117.162.001c.79 0 1.46.558 1.618 1.346l.024.15.008.154v9.932a1.15 1.15 0 01-1.779.963l-.107-.08-1.882-1.567-7.962.002a1.653 1.653 0 01-1.587-1.21l-.036-.148-.021-.155-.071-.836h-.01L.91 13.868a.547.547 0 01-.26.124L.556 14a.56.56 0 01-.546-.47L0 13.429V1.144C0 .512.497 0 1.11 0h12.78zM15 4.65l-.259-.001-.461 6.197c-.045.596-.527 1.057-1.106 1.057L4.509 11.9l.058.69.01.08a.35.35 0 00.273.272l.07.007 8.434-.001 1.995 1.662.002-9.574-.003-.079a.35.35 0 00-.274-.3L15 4.65zM13.688 1.3H1.3v10.516l1.413-1.214h10.281l.694-9.302zM4.234 5.234a.8.8 0 011.042-.077l.187.164c.141.111.327.208.552.286.382.131.795.193 1.185.193s.803-.062 1.185-.193c.225-.078.41-.175.552-.286l.187-.164a.8.8 0 011.042 1.209c-.33.33-.753.579-1.26.753A5.211 5.211 0 017.2 7.4a5.211 5.211 0 01-1.706-.28c-.507-.175-.93-.424-1.26-.754a.8.8 0 010-1.132z" fill-rule="nonzero"></path></g></svg> Chat</div>
          <div
            type="button"
            class="h-button__red  h-color__white cursor-pointer purchase-button-primary"
            style="height: 22px; font-size: 12px; margin-left: 10px; padding: 10px;"
          >
            <svg
              enable-background="new 0 0 15 15"
              style="width: 12px"
              viewBox="0 0 15 15"
              x="0"
              y="0"
              class="shopee-svg-icon icon-btn-shop"
            >
              <path d="m15 4.8c-.1-1-.8-2-1.6-2.9-.4-.3-.7-.5-1-.8-.1-.1-.7-.5-.7-.5h-8.5s-1.4 1.4-1.6 1.6c-.4.4-.8 1-1.1 1.4-.1.4-.4.8-.4 1.1-.3 1.4 0 2.3.6 3.3l.3.3v3.5c0 1.5 1.1 2.6 2.6 2.6h8c1.5 0 2.5-1.1 2.5-2.6v-3.7c.1-.1.1-.3.3-.3.4-.8.7-1.7.6-3zm-3 7c0 .4-.1.5-.4.5h-8c-.3 0-.5-.1-.5-.5v-3.1c.3 0 .5-.1.8-.4.1 0 .3-.1.3-.1.4.4 1 .7 1.5.7.7 0 1.2-.1 1.6-.5.5.3 1.1.4 1.6.4.7 0 1.2-.3 1.8-.7.1.1.3.3.5.4.3.1.5.3.8.3zm.5-5.2c0 .1-.4.7-.3.5l-.1.1c-.1 0-.3 0-.4-.1s-.3-.3-.5-.5l-.5-1.1-.5 1.1c-.4.4-.8.7-1.4.7-.5 0-.7 0-1-.5l-.6-1.1-.5 1.1c-.3.5-.6.6-1.1.6-.3 0-.6-.2-.9-.8l-.5-1-.7 1c-.1.3-.3.4-.4.6-.1 0-.3.1-.3.1s-.4-.4-.4-.5c-.4-.5-.5-.9-.4-1.5 0-.1.1-.4.3-.5.3-.5.4-.8.8-1.2.7-.8.8-1 1-1h7s .3.1.8.7c.5.5 1.1 1.2 1.1 1.8-.1.7-.2 1.2-.5 1.5z"></path>
            </svg> Xem Shop</div>
        </div>
        <p class="order-content-status">{{ typePurchase.toUpperCase() }}</p>

      </div>
    </div>

    <div class="cart-page-shop-section__items">
      <div class="cart-page-shop-section__item" style="margin : 0; border : none">
        <div class="cart-item" data-id="product.billDetail.id" style="padding : 0">
          <div class="cart-item-wrap">
            <div class="cart-item__cell-overview">
              <a href="#" class="cart-item-overview__thumbnail">
                <div class="cart-item-overview__thumbnail" :style="{ backgroundImage: 'url(' + bill.product.image + ')' }"></div>
              </a>
              <div class="cart-item-overview__name">
                <p>{{ bill.product.name }}</p>
                <p>x {{ bill.quantity }}</p>
              </div>
            </div>

            <div>
              <span class="cart-item__unit-price cart-item__unit-price--before" v-if="bill.product.discount">{{ formatPrice(bill.product.price) }}</span>
              <span class="cart-item__unit-price cart-item__unit-price--after">{{ formatPrice(newPrice) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="order-card__buttons-container">
      <div class="purchase-card-buttons__wrapper">
        <div class="purchase-card-buttons__total-payment">
          <div class="cart-item__cell-total-price-wrapper">
            <div class="purchase-card-buttons__shopee-guarantee-icon" style="background-image: url('https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/assets/67454c89080444c5997b53109072c9e0.png')"></div>
            Tổng số tiền:
            <span class="cart-item__cell-total-price"> {{ formatPrice(totalPrice) }}</span>
          </div>
        </div>
        <div v-if="bill.status === 6" class="purchase-card-buttons__container">
          <div class="purchase-card-buttons__text-info">
            <span class="purchase-text-info">Bạn đã hủy</span>
          </div>
          <div class="purchase-card-buttons__show-button-wrapper">
            <button
              type="button"
              class="h-button__red p-3 h-color__white cursor-pointer"
              id="btn-buy-again"
              data-purchase-id=""
              @click="purchaseAction"
              data-bill-id="product.billDetail.id">Mua lần nữa</button>
          </div>
          <div class="purchase-card-buttons__show-button-wrapper">
            <button type="button" class="h-button__red p-3 h-color__white cursor-pointer purchase-button-primary" id="btn-save-address" >Chi tiết đơn hủy</button>
          </div>
        </div>
        <div v-else class="purchase-card-buttons__container">
          <div class="purchase-card-buttons__text-info">
            <span class="purchase-text-info"> {{ typePurchase }} </span>
          </div>
          <div class="purchase-card-buttons__show-button-wrapper">
            <button type="button" class="h-button__red p-3 h-color__white cursor-pointer purchase-button-primary" data-purchase-id="" data-bill-id="">Chi tiết đơn hàng</button>
          </div>
          <div class="purchase-card-buttons__show-button-wrapper" v-if="buttonTextOfStatus">
            <button
              @click="purchaseAction"
              type="button"
              class="h-button__red p-3 h-color__white cursor-pointer purchase-button-primary purchase-button-cancel"
              id="btn-cancle"
              data-purchase-id=""
              data-bill-id="product.billDetail.id"> {{ buttonTextOfStatus }} </button>
          </div>
          <div v-if="bill.status === 4" class="purchase-card-buttons__container">
            <div class="purchase-card-buttons__show-button-wrapper">
              <button type="button" class="h-button__red p-3 h-color__white cursor-pointer" @click="purchaseAction">Xác nhận đơn hàng</button>
            </div>
          </div>
          <div v-if="bill.status === 5" class="purchase-card-buttons__container">
            <div class="purchase-card-buttons__show-button-wrapper">
              <button type="button" class="h-button__red p-3 h-color__white cursor-pointer purchase-button-primary" @click="evaluateProduct">Đánh giá sản phẩm</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mixin } from '@/utils/mixins'
import { PurchaseType } from '@/const/app.const'
// const Purchase = {
//     All: 0,
//     Order: 1,
//     WaitConfirm: 2,
//     WaitPickup: 3,
//     Delivering: 4,
//     Delivered: 5,
//     Canceled: 6
// }
export default {
  mixins: [mixin],
    name: 'CartPurchaseItem',
    props: {
      bill: {
            type: Object,
            required: true
        }
    },
    data () {
        return {
            newPrice: 0,
            totalPrice: 0,
            typePurchase: '',
            buttonTextOfStatus: ''
        }
    },
    methods: {
      evaluateProduct () {
        this.$router.push({ path: `/product/${this.convertToSlugToProductDetail(this.bill.product.name, this.bill.product.id)}?billId=${this.bill.id}`, query: { billId: this.bill.id } })
      },
        formatPrice (price) {
            return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(price)
        },
        purchaseAction () {
          let actionType = 0
          let callback = null
          switch (this.bill.status) {
            case PurchaseType.CANCELED:
              actionType = PurchaseType.ORDER
              callback = () => {
                this.$router.push({ path: '/cart' })
              }
              break
            case PurchaseType.DELIVERING:
              actionType = PurchaseType.DELIVERED
              break
            case PurchaseType.DELIVERED:
                this.$router.push({ path: `/product/${this.convertToSlugToProductDetail(this.bill.product.name, this.bill.product.id)}` })
              return
            case PurchaseType.WAIT_CONFIRM:
              actionType = 2
              break
          }
            this.$emit('purchaseAction', { ...this.bill, actionType }, callback)
        }
    },
    mounted () {
        this.newPrice = this.bill.product.price - Math.floor((this.bill.product.discount / 100) * this.bill.product.price)
        this.totalPrice = this.newPrice * this.bill.quantity
        this.typePurchase = this.labelPurchase(this.bill.status)
      switch (this.bill.status) {
          case PurchaseType.WAIT_CONFIRM:
            this.buttonTextOfStatus = 'Hủy đơn hàng'
            break
        case PurchaseType.DELIVERED:
          this.buttonTextOfStatus = 'Mua lại'
          break
      }
    }
}
</script>

<style>
    .order-content__header{
        display:flex;
        align-items : center;
    }
    .cart-shop {
        padding-bottom: 0 !important;
        background: none;
        margin-bottom: 20px;
    }
    .cart-shop-header {
        padding-left: 20px !important;
        padding-right: 20px !important;
        background-color: #fff;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .cart-shop-header-content {
        border-bottom: 1px solid rgba(0,0,0,.09);
        flex: 1;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .order-content-status {
        color: #ee4d2d;
        line-height: 1.5rem;
        text-align: right;
        text-transform: uppercase;
        white-space: nowrap;
    }

    .cart-page-shop-section__items {

        padding : 9.5px 20px;
        border-bottom: 1px solid rgba(0,0,0,.09);
    }

    .cart-item-wrap {
        display: flex;
        align-items: center;
        flex: 1;
        flex-wrap: wrap;
    }

    .cart-item__cell-overview {
        display: flex;
        min-width: 200px;
        flex: 1;
    }

    .cart-item-overview__thumbnail {
        height: 80px;
        width: 80px;
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
    }

    .cart-item-overview__name {
        text-decoration: none;
    /* max-height: 4rem;*/
        text-overflow: ellipsis;
        overflow: hidden;
        word-break: break-word;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        padding: 4px 20px 0 12px;
    }

    .cart-item__cell-variation {
        color: #888;
        width: 18%;
        min-width: 130px;
    }

    .cart-item__cell-unit-price {
        width: 15%;
        display: flex;
        align-items: center;
        font-size: 1.3rem;
        min-width: 120px;
    }

    .cart-item__unit-price--before {
        margin-right: 10px;
        text-decoration: line-through;
        color: #888;
    }

    .purchase-card-buttons__wrapper {
        padding-left: 15px;
        padding-right: 15px;
        background: #fffefb;
        padding-bottom: 20px !important;
    }

    .purchase-card-buttons__total-payment {
        padding-top: 40px;
        flex: 1;
        display: flex;
        justify-content: flex-end;
    }

    .cart-item__cell-total-price {
        color: #ee4d2d;
        font-size: 30px;
        line-height: 30px;
        margin-left: 10px;
    }

    .cart-item__cell-total-price-wrapper {
        width: auto;
        display: flex;
        align-items: center;
    }

    .purchase-card-buttons__shopee-guarantee-icon {
        width: 30px;
        height: 30px;
        margin-right: .3125rem;
        background-size: contain;
        background-repeat: no-repeat;
    }

    .purchase-card-buttons__container {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .purchase-card-buttons__text-info{
        flex-grow : 1;
    }
    .purchase-card-buttons__show-button-wrapper{
        margin-left : 10px;
    }
    .cart-page-shop-section__items {
        background-color: #fff;
        position : relative;
    }
    .cart-page-shop-section__items:before {
        position: absolute;
        content: '';
        width: 14px;
        height: 14px;
        background: #f5f5f5;
        bottom: -7px;
        left: -7px;
        border-radius: 50%;
    }
    .cart-page-shop-section__items:after {
        position: absolute;
        content: '';
        width: 14px;
        height: 14px;
        background: #f5f5f5;
        bottom: -7px;
        right: -7px;
        border-radius: 50%;
    }
    .purchase-button-primary {
        outline: none;
        cursor: pointer;
        border: none;
        font-size: 14px;
        font-weight: 300;
        line-height: 1;
        letter-spacing: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background-color .1s cubic-bezier(.4,0,.6,1);
        border: 1px solid rgba(0,0,0,.09);
        border-radius: 2px;
        background: transparent;
        color: rgba(0,0,0,.8);
    }
    .purchase-button-cancel:focus {
        outline: none;
        border: 1px solid rgba(0,0,0,.09) !important;
    }
    .purchase-button-cancel {
        border: 1px solid #ee4d2d;
    }
    .chat-button-red {
        background-color: #fb5431;
        color : white;
    }
    .cart-purchse{
        height : 100%;
    }
</style>
