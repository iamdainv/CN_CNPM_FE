// import storage from '@/store'
import { getListBillBySeller, changeQuantityProductInCart, removeProductInCart, buyProductInCart } from '@/api/user/cart'

const user = {
    state: {
        listBillBySeller: [],
        listProductInCart: []
    },
    mutations: {
        SET_LIST_BILL_BY_SELLER: (state, listBillBySeller) => {
            state.listBillBySeller = listBillBySeller
        },
        SET_LIST_PRODUCT_IN_CART: (state, listProductInCart) => {
            state.listProductInCart = listProductInCart
        }
    },
    getters: {
        listBillBySeller (state) {
            return state.listBillBySeller
        },
        listProductInCart (state) {
            return state.listProductInCart
        }
    },
    actions: {
        GetListBillBySeller: ({ dispatch, commit }) => {
            return new Promise((resolve, reject) => {
                getListBillBySeller().then(rs => {
                    let result = []
                    if (rs) {
                        result = rs.data.data
                    }
                    commit('SET_LIST_BILL_BY_SELLER', result)
                    resolve(result)
                }).catch(err => {
                    reject(err)
                }).finally(() => {
                    dispatch('GetListProductInCart')
                })
            })
        },
        SetListBillBySeller: ({ commit, dispatch }, newList) => {
            commit('SET_LIST_BILL_BY_SELLER', newList)
            dispatch('GetListProductInCart')
        },
        ChangeQuantityProductInCart: ({ commit, dispatch, state }, params) => {
            return new Promise((resolve, reject) => {
                changeQuantityProductInCart({ idBill: params.idBill, quantity: params.quantity }).then(rs => {
                    let result = null
                    if (rs.data.status === 500) {
                        const newParams = {
                            idBill: params.idBill,
                            quantity: rs.data.quantityProduct ? rs.data.quantityProduct : 1
                        }
                        commit('ChangeQuantityProductInCart', newParams)
                    } else {
                        result = rs.data
                        dispatch('GetListBillBySeller')
                        resolve(result)
                    }
                }).catch(err => {
                    reject(err)
                })
            })
        },
        RemoveProductInCart: ({ dispatch }, params) => {
            return new Promise((resolve, reject) => {
                removeProductInCart({ idBill: params.idBill }).then(rs => {
                    let result = null
                    if (rs) {
                        result = rs.data
                    }
                    dispatch('GetListBillBySeller')
                    resolve(result)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        BuyProductsInCart: ({ dispatch, commit }, params) => {
            return new Promise((resolve, reject) => {
                buyProductInCart(params).then(rs => {
                    let result = null
                    if (rs.data.status === 500) {
                        alert(rs.data.data)
                        const newParams = {
                            idBill: params.idBill,
                            quantity: rs.data.quantityProduct ? rs.data.quantityProduct : 1
                        }
                        commit('ChangeQuantityProductInCart', newParams)
                    } else {
                        result = rs.data
                        dispatch('GetListBillBySeller')
                        resolve(result)
                    }
                }).catch(err => {
                    reject(err)
                })
            })
        },
        GetListProductInCart: ({ commit, state }) => {
            const newList = []
            state.listBillBySeller.forEach(item => {
                item.bills.forEach(bill => {
                    const productInfo = {}
                    productInfo.id = bill.id
                    productInfo.quantity = bill.quantity
                    productInfo.product = { ...bill.product }
                    newList.push(productInfo)
                })
            })
            commit('SET_LIST_PRODUCT_IN_CART', newList)
            return newList
        }
    }
}

export default user
