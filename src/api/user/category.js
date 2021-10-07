import { api } from './index'
import { apiService } from '@/api/api'

export function getListCategory () {
    return apiService.get(api.getListCategory)
}
