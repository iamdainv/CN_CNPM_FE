import Vue from 'vue'
import { PurchaseType } from '@/const/app.const'
import moment from 'moment'
import * as EmailValidator from 'email-validator'
import { removeUtf8, trimSpace } from '@/utils/common'
const API_ERROR_STATUSES = [404, 400, 500, 401, 403]
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
    filterTreeSelectOption (inputValue, treeNode) {
      const txt = removeUtf8(inputValue.toLowerCase())
      const text = removeUtf8(treeNode.componentOptions.propsData.title.toLowerCase())
      return text.indexOf(txt) >= 0
    },
    filterSelectOption (input, option) {
      const txt = removeUtf8(input.toLowerCase())
      const text = removeUtf8(option.componentOptions.children[0].text)
      return (
        text.toLowerCase().indexOf(txt) >= 0
      )
    },
    DeepTrimValue (obj) {
      trimSpace(obj)
    },
    getNameByGlobalist (arr, value) {
      if (value) {
        for (const item in arr) {
          if (arr.hasOwnProperty(item) && String(arr[item].value) === String(value)) {
            return arr[item].name
          }
        }
      }
      return null
    },
    handleApiError (err) {
      if (API_ERROR_STATUSES.indexOf(err.response.status) !== -1) {
        if (err.response.data.message) {
          return err.response.data.message
        } else if (err.response.data.error_description) {
          return (err.response.data.error_description)
        }
      }
      return err.message
    },
    utf8ByteCount (str) {
      str = str + ''
      if (!str) return 0
      return str.length
    },
    validateEmail (email) {
      if (!email) {
        return true
      }
      if (email.trim().length > 0) {
        return EmailValidator.validate(email)
      }
      return true
    },
    getTableRowIndex (pageSize, currentPage, rowIndex) {
      if (currentPage === 0) {
        currentPage = 1
      }
      return (currentPage - 1) * pageSize + rowIndex + 1
    },
    formatPrice (value) {
      if (value || value === 0) {
        const val = (value / 1).toFixed(0).replace('.', ',')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      } else {
        return ''
      }
    },
    formatPriceToVND (value) {
      return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(value)
    },
    formatPhone (value) {
      const val = (value / 1).toFixed(0).replace('.', ',')
      return val.toString().replace(/^[2-9]\d{2}-\d{3}-\d{4}$/g, '.')
    },
    getGlobalName (items, value) {
      if (typeof items === 'object' && items.length > 0) {
        let name = value
        items.forEach(item => {
          if (item.value === value) {
            name = item.name
          }
        })
        return name
      }
      return value
    },
    convertToSubmitDate (dateString) {
      if (dateString !== null && dateString !== '') {
        const d = moment(dateString, this.datePlaceholderFormat)
        if (d.isValid()) {
          return d.format(this.dateSubmitFormat)
        } else {
          return moment(dateString).format(this.dateSubmitFormat)
        }
      } else if (moment.isMoment(dateString)) {
        return dateString.format(this.dateSubmitFormat)
      }
      return dateString
    },
    isLocalDateTime (dateString) {
      return moment(dateString, moment.HTML5_FMT.DATETIME_LOCAL_SECONDS, true).isValid()
    },
    convertPropToSubmitDate (obj) {
      if (obj === null || obj === '' || typeof (obj) !== 'object') {
        return obj
      }
      const pattern = /^\d{1,2}\/\d{1,2}\/\d{4}$/
      for (const p in obj) {
        if (obj.hasOwnProperty(p)) {
          if ((typeof (obj[p]) === 'string' && (pattern.test(obj[p]) || this.isLocalDateTime(obj[p]))) || moment.isMoment(obj[p])) {
            obj[p] = this.convertToSubmitDate(obj[p])
          } else if (typeof (obj[p]) === 'object') {
            obj[p] = this.convertPropToSubmitDate(obj[p])
          }
        }
      }
      return obj
    },
    convertPropToDisplayDate (obj) {
      if (obj === null || obj === '' || typeof (obj) !== 'object') {
        return obj
      }
      const pattern = /^\d{4}-\d{1,2}-\d{1,2}$/
      for (const p in obj) {
        if (obj.hasOwnProperty(p)) {
          if ((typeof (obj[p]) === 'string' && (pattern.test(obj[p]) || this.isLocalDateTime(obj[p]))) || moment.isMoment(obj[p])) {
            obj[p] = this.convertToDisplayDate(obj[p])
          } else if (typeof (obj[p]) === 'object') {
            obj[p] = this.convertPropToDisplayDate(obj[p])
          }
        }
      }
      return obj
    },
    customUrl (sys, baseUrl) {
      if (sys && baseUrl) {
        return `${sys}/${baseUrl}`
      }
      return baseUrl
    },
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
    },
    convertToSlugToProductDetail (productName, productId) {
      return productName.split(' ').join('-') + `.${productId}`
    }
  }
}
Vue.mixin(mixin)
