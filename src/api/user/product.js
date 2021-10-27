import { api } from './index'
import { apiService } from '@/api/api'

export function getListProduct () {
    return apiService.get(api.getListProduct)
}

export function getProductById (param) {
  // TODO: transfer to `${api.getProductById}/id`
    return apiService.getMockResponse(`${api.getProductById}`, 500)
}

export function getProductByCategory (param) {
    return api.get(api.getProductsByCategory, param)
}

export function createProduct (param) {
    return apiService.post(api.createProduct, param)
}

export function updateProduct (param) {
    return apiService.put(api.updateProduct, param)
}

export function deleteProduct (param) {
    return apiService.delete(api.deleteProduct, param)
}
