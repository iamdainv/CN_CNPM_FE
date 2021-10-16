<template>
  <div class="cart-shop" v-if="bills.length > 0">
    <div class="cart-shop-header">
      <div class="cart-item__cell-checkbox">
        <input
          type="checkbox"
          class="stardust-checkbox__input input-check-brand"
          :checked="checkedAll"
          @change="handleCheckAll"
        >
      </div>
      <a href="#" class="cart-page-shop-header__shop-name">
        {{ seller }}
      </a>
    </div>
    <!-- cart item -->
    <cart-item
      v-for="(bill, i) in bills"
      :key="i"
      :i="i"
      :bill="bill"
      @productChecked="handleProductChecked"
    ></cart-item>
    <!-- cart voucher -->
    <div class="cart-voucher">
      <i class="fas fa-tags icon-voucher"></i>
      <div class="cart-voucher__content">
        <div class="cart-voucher__message">Shop Voucher giảm đến ₫29k</div>
        <div class="cart-voucher__more">Xem thêm Voucher</div>
      </div>
    </div>
    <!-- cart shipping -->
    <div class="cart-shipping">
      <i class="fas fa-truck icon-free-shipping"></i>
      <div class="cart-shipping__message">
        Miễn Phí Vận Chuyển cho đơn hàng từ ₫50.000 (giảm tối đa
        ₫15.000)
        Miễn Phí Vận Chuyển cho đơn hàng từ ₫300.000 (giảm tối đa ₫70.000)
      </div>
      <div class="shopee-drawer">Tìm hiểu thêm</div>
    </div>
  </div>
</template>

<script>
import CartItem from '@/views/client/user/cart/cart_item'
export default {
  name: 'CartShop',
  props: {
    index: {
      type: Number,
      required: true
    },
    idSeller: {
      type: Number,
      required: true
    },
    seller: {
      type: String,
      required: true
    },
    bills: {
      type: Array,
      required: true
    }
  },
  components: {
    CartItem
  },
  data () {
    return {
      checkedAll: false
    }
  },
  mounted () {
    this.checkedAll = this.isCheckAll()
  },
  updated () {
    this.checkedAll = this.isCheckAll()
  },
  methods: {
    handleProductChecked ({ indexBill }) {
      this.$emit('productChecked', { idSeller: this.idSeller, indexBill })
      this.checkedAll = this.isCheckAll()
    },
    handleCheckAll () {
      this.$emit('cartShopChecked', { idSeller: this.idSeller, checkto: !this.isCheckAll() })
    },
    isCheckAll () {
      let isCheckAll = true
      this.bills.forEach(bill => {
        if (!bill.checked) {
          isCheckAll = false
          return 0
        }
      })
      return isCheckAll
    }
  }
}
</script>

<style>

/* Cart shop */
.cart-shop {
    background-color: #fff;
    padding: 15px 0;
    font-size: 1.4rem;
    border-radius: 3px;
    margin-bottom: 15px;
}

.cart-shop-header {
    display: flex;
    align-items: center;
    padding: 0 15px;
}

.cart-page-shop-header__shop-name {
    color: #333;
}

.cart-page-shop-header__shop-name:hover {
    color: #333;
    text-decoration: none;
}

.cart-voucher {
    display: flex;
    align-items: center;
    padding: 16px 0 16px 40px;
    border-top: 1px solid rgba(0,0,0,.09);
}

.icon-voucher {
    color: var(--primary-color);
}

.cart-voucher__content {
    display: flex;
    align-self: center;
    margin-left: 12px;
}

.cart-voucher__message {
    font-size: 1.4rem;
    margin-right: 16px;
}

.cart-voucher__more {
    color: #0384ff;
    font-size: 1.5rem;
}

.cart-voucher__more:hover {
    cursor: pointer;
}

.cart-shipping {
    display: flex;
    align-items: center;
    padding: 16px 0 16px 40px;
    border-top: 1px solid rgba(0,0,0,.09);
}

.icon-free-shipping {
    color: #87e0d4;
}

.cart-shipping__message {
    font-size: 1.4rem;
    margin-right: 16px;
    margin-left: 12px;
}

.shopee-drawer {
    color: #0384ff;
    font-size: 1.5rem;
}

.shopee-drawer:hover {
    cursor: pointer;
}

</style>
