import { api } from './index'
import { apiService } from '@/api/api'

export function getPurchaseListByUser (purchaseType) {
  const query = {
    status: purchaseType ?? 1
  }
  return apiService.get(api.getBillByUser, query)
}

export function updatePurchaseStatusOfUser (purchaseId, purchaseType) {
  const updatePurchaseParams = {
    purchaseId, purchaseType
  }
  return apiService.put(api.updateBillStatus, updatePurchaseParams)
}

export function addToCart (productId, quantity) {
  const addToCartParams = {
    id_product: productId, quantity
  }
  return apiService.post(api.addToCart, addToCartParams)
}
