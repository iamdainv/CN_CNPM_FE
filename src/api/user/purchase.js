import { api } from './index'
import { apiService } from '@/api/api'

export function getPurchaseListByUser (purchaseType) {
  return apiService.getMockResponse(api.getBillByUser)
}

export function getPurchaseListByAdmin (purchaseType) {
  return apiService.get(api.getBillDetailAdmin, purchaseType)
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
