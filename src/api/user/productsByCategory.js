import { api } from './index'
import { apiService } from '@/api/api'

export function getListProductByCategory (param) {
    return apiService.get(api.getProductByCategory, param)
}
