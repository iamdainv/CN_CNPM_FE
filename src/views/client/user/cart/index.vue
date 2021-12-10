<template>
  <div class="cart">
    <div class="container">
      <div v-if="listBillBySeller.length === 0" class="cart--no-cart">
        <img src="@/assets/img/no-cart.png" alt="No cart" class="cart--no-cart-img"/>
        <span class="cart-list--no-cart-msg">Chưa có sản phẩm</span>
        <button class="btn shopee-button-solid" @click="backToHome">MUA NGAY</button>
      </div>
      <div v-else>
        <!-- delivery address -->
        <div class="delivery-address" v-if="listUserAddress.length > 0">
          <div class="delivery-address__header">
            <i class="fas fa-map-marker-alt delivery-address__icon"></i><span class="delivery-address__title">Địa chỉ nhận hàng</span>
          </div>
          <div class="delivery-address__content">
            <a-row :gutter="16">
              <a-col :xs="24" :md="24" :lg="20">
                <a-radio-group class="delivery-address__radio-group" v-model="addressChecked">
                  <a-radio class="delivery-address__radio" v-for="(item, index) in listUserAddress" :key="index" :value="item.id">
                    <span class="address-bold-text" style="margin-right: 10px;">{{ item.recipientName }}</span>
                    <span class="address-bold-text address-text">{{ item.recipientNumberPhone }}</span>
                    <span class="address-text">{{ item.address + ' ' + item.ward + ' ' + item.district + ' ' + item.city }}</span>
                    <span class="address-bold-text address-text">{{ item.isDefault === 1 ? 'Mặc định' : '' }}</span>
                  </a-radio>
                </a-radio-group>
              </a-col>
              <a-col :xs="24" :md="24" :lg="4">
                <div @click="handleOpenModalAddress" class="h-button__red p-4 h-color__white" style="cursor: pointer;">
                  <i class="fas fa-plus"></i>
                  <span class="mx-2"> Thêm địa chỉ </span>
                </div>
              </a-col>
            </a-row>
          </div>
        </div>
        <!-- cart -->
        <div class="cart__content">
          <!-- cart header -->
          <div class="cart-product-header">
            <div class="cart-item__cell-checkbox">
              <input type="checkbox" class="stardust-checkbox__input input-check-all" :checked="checkedAll" :value="checkedAll" @change="handleCheckAll">
            </div>
            <div class="cart-page-product-header__product">Sản Phẩm</div>
          </div>
          <!-- cart list -->
          <cart-list
            :listBillBySeller="listBillBySeller"
            @productChecked="handleProductChecked"
            @cartShopChecked="handleCartShopChecked"
            :key="keyRerender"
          ></cart-list>
          <!-- cart footer -->
          <div class="cart-page-footer">
            <div class="cart-page-footer__row1">
              <div class="row">
                <div class="col col-12 col-sm-12 col-md-12 col-lg-7"></div>
                <div class="col col-12 col-sm-12 col-md-12 col-lg-5">
                  <div class=" cart-page-footer__row1-wrap">
                    <i class="fas fa-tags icon-voucher"></i>
                    <div class="cart-footer__voucher-message">Shopee Voucher</div>
                    <div class="cart-page-footer-space"></div>
                    <div class="cart-footer__voucher-choose">Chọn hoặc nhập mã</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="cart-page-footer__row2">
              <div class="cart-item__cell-checkbox">
                <input
                  type="checkbox"
                  class="stardust-checkbox__input input-check-all"
                  id="input-check-all"
                  :checked="checkedAll"
                  :value="checkedAll"
                  @change="handleCheckAll">
              </div>
              <label for="input-check-all" class="cart-page-footer__product-count">Chọn tất cả ({{ totalProductChecked }})</label>
              <button class="cart-item__action btn-delete-mul-product" @click="handleRemoveProducts">Xóa</button>
              <div class="cart-page-footer-space"></div>
              <div class="cart-page-footer__summary">
                <div class="cart-page-footer__first-summary">
                  <div class="cart-page-footer-summary__subtotal-text">Tổng tiền hàng ({{ totalProductChecked }} Sản phẩm):</div>
                  <div class="cart-page-footer-summary__subtotal-amount">{{ new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(totalPrice) }}</div>
                </div>
                <div class="cart-page-footer__second-summary">Nhận thêm: 0 Xu</div>
              </div>
              <div class="cart-page-footer__checkout">
                <button type="button" class="btn shopee-button-solid" @click="buyProducts">Mua Hàng</button>
              </div>
            </div>
          </div>
        </div>
        <modal-address v-if="visibleModal" :visible="visibleModal" :isCreated="true" @closeModal="handleCloseModal" :formData="formDataAddress"></modal-address>
      </div>
    </div>
  </div>
</template>

