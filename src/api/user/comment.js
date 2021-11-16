import { api } from './index'
import { apiService } from '@/api/api'

export function getListCommentOfProduct (productId, skip = 1, limit = 20) {
  const query = {
    pageSize: limit,
    pageNum: skip
  }
  return apiService.get(`${api.getCommentByProductId}/${productId}`, query)
}

export function createNewComment (createCommentParam) {
  return apiService.post(api.createNewComment, createCommentParam, { 'Content-type': 'multipart/form-data' })
}
