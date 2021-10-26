import { api } from './index'
import { apiService } from '@/api/api'

export function getPurchaseListByUser (purchaseType) {
  return apiService.getMockResponse(api.getBillByUser)
}

export function updatePurchaseStatusOfUser (purchaseId, purchaseType) {
  const updatePurchaseParams = {
    purchaseId, purchaseType
  }
  return apiService.put(api.updateBillStatus, updatePurchaseParams)
}
