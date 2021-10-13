// import storage from '@/store'
// import { getListProductInCart } from '@/api/user/cart'

// const lsKey = 'vuex_cart'

const user = {
    state: {
        listProductInCart: []
    },
    mutations: {
        SET_LIST_PRODUCT_IN_CART: (state, listProductInCart) => {
            state.listProductInCart = listProductInCart
            // storage.set(lsKey, state)
        }
    },
    actions: {
        GetListProductInCart: ({ commit }) => {
            return new Promise((resolve, reject) => {
                // getListProductInCart().then(rs => {
                //     const result = rs.body
                //     commit('SET_LIST_PRODUCT_IN_CART', result)
                //     resolve(result)
                // }).catch(err => {
                //     reject(err)
                // })
                const result = [
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
                                    discount: 5
                                },
                                quantity: 2
                            },
                            {
                                product: {
                                    id: 2,
                                    img: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-12-mini-white-select-2020?wid=1200&hei=630&fmt=jpeg&qlt=95&op_usm=0.5,0.5&.v=1601830932000',
                                    name: 'Apple iPhone 12 mini 64GB',
                                    price: 30000000,
                                    discount: 5
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
                                    discount: 5
                                },
                                quantity: 3
                            },
                            {
                                product: {
                                    id: 4,
                                    img: 'https://i.pinimg.com/originals/ba/cb/f9/bacbf92de815da10e178445e15e5b770.jpg',
                                    name: 'Nhà Sách Online',
                                    price: 100000,
                                    discount: 5
                                },
                                quantity: 4
                            }
                        ]
                    }
                ]
                commit('SET_LIST_PRODUCT_IN_CART', result)
                resolve(result)
            })
        }
    }
}

export default user
