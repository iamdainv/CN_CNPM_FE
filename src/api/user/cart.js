import { api } from './index'
import { apiService } from '@/api/api'

export function getListBillBySeller () {
    return apiService.get(api.getListBillBySeller)
}

export function addProductToCart (params) {
    return apiService.post(api.addProductToCart, params)
}

export function changeQuantityProductInCart (params) {
    return apiService.put(api.changeQuantityProductInCart(params.idBill), { quantity: params.quantity })
}

export function removeProductInCart (params) {
    return apiService.delete(api.removeProductInCart(params.idBill))
}

export function buyProductInCart (params) {
    return apiService.post(api.buyProductInCart, params)
}
