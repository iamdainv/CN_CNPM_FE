<template>
  <div class="cart-page-shop-section__items">
    <div class="cart-page-shop-section__item">
      <div class="cart-page-shop-section__item-header">
        Mua kèm deal độc quyền
      </div>
      <div class="cart-item" data-id="">
        <div class="cart-item__cell-checkbox">
          <input type="checkbox" class="stardust-checkbox__input input-check-product" :checked="bill.checked === true ? true : false " @change="handleChecked">
        </div>
        <div class="cart-item-wrap row">
          <div class="cart-item__cell-overview col col-lg-4 col-md-4 col-sm-12">
            <a href="#" class="cart-item-overview__thumbnail">
              <div class="cart-item-overview__thumbnail" :style="{ backgroundImage: 'url(' + bill.product.image + ')' }"></div>
            </a>
            <div class="cart-item-overview__name">
              {{ bill.product.name }}
            </div>
          </div>
          <div class="cart-item__cell-unit-price col col-lg-3 col-md-3 col-sm-12">
            <span class="cart-item__unit-price cart-item__unit-price--after" :data-price="newPrice">{{ formatPriceToVND(newPrice) }}</span>&nbsp;&nbsp;&nbsp;
            <span class="cart-item__unit-price cart-item__unit-price--before">{{ formatPriceToVND(bill.product.price) }}</span>
          </div>
          <div class="quantity-product cart-item__cell-quantity col col-lg-2 col-md-2 col-sm-12">
            <button class="btn-sub-quantity" @click="handleSubQuantityProduct">-</button>
            <input type="number" class="input-quantity" :value="bill.quantity" @input="handleChangeQuantityProduct" ref="inputQuantity">
            <button class="btn-add-quantity" @click="handleAddQuantityProduct">+</button>
          </div>
          <div class="cart-item__cell-total-price col col-lg-2 col-md-2 col-sm-12">
            <span>{{ formatPriceToVND(total) }}</span>
          </div>
          <div class="cart-item__cell-actions col col-lg-1 col-md-1 col-sm-12">
            <button class="cart-item__action btn-delete-a-product" @click="handleDeleteProduct">Xóa</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    name: 'CartItem',
    props: {
        i: {
            type: Number,
            required: true
        },
        bill: {
            type: Object,
            required: true
        }
    },
    data () {
        return {
            newPrice: 0,
            total: 0
        }
    },
    mounted () {
        this.newPrice = Math.floor(this.bill.product.price - (this.bill.product.discount / 100) * this.bill.product.price)
        this.calcTotalPrice()
    },
    updated () {
        this.calcTotalPrice()
    },
    methods: {
        ...mapActions(['ChangeQuantityProductInCart', 'RemoveProductInCart']),
        calcTotalPrice () {
            this.total = this.newPrice * this.bill.quantity
        },
        handleSubQuantityProduct () {
            if (this.bill.quantity > 1) {
                this.$store.dispatch('ChangeQuantityProductInCart', { idBill: this.bill.id, quantity: this.bill.quantity - 1 }).then(rs => {
                    if (rs) {
                      this.$toast.open('Giảm số lượng sản phẩm thành công!')
                    }
                }).catch(err => {
                    this.$error(err)
                })
            }
        },
        handleAddQuantityProduct () {
            if (this.bill.quantity < this.bill.product.quantity) {
                this.$store.dispatch('ChangeQuantityProductInCart', { idBill: this.bill.id, quantity: this.bill.quantity + 1 }).then(rs => {
                    if (rs) {
                      this.$toast.open('Tăng số lượng sản phẩm thành công!')
                    }
                }).catch(err => {
                    this.$error(err)
                })
            }
        },
        handleChangeQuantityProduct (e) {
            this.$refs.inputQuantity.focus()
            let value = Number.parseInt(e.target.value)
            if (value <= 0 || !value) {
                value = 1
            }
            if (value > this.bill.product.quantity) {
                value = this.bill.product.quantity
            }
            this.$store.dispatch('ChangeQuantityProductInCart', { idBill: this.bill.id, quantity: value }).then(rs => {
                if (rs) {
                  this.$toast.open('Thay đổi lượng sản phẩm thành công!')
                }
            }).catch(() => {
                this.$toast.error('Thay đổi số lượng sản phẩm thất bại')
            })
        },
        handleDeleteProduct () {
            this.$store.dispatch('RemoveProductInCart', { idBill: this.bill.id }).then(rs => {
              this.$toast.success('Xóa sản phẩm khỏi giỏ hàng thành công!')
            }).catch(() => {
                this.$toast.error('Xóa sản phẩm hỏi giỏ hàng thất bại!')
            })
        },
        handleChecked () {
            this.$emit('productChecked', { idBill: this.bill.id })
        }
    }
}
</script>

<style>
.cart-page-shop-section__item {
    border: 1px solid rgba(0,0,0,.09);
    border-radius: 2px;
    margin: 20px 15px;
}

.cart-page-shop-section__item-header {
    padding: 10px 20px;
    background-color: #fff8f3;
}

.cart-item {
    padding: 15px 20px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
}

.cart-item:last-child {
    padding-bottom: 20px;
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
    /* width: 18%; */
    min-width: 130px;
}

.cart-item__cell-unit-price {
    /* width: 15%; */
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    font-size: 1.3rem;
    min-width: 120px;
    overflow: hidden;
}

.cart-item__unit-price--before {
    margin-right: 10px;
    text-decoration: line-through;
    color: #888;
}

.cart-item__cell-quantity {
    /* width: 12%; */
    min-width: 120px;
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
    /* hid arrow number */
    -webkit-appearance: none !important;
    -moz-appearance: textfield;
}

.input-quantity::-webkit-outer-spin-button,
.input-quantity::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.cart-item__cell-total-price {
    font-size: 1.3rem;
    color: var(--primary-color);
    /* width: 10%; */
    text-align: center;
    min-width: 100px;
}

.cart-item__cell-actions {
    /* width: 10%; */
    text-align: center;
    min-width: 50px;
}

</style>
