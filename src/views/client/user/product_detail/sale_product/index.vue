<template>
  <div class="sale-product">
    <div class="product__name"> {{ product.name }} </div>
    <div class="product-reviews">
      <div class="product-reviews__star">
        <span class="product-reviews__star-number"> {{ product.numberOfStar }} </span>
        <div>
          <i
            v-for="(star, index) in Array.from({length: product.numberOfStar}, (_, i) => i + 1)"
            :key="`${index}/fas`"
            class="fas fa-star">
          </i>
          <i
            v-for="(star, index) in Array.from({length: 5 - product.numberOfStar}, (_, i) => i + 1)"
            :key="`${index}/far`"
            class="far fa-star">
          </i>
        </div>
      </div>
      <div class="product-reviews__detail">
        <span class="product-reviews__detail-number"> {{ product.commentCount }} </span>
        <span class="product-reviews__detail-title">Đánh giá</span>
      </div>
      <div class="product-reviews__sold">
        <span class="product-reviews__sold-number"> {{ product.selled }} </span>
        <span class="product-reviews__sold-title">Đã bán</span>
      </div>
    </div>
    <div class="product-price">
      <div class="product-price__detail">
        <div class="product-price__detail-old" v-if="product.discount"><span>₫</span>  {{ formatPriceToVND(product.price) }} </div>

        <div class="product-price__detail-new"><span>₫</span>  {{ salePrice }} </div>
        <div class="product-price__detail-percent" v-if="product.discount"> {{ product.discount }} % GIẢM</div>

      </div>
      <div class="product-price__title">
        <img src="@/assets/img/saleOff.png" alt="sale off" class="product-price__title-img">
        <div class="product-price__title-desc">Ở đâu rẻ hơn, Shopee hoàn tiền</div>
      </div>
    </div>
    <div class="row product-option">
      <div class="col col-12">
        <div class="product-option__select">
          <div class="product-option__select-title">Deal sốc</div>
          <div class="product-option__select-desc">Mua kèm Deal sốc</div>
        </div>
        <div class="product-option__select">
          <div class="product-option__select-title">Vận chuyển</div>
          <div class="product-option__select-desc">
            <div class="product-option__select-free-ship">
              <div class="product-option__select-free-ship-title">
                <img
                  src="@/assets/img/FreeShip.png"
                  alt="free ship"
                  class="product-option__select-free-ship-img">
                <div class="product-option__select-free-ship-text">
                  Miễn Phí Vận Chuyển
                </div>
              </div>
              <div class="product-option__select-free-ship-decs">
                Miễn Phí Vận Chuyển khi đơn đạt giá trị tối thiểu
              </div>
            </div>
            <div class="product-option__select-ship-to">
              <div class="product-option__select-ship-to-title">
                <i class="fas fa-box product-option__select-ship-to-icon"></i>
                <div class="product-option__select-ship-to-text">
                  Vận chuyển tới <span> Huyện Ba Vì, Hà Nội</span>
                </div>
              </div>
              <div class="product-option__select-ship-to-decs">
                Phí vận chuyển ₫43.737 - ₫55.370
              </div>
            </div>
          </div>
        </div>
        <div class="product-option__select">
          <div class="product-option__select-title product-option__select-color-title">
            Màu sắc
          </div>
          <div class="product-option__select-desc">
            <button
              type="button"
              class="btn product-option__select-btn-color">
              Trắng
            </button>
            <button type="button" class="btn product-option__select-btn-color">Đen</button>
            <button type="button" class="btn product-option__select-btn-color">Xanh</button>
            <button type="button" class="btn product-option__select-btn-color">Hồng</button>
          </div>
        </div>
        <div class="product-option__select" v-if="!!product.isSell">
          <div class="product-option__select-title product-option__select-quantity-product-title">
            Số lượng
          </div>
          <div class="product-option__select-desc product-option__select-quantity-product">
            <div class="quantity-product">
              <button class="btn-sub-quantity" @click="subQuantity">-</button>
              <input
                type="number"
                class="input-quantity"
                :value="selectQuantity"
                :min="1"
                :max="product.quantity"
                oninput="">
              <button class="btn-add-quantity" @click="addQuantity">+</button>
            </div>
            <div> {{ product.quantity }} (Sản Phẩm) </div>
          </div>
        </div>
        <div class="product-option__select">
          <div v-if="!product.isSell">
            <button type="button" class="product-option-btn btn-add-to-cart" @click="addToCart">
              Thêm vào giỏ
              hàng
            </button>
            <button type="button" class="product-option-btn btn-buy-now" @click="buyRightNow">Mua ngay</button>
          </div>
          <p class="product-price__detail-new" style="font-size : 20px" v-if="product.isSell">Sản phẩm không được bán nữa</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { addToCart } from '@/api/user/purchase'

