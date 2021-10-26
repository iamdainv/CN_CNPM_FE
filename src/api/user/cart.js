import { api } from './index'
import { apiService } from '@/api/api'

export function getListProductInCart () {
    return apiService.get(api.getListProductInCart)
}

export function addProductToCart (param) {
    return apiService.post(api.addProductToCart, param)
}

export function changeQuantityProductInCart (param) {
    return apiService.post(api.changeQuantityProductInCart, param)
}

export function removeProductInCart (param) {
    return apiService.delete(api.removeProductInCart, param)
}

export function buyProductInCart (param) {
    return apiService.post(api.buyProductInCart, param)
}