<script>
import CartList from '@/views/client/user/cart/cart_list/'
import ModalAddress from '@/components/user/modal_address'
import { mapActions } from 'vuex'
import _ from 'lodash'
export default {
  name: 'Cart',
  components: {
    CartList,
    ModalAddress
  },
  computed: {
    listBillBySellerInCart () {
      return this.$store.getters.listBillBySeller
    },
    listUserAddress () {
      return this.$store.getters.userAddress
    }
  },
  watch: {
    listBillBySellerInCart (newList, oldList) {
      this.listBillBySeller = _.cloneDeep(newList)
      if (this.isCheckAll() === false) {
        this.checkedAll = false
      }
      this.calcTotalPrice()
    },
    listUserAddress (newList, oldList) {
      newList.forEach(item => {
        if (item.isDefault === 1) {
          this.addressChecked = item.id
          return false
        }
      })
    }
  },
  created () {
    this.$store.dispatch('GetListBillBySeller').then(rs => {
    }).catch(err => {
      console.log('Error : ', err)
    })
    this.$store.dispatch('getUserAddress')
  },
  mounted () {
    const newList = _.cloneDeep(this.listBillBySellerInCart)
    newList.forEach(item => {
      item.bills.forEach(bill => {
        bill.checked = false
      })
    })
    this.listBillBySeller = newList
    this.calcTotalPrice()

    this.listUserAddress.forEach(item => {
      if (item.isDefault === 1) {
        this.addressChecked = item.id
        return false
      }
    })
  },
  data () {
    return {
      checkedAll: false,
      listBillBySeller: [],
      listChecked: [],
      totalPrice: 0,
      totalProductChecked: 0,
      keyRerender: false,
      formDataAddress: {
        city: '',
        id_user: '',
        address: '',
        district: '',
        ward: '',
        latitude: '',
        longitude: '',
        recipientName: '',
        recipientNumberPhone: '',
        isDefault: 0
      },
      visibleModal: false,
      addressChecked: ''
    }
  },
  methods: {
    ...mapActions(['GetListBillBySeller', 'SetListBillBySeller', 'RemoveProductInCart', 'BuyProductsInCart']),
    handleProductChecked ({ idBill }) {
      const newList = _.cloneDeep(this.listBillBySeller)
      newList.forEach(item => {
        item.bills.forEach(bill => {
          if (bill.id === idBill) {
            bill.checked = !bill.checked
          }
        })
      })
      this.listBillBySeller = newList
      this.$store.dispatch('SetListBillBySeller', newList)
      this.checkedAll = this.isCheckAll()
      this.calcTotalPrice()
    },
    handleCartShopChecked ({ idSeller, checkto }) {
      const newList = _.cloneDeep(this.listBillBySeller)
      newList.forEach(item => {
        if (item.idSeller === idSeller) {
          item.bills.forEach(bill => {
            bill.checked = checkto
          })
        }
      })
      this.$store.dispatch('SetListBillBySeller', newList)
      this.checkedAll = this.isCheckAll()
      this.calcTotalPrice()
      this.keyRerender = !this.keyRerender
    },
    handleCheckAll () {
      const newList = _.cloneDeep(this.listBillBySeller)
      newList.forEach(item => {
        item.bills.forEach(bill => {
          bill.checked = !this.checkedAll
        })
      })
      this.$store.dispatch('SetListBillBySeller', newList)
      this.checkedAll = !this.checkedAll
      this.keyRerender = !this.keyRerender
    },
    isCheckAll () {
      let isCheckedAll = true
      this.listBillBySeller.forEach(item => {
        item.bills.forEach(bill => {
          if (!bill.checked === true) {
            isCheckedAll = false
            return 0
          }
        })
      })
      this.checkedAll = isCheckedAll
      return isCheckedAll
    },
    calcTotalPrice () {
      let totalPrice = 0
      let totalProductChecked = 0
      this.listBillBySeller.forEach(item => {
        item.bills.forEach(bill => {
          if (bill.checked) {
            totalPrice += (Math.floor(bill.product.price - (bill.product.discount / 100) * bill.product.price)) * bill.quantity
            totalProductChecked += bill.quantity
          }
        })
      })
      this.totalPrice = totalPrice
      this.totalProductChecked = totalProductChecked
    },
    handleRemoveProducts () {
      // let arrPromise = []
      this.listBillBySeller.forEach(item => {
        item.bills.forEach(bill => {
          if (bill.checked) {
            this.$store.dispatch('RemoveProductInCart', { idBill: bill.id })
          }
        })
      })
    },
    buyProducts () {
      if (this.listUserAddress.length > 0) {
        let billIds = []
        this.listBillBySeller.forEach(item => {
          item.bills.forEach(bill => {
            if (bill.checked) {
              billIds = billIds.concat([bill.id])
            }
          })
        })
        if (billIds.length > 0) {
          this.$store.dispatch('BuyProductsInCart', { billIds: billIds, addressId: this.addressChecked }).then(rs => {
            this.$success({ content: 'Mua sản phẩm thành công!',
              onOk: () => {
                this.$router.push({ name: 'purchase' })
              }
            })
          })
          this.keyRerender = !this.keyRerender
        } else {
          this.$warning({ title: 'Bạn phải chọn ít nhất 1 sản phẩm !', content: 'Thêm địa chỉ', onOk: () => { } })
        }
      } else {
        this.$info({ title: 'Bạn chưa có địa chỉ nào!', content: 'Thêm địa chỉ', onOk: () => { this.visibleModal = true } })
      }
    },
    backToHome () {
      this.$router.push({ name: 'home' })
    },
    handleOpenModalAddress () {
      this.visibleModal = true
    },
    resetFormData () {
      this.formDataAddress = {
        city: '',
        id_user: '',
        address: '',
        district: '',
        ward: '',
        latitude: '',
        longitude: '',
        recipientName: '',
        recipientNumberPhone: '',
        isDefault: this.listUserAddress.length > 0 ? 0 : 1
      }
    },
    handleCloseModal () {
      this.resetFormData()
      this.visibleModal = false
      this.create = false
    }
  }
}
</script>