export default {
  name: 'SaleProduct',
  props: {
    product: {
      type: Object
    }
  },
  data () {
    return {
      selectQuantity: 1
    }
  },
  computed: {
    // a computed getter
    salePrice: function () {
      // `this` points to the vm instance
     const newPrice = this.product.price - Math.floor((this.product.discount / 100) * this.product.price)
      return this.formatPriceToVND(newPrice)
    }
  },
  mounted () {
    console.log(this.product)
  },
  methods: {
    subQuantity () {
      if (this.selectQuantity - 1 > 0) {
        this.selectQuantity = Math.min(this.selectQuantity - 1, this.product.quantity)
      }
    },
    addQuantity () {
      this.selectQuantity = Math.min(this.selectQuantity + 1, this.product.quantity)
    },

    createBill (callback) {
      this.checkLoginToRedirect(() => {
        addToCart(this.product.id, this.selectQuantity).then((response) => {
          const { status } = response.data
          if (status === 200) {
            callback()
          }
        })
      })
    },

    addToCart () {
      this.createBill(() => {
        this.$toast.open('Thêm vào giỏ hàng thành công')
      })
    },
    buyRightNow () {
      this.createBill(() => {
        this.$toast.open('Thêm vào giỏ hàng thành công')
        this.$router.push({ path: '/cart' })
      })
    }
  }
}
</script>

<style>
/* sale product (description product) */
.sale-product {
    border-bottom: 1px solid #f3f3f3;
}

.product__name {
    font-size: 2rem;
    line-height: 2.4rem;
    font-weight: 600;
}

.product-reviews {
    display: flex;
    margin-top: 15px;
}

.product-reviews__star {
    cursor: pointer;
    padding-right: 15px;
    border-right: 1px solid rgba(0,0,0,.14);
    display: flex;
    align-items: center;
}

.product-reviews__star i {
    font-size: 1.5rem;
    color: var(--primary-color);
}

.product-comment-user__star i {
    font-size: 1rem;
    color: var(--primary-color);
}

.rating-media-list-image__content{
    max-height : 100px;
    display : flex;

}
.comment__image {
    width: 72px;
    height: 72px;
    margin : 0 12px 12px 0 ;
    padding-top: 7%;
}
.product-reviews__star-number {
    font-size: 1.6rem;
    margin-right: 4px;
    color: var(--primary-color);
}

.product-reviews__detail {
    border-right: 1px solid rgba(0,0,0,.14);
}

.product-reviews__detail,
.product-reviews__sold {
    padding: 0 15px;
    cursor: pointer;
}

.product-reviews__detail-number,
.product-reviews__sold-number {
    font-size: 1.6rem;
    margin-right: 4px;
    color: #222;
}

.product-reviews__detail-title,
.product-reviews__sold-title {
    font-size:1.4rem;
    color: #767676;
}

.product-price {
    padding: 15px 20px;
    background-color: #fafafa;
    margin-top: 10px;
}

.product-price__detail {
    display: flex;
    align-items:center;
    margin-bottom: 8px;
}

.product-price__detail-old {
    font-size: 1.6rem;
    text-decoration: line-through;
    color: #929292;
    margin-right: 10px;
}

.product-price__detail-new {
    font-size: 3rem;
    font-weight: 500;
    color: var(--primary-color);
    display: flex;
    align-items: center;
    line-height: 3rem;
}

