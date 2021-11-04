import { api } from './index'
import { apiService } from '@/api/api'

export function getListCategoryParent () {
    return apiService.get(api.getListCategoryParent)
}

export function getListCategory () {
    return apiService.get(api.getListCategory)
}
