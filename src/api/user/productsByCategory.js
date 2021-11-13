import { api } from './index'
import { apiService } from '@/api/api'

export function getListProductByCategory (params) {
    return apiService.get(api.getProductsByCategory, params)
}
