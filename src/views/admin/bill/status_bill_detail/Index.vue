<template>
  <div class="cart-shop">
    <div class="cart-shop-header" style="padding : 10px;">
      <div class="cart-shop-header-content">
        <div class="order-content__header">
          <img :src="bill.user.image ? bill.user.image : '@/assets/img/user.png'" alt="User" class="header__navbar-user-img">&nbsp;&nbsp;
          <span href="#" class="cart-page-shop-header__shop-name fw-600">
            {{ `${bill.user.firstName} ${bill.user.lastName}` }}
          </span>
          <div
            type="button"
            class="h-button__red  h-color__white cursor-pointer purchase-button-primary chat-button-red"
            style="height: 22px; margin-left: 10px; font-size: 12px; padding: 10px;"
          >
            <svg viewBox="0 0 17 17" class="shopee-svg-icon icon-btn-chat" style="fill: white; width : 12px"><g fill-rule="evenodd"><path d="M13.89 0C14.504 0 15 .512 15 1.144l-.003.088-.159 2.117.162.001c.79 0 1.46.558 1.618 1.346l.024.15.008.154v9.932a1.15 1.15 0 01-1.779.963l-.107-.08-1.882-1.567-7.962.002a1.653 1.653 0 01-1.587-1.21l-.036-.148-.021-.155-.071-.836h-.01L.91 13.868a.547.547 0 01-.26.124L.556 14a.56.56 0 01-.546-.47L0 13.429V1.144C0 .512.497 0 1.11 0h12.78zM15 4.65l-.259-.001-.461 6.197c-.045.596-.527 1.057-1.106 1.057L4.509 11.9l.058.69.01.08a.35.35 0 00.273.272l.07.007 8.434-.001 1.995 1.662.002-9.574-.003-.079a.35.35 0 00-.274-.3L15 4.65zM13.688 1.3H1.3v10.516l1.413-1.214h10.281l.694-9.302zM4.234 5.234a.8.8 0 011.042-.077l.187.164c.141.111.327.208.552.286.382.131.795.193 1.185.193s.803-.062 1.185-.193c.225-.078.41-.175.552-.286l.187-.164a.8.8 0 011.042 1.209c-.33.33-.753.579-1.26.753A5.211 5.211 0 017.2 7.4a5.211 5.211 0 01-1.706-.28c-.507-.175-.93-.424-1.26-.754a.8.8 0 010-1.132z" fill-rule="nonzero"></path></g></svg> Chat</div>
        </div>
        <p class="order-content-status"><b>{{ typePurchase.toUpperCase() }}</b></p>
      </div>
    </div>

    <div class="cart-page-shop-section__items">
      <div class="cart-page-shop-section__item" style="margin : 0; border : none">
        <div class="cart-item" data-id="bill.product.id" style="padding : 0">
          <div class="cart-item-wrap">
            <div class="cart-item__cell-overview">
              <a href="#" class="cart-item-overview__thumbnail">
                <div class="cart-item-overview__thumbnail" :style="{ backgroundImage: 'url(' + bill.product.image + ')' }"></div>
              </a>
              <div class="cart-item-overview__name">
                <p>{{ bill.product.name }}</p>
                <p>x {{ bill.quantity }}</p>
                <p>{{ `Địa chỉ giao hàng: ${bill.address && bill.address.address ? bill.address.address : ''},
                                          ${bill.address && bill.address.ward ? bill.address.ward : ''},
                                          ${bill.address && bill.address.district ? bill.address.district : '' },
                                          ${bill.address && bill.address.city ? bill.address.city : ''},
                                          ${bill.address && bill.address.country ? bill.address.country : ''}` }}</p>
              </div>
            </div>

            <div>
              <span class="cart-item__unit-price cart-item__unit-price--before">{{ formatPrice(bill.product.price) }}</span>
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
        <div v-if="this.bill.status === 4" class="purchase-card-buttons__container">
          <div class="purchase-card-buttons__text-info">
            <span class="purchase-text-info"><b>{{ `Đang giao hàng`.toUpperCase() }}</b></span>
          </div>
        </div>
        <div v-else-if="this.bill.status === 5" class="purchase-card-buttons__container">
          <div class="purchase-card-buttons__text-info">
            <span class="purchase-text-info"><b>{{ `Đã giao hàng`.toUpperCase() }}</b></span>
          </div>
        </div>
        <div v-else class="purchase-card-buttons__container">
          <div class="purchase-card-buttons__text-info">
            <span class="purchase-text-info"> <b>{{ typePurchase.toUpperCase() }}</b></span>
          </div>
          <div class="purchase-card-buttons__show-button-wrapper">
            <button type="button" class="h-button__red p-3 h-color__white cursor-pointer purchase-button-primary" data-purchase-id="" data-bill-id="">Chi tiết đơn hàng</button>
          </div>
          <div v-if="bill.status === 2" class="purchase-card-buttons__show-button-wrapper">
            <button
              @click="acceptPurchase"
              type="button"
              class="h-button__red p-3 h-color__white cursor-pointer purchase-button-primary purchase-button-cancel"
              data-purchase-id=""
              data-bill-id="bill.id">Xác nhận đơn hàng</button>
          </div>
          <div v-else-if="bill.status === 3" class="purchase-card-buttons__show-button-wrapper">
            <button
              @click="acceptDelivery"
              type="button"
              class="h-button__red p-3 h-color__white cursor-pointer purchase-button-primary purchase-button-cancel"
              data-purchase-id=""
              data-bill-id="bill.id">Giao hàng</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mixin } from '@/utils/mixins'

export default {
  mixins: [mixin],
  name: 'Index',
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
      typePurchase: ''
    }
  },
  methods: {
    formatPrice (price) {
      return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(price)
    },
    acceptPurchase () {
      this.$emit('acceptPurchase', this.bill.id)
    },
    acceptDelivery () {
      this.$emit('acceptDelivery', this.bill.id)
    }
  },
  mounted () {
    this.newPrice = this.bill.product.price - Math.floor((this.bill.product.discount / 100) * this.bill.product.price)
    this.totalPrice = this.newPrice * this.bill.quantity
    this.typePurchase = this.labelPurchase(this.bill.status)
  }
}
</script>

<style lang="scss">
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
  color: #1890ff;
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
  height: 95px;
  width: 95px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}

.cart-item-overview__name {
  text-decoration: none;
  max-height: 10rem;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-word;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
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
  color: #1890ff;
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
  border: 1px solid #1890ff;
}
.chat-button-red {
  background-color: #1890ff;
  color : white;
}
.cart-purchse{
  height : 100%;
}
</style>