<style>
input[type=checkbox] {
  cursor: pointer;
}

.cart {
    background-color: #f5f5f5;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    padding: 15px 0;
}

label {
    padding: 0;
    margin: 0;
}

.delivery-address {
  width: 100%;
  margin-bottom: 10px;
  padding: 20px 30px;
  background-color: white;
  border-radius: 3px;
}

.delivery-address__icon {
  color: var(--primary-color);
  font-size: 20px;
}

.delivery-address__title {
  color: var(--primary-color);
  font-size: 20px;
  margin-left: 10px;
}

.delivery-address__radio-group {
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 10px 0px 0px 20px;
}

.delivery-address__radio {
  padding: 5px 0;
}

.address-bold-text {
  font-weight: bold;
}

.address-text {
  margin-right: 20px;
}

.cart--no-cart {
  width: 100%;
  text-align: center;
  padding: 20px 0;
}

.cart--no-cart-img {
  width: 40%;
  margin: 0 auto;
}

.cart-list--no-cart-msg {
  display: block;
	margin: 20px 0;
	font-size: 1.8rem;
}

.cart-page-product-header__product {
  font-size: 16px;
}

.cart-item__cell-checkbox {
    padding: 0 20px 0 20px;
}

.stardust-checkbox__input {
    width: 16px;
    height: 16px;
    transform: translateY(2px);
}

.cart-item__action {
    background-color: #fff;
    outline: none;
    border: none;
    font-size: 1.4rem;
}

.cart-item__action:hover {
    color: var(--primary-color);
}

/* Cart page header */
.cart-product-header {
    background-color: #fff;
    align-items: center;
    box-shadow: 0 1px 1px 0 rgb(0 0 0 / 5%);
    overflow: hidden;
    border-radius: 3px;
    padding: 15px;
    font-size: 1.4rem;
    background: #fff;
    text-transform: capitalize;
    margin-bottom: 12px;
    color: #888;
    display: flex;
    align-items: center;
}

/* Cart page footer */
.cart-page-footer {
    background-color: #fff;
    border-radius: 3px;
    position: sticky;
    bottom: 0;
    box-shadow: 0px -10px 15px rgba(0, 0, 0, 0.05);
}

.cart-page-footer__row1-wrap {
    padding: 12px 0;
    display: flex;
    align-items: center;
    margin-left: 12px;
}

.cart-page-footer .icon-voucher {
    font-size: 1.4rem;
}

.cart-footer__voucher-message {
    font-size: 1.5rem;
    margin-left: 12px;
}

.cart-page-footer-space {
    flex: 1;
}

.cart-footer__voucher-choose {
    font-size: 1.4rem;
    margin-right: 16px;
    color: #0384ff;
}

.cart-footer__voucher-choose {
    cursor: pointer;
}

.cart-page-footer__row2 {
    display: flex;
    align-items: center;
    padding: 12px 0;
    border-top: 2px dotted rgba(0,0,0,.09);
    flex-wrap: wrap;
}

.cart-page-footer__product-count {
    font-size: 1.5rem;
    padding: 0 12px;
}

.cart-page-footer__first-summary {
    display: flex;
    align-items: center;
}

.cart-page-footer-summary__subtotal-text {
    font-size: 1.5rem;
}

.cart-page-footer-summary__subtotal-amount {
    font-size: 2.5rem;
    color: var(--primary-color);
    margin-left: 4px;
}

.cart-page-footer__second-summary {
    font-size: 1.4rem;
    color: #f6af68;
    float: right;
}

.shopee-button-solid {
    background-color: var(--primary-color);
    width: 160px;
    height: 40px;
    color: white;
    margin: 0 16px;
}

.shopee-button-solid:hover {
    opacity: 0.9;
    color: white;
    box-shadow: 0 0 10px #999;
}
</style>
