import { api } from './index'
import { apiService } from '@/api/api'

export function getListProduct (params) {
    return apiService.get(api.getListProduct, params)
}

export function getProductById (productId) {
    return apiService.get(`${api.getProductById}/${productId}`, 500)
}

export function getListProductByAdmin (params) {
  return apiService.get(api.getListProductByAdmin, params)
}

export function createProductAdmin () {
  return apiService.get(api.getListProductByAdmin)
}

export function getProductByCategory (param) {
    return apiService.get(api.getProductsByCategory, param)
}

export function createProduct (param) {
    return apiService.post(api.createProduct, param, { 'Content-Type': 'multipart/form-data' })
}

export function updateProduct (id, param) {
  return apiService.put(api.updateProduct(id), param, { 'Content-Type': 'multipart/form-data' })
}

export function getDetailProductAdmin (id) {
  return apiService.get(api.getDetailProductAdmin(id))
}

export function changeProductStatus (id) {
  return apiService.put(api.changeStatus(id))
}

export function deleteProduct (param) {
    return apiService.delete(api.deleteProduct, param)
}

export function searchProducts (params) {
    return apiService.get(api.searchProducts, params)
}