.product-price__detail-new span {
    font-size:2rem;
    font-weight: 400;
    margin-right: 2px;
}

.product-price__detail-percent {
    font-size: 1.2rem;
    color: #fff;
    text-transform: uppercase;
    background: #ee4d2d;
    border-radius: 2px;
    padding: 2px 4px;
    font-weight: 600;
    line-height: 1;
    margin-left: 15px;
}

.product-price__title {
    display: flex;
}

.product-price__title-img {
    width: 28px;
}

.product-price__title-desc {
    margin: 0 10px;
    font-size: 1.4rem;
    color: #222;
    font-weight: 400;
}

.product-option {
    margin-top: 25px;
    padding: 0 20px;
    font-size: 1.4rem;
}

.product-option__select {
    display: flex;
    align-items: flex-start;
    padding-bottom: 25px;
}

.product-option__select-title {
    width: 90px;
    color: #757575;
}

.product-option__select-desc {
    flex: 1;
}
.product-option__select-free-ship {
    margin-bottom: 10px;
}

.product-option__select-free-ship-title, .product-option__select-ship-to-title {
    display: flex;
    align-items: center;
}

.product-option__select-free-ship-img {
    display: block;
    width: 25px;
    height: 15px;
    margin-right: 5px;
}

.product-option__select-free-ship-decs {
    margin-left: 30px;
    color: #757575;
}

.product-option__select-ship-to-icon {
    font-size: 1.6rem;
    margin: 0 8px 0 6px;
}

.product-option__select-ship-to-decs {
    margin-left: 30px;
}

/* Buttons Color */
.product-option__select-color-title {
    padding-top: 4px;
}

.product-option__select-btn-color {
    min-width: 70px;
    font-size: 1.4rem !important;
    font-weight: 400 !important;
    border: solid 1px #c3c3c3!important;
    margin-right: 8px;
    outline: none;
}
.product-option__select-btn-color:focus {
    outline:none  !important;
}
.product-option__select-btn-color:active {
    outline: none !important;
}

.product-option__select-btn-color:hover {
    color: var(--primary-color);
    border-color: var(--primary-color) !important;
}

.quantity-product {
    font-size: 1.4rem;
    display: flex;
    justify-content: start;
    margin-right: 15px;
}

.btn-sub-quantity, .btn-add-quantity {
    width: 32px;
    height: 32px;
    background-color: white;
    border: 1px solid #c3c3c3;
    cursor: pointer;
}
.btn-sub-quantity, .btn-add-quantity:active {
    outline: none;
}
.btn-sub-quantity:focus {
    outline: none;
}
.btn-add-quantity:focus {
    outline: none;
}

.input-quantity {
    width: 50px;
    height: 32px;
    border: 1px solid #c3c3c3;
    text-align: center;
    outline: none;
}

.product-option__select-quantity-product {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
}

.product-option__select-quantity-product-title {
    margin-top: 4px;
}

.product-option__select {
    display: flex;
    flex-wrap: wrap;
}

.product-option-btn {
    margin-left: 10px;
    min-width: 160px;
    height: 48px;
    font-size: 1.6rem;
    outline: none;
    cursor: pointer;
    padding: 0 12px;
    border-radius: 3px;
    margin-bottom: 8px;
}

.product-option-btn:active {
    outline: none;
}

.product-option-btn:focus {
    outline:none;
}

.btn-add-to-cart {
    background: rgba(255,87,34,.1);
    border: 1px solid var(--primary-color);
    box-shadow: 0 1px 1px 0 rgb(0 0 0 / 3%);
    color: var(--primary-color);
}

.btn-add-to-cart:hover {
    background: rgba(255,87,34,.2);
}

.btn-buy-now {
    border: none;
    background-color: rgba(255, 87, 34, 1);
    box-shadow: 0 1px 1px 0 rgb(0 0 0 / 9%);
    color: #fff;
}

.btn-buy-now:hover {
    background-color: rgba(255, 87, 34, .9);
}

</style>
