// import storage from '@/store'
// import { getListProductInCart, changeQuantityProductInCart, removeProductInCart, buyProductInCart } from '@/api/user/cart'

const user = {
    state: {
        listBillBySeller: [
            {
                idSeller: 1,
                seller: 'Nguyen Thin',
                bills: [
                    {
                        product: {
                            id: 1,
                            img: 'https://www.mega-ks.com/wp-content/uploads/2017/09/CANON-EOS-80D-BODY-WITH-EF-S-18-55MM-IS-STM-1.jpg',
                            name: 'Máy ảnh Canon EOS 80D 18-55MM 3.5-5.6 IS STM',
                            price: 20000000,
                            discount: 5,
                            quantity: 100
                        },
                        quantity: 2
                    },
                    {
                        product: {
                            id: 2,
                            img: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-12-mini-white-select-2020?wid=1200&hei=630&fmt=jpeg&qlt=95&op_usm=0.5,0.5&.v=1601830932000',
                            name: 'Apple iPhone 12 mini 64GB',
                            price: 30000000,
                            discount: 5,
                            quantity: 100
                        },
                        quantity: 1
                    }
                ]
            },
            {
                idSeller: 2,
                seller: 'Dai Nguyen',
                bills: [
                    {
                        product: {
                            id: 3,
                            img: 'https://i-techbd.com/wp-content/uploads/2019/12/Samsung-Galaxy-S15-.jpg',
                            name: 'Samsung Galasy s15',
                            price: 15000000,
                            discount: 5,
                            quantity: 100
                        },
                        quantity: 3
                    },
                    {
                        product: {
                            id: 4,
                            img: 'https://i.pinimg.com/originals/ba/cb/f9/bacbf92de815da10e178445e15e5b770.jpg',
                            name: 'Nhà Sách Online',
                            price: 100000,
                            discount: 5,
                            quantity: 100
                        },
                        quantity: 4
                    }
                ]
            }
        ],
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
        GetListBillBySeller: ({ commit, dispatch, state }) => {
            return new Promise((resolve, reject) => {
                // getListProductInCart().then(rs => {
                //     const result = rs.body
                //     commit('SET_LIST_PRODUCT_IN_CART', result)
                //     dispatch('GetListProductInCart')
                //     resolve(result)
                // }).catch(err => {
                //     reject(err)
                // })
                const result = [ ...state.listBillBySeller ]
                commit('SET_LIST_BILL_BY_SELLER', result)
                dispatch('GetListProductInCart')
                resolve(result)
            })
        },
        SetListBillBySeller: ({ commit, dispatch }, newList) => {
            commit('SET_LIST_BILL_BY_SELLER', newList)
            dispatch('GetListProductInCart')
        },
        ChangeQuantityProductInCart: ({ commit, dispatch, state }, param) => {
            return new Promise((resolve, reject) => {
                // changeQuantityProductInCart(param).then(rs => {
                //     const result = rs.body
                //     commit('SET_LIST_PRODUCT_IN_CART', result)
                //     dispatch('GetListProductInCart')
                //     resolve(result)
                // }).catch(err => {
                //     reject(err)
                // })
                const { idProduct, quantity } = param
                const result = [ ...state.listBillBySeller ]
                result.map(item => {
                    item.bills.map(bill => {
                        if (bill.product.id === idProduct) {
                            bill.quantity = quantity
                            return 0
                        }
                    })
                })
                commit('SET_LIST_BILL_BY_SELLER', result)
                dispatch('GetListProductInCart')
                resolve(result)
            })
        },
        RemoveProductInCart: ({ commit, dispatch, state }, param) => {
            return new Promise((resolve, reject) => {
                // removeProductInCart(param).then(rs => {
                //     const newList = rs.body
                //     commit('SET_LIST_BILL_BY_SELLER', newList)
                //     dispatch('GetListProductInCart')
                //     resolve(newList)
                // }).catch(err => {
                //     reject(err)
                // })
                const { id } = param
                console.log(id)
                const newList = [ ...state.listProductInCart ]
                resolve(newList)
            })
        },
        BuyProductsInCart: ({ commit, dispatch, state }, param) => {
            console.log(param)
            return new Promise((resolve, reject) => {
                // buyProductInCart(param).then(rs => {
                //     const newList = rs.body
                //     commit('SET_LIST_BILL_BY_SELLER', newList)
                //     dispatch('GetListProductInCart', newList)
                //     resolve(newList)
                // }).catch(err => {
                //     reject(err)
                // })
                let newList = [ ...state.listBillBySeller ]
                newList = newList.filter(item => {
                    item.bills = item.bills.filter(bill => {
                        if (bill.checked) {
                            return false
                        }
                        return true
                    })
                    return item.bills.length > 0
                })
                commit('SET_LIST_BILL_BY_SELLER', newList)
                dispatch('GetListProductInCart', newList)
                resolve(state.listBillBySeller)
            })
        },
        GetListProductInCart: ({ commit, state }) => {
            const newList = []
            state.listBillBySeller.forEach(item => {
                item.bills.forEach(bill => {
                    const productInfo = {}
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
