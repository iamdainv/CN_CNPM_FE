import { api } from './index'
import { apiService } from '@/api/api'

export function getListCommentOfProduct (productId, skip, limit) {
  // TODO update real api
  return apiService.getMockResponse(api.getCommentByProductId)
}
