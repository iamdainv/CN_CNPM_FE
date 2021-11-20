import { api } from './index'
import { apiService } from '@/api/api'

export function getUserInfo () {
  return apiService.get(api.getUserInfo)
}

export function getUserAddress () {
  return apiService.get(api.getUserAddress)
}
