import Vue from 'vue'
import { PurchaseType } from '@/const/app.const'
// import moment from 'moment'
// import * as EmailValidator from 'email-validator'
// import { removeUtf8 } from '@/utils/common'
// const API_ERROR_STATUSES = [404, 400, 500, 401, 403]
export const mixin = {
  data: function () {
    return {
      dateFormat: 'YYYY-MM-DD',
      dateSubmitFormat: 'YYYY-MM-DD',
      dateDisplayFormat: ['DD/MM/YYYY', 'DDMMYYYY'],
      datePlaceholderFormat: 'DD/MM/YYYY'
    }
  },
  methods: {
    labelPurchase (purchaseType) {
      let purchaseLabel = ''
      switch (purchaseType) {
        case PurchaseType.ALL:
          purchaseLabel = 'Tất cả'
          break
        case PurchaseType.CANCELED:
          purchaseLabel = 'Đã Hủy'
          break
        case PurchaseType.DELIVERED:
          purchaseLabel = 'Đã giáo hàng'
          break
        case PurchaseType.DELIVERING:
          purchaseLabel = 'Đang giáo hàng'
          break
        case PurchaseType.WAIT_CONFIRM:
          purchaseLabel = 'Chờ xác nhận'
          break
        case PurchaseType.WAIT_TAKE:
          purchaseLabel = 'Chờ lấy hàng'
          break
        default:
          purchaseLabel = ''
          break
      }

      return purchaseLabel
    }
  }
}
Vue.mixin(mixin)
