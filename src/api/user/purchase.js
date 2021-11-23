import { api } from './index'
import { apiService } from '@/api/api'

export function getPurchaseListByUser (purchaseType) {
  const query = {
    status: purchaseType ?? 1
  }
  return apiService.get(api.getBillByUser, query)
}

export function getPurchaseListByAdmin (purchaseType) {
  return apiService.get(api.getBillDetailAdmin, purchaseType)
}

export function updatePurchaseStatusOfUser (purchaseId, actionType) {
  const updatePurchaseParams = {
     actionType
  }
  return apiService.put(`${api.updateBillStatusViaActionType}/${purchaseId}`, updatePurchaseParams)
}

export function addToCart (productId, quantity) {
  const addToCartParams = {
    id_product: productId, quantity
  }
  return apiService.post(api.addToCart, addToCartParams)
}
