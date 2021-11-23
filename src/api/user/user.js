import { api } from './index'
import { apiService } from '@/api/api'

export function getUserInfo () {
  return apiService.get(api.getUserInfo)
}

export function getUserAddress () {
  return apiService.get(api.getUserAddress)
}

export function createUserAddress (params) {
  return apiService.post(api.createUserAddress, params)
}

export function updateUserAddress (params) {
  return apiService.post(api.updateUserAddress, params)
}

export function removeUserAddress ({ idAddress }) {
  return apiService.delete(api.removeUserAddress(idAddress))
}

export function updateUserAddressDefault ({ idAddress }) {
  return apiService.put(api.updateUserAddressDefault(idAddress))
}
