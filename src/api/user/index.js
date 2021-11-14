export const api = {
  // Product
  getListProduct: '/product/list',
  getProductById: '/product',
  getProductsByCategory: '/product/search_list',
  createProduct: '/product',
  updateProduct: '/product',
  deleteProduct: '/product',
  searchProducts: '/product/search_list',

  // Category
  getListCategoryParent: '/category/parent',
  getListCategory: '/category/list',

  // Cart
  getListBillBySeller: '/api/bill/cart',
  addProductToCart: '/api/bill/addToCart',
  changeQuantityProductInCart: (idBill) => {
    return `/api/bill/${idBill}/quantity`
  },
  removeProductInCart: (idBill) => {
    return `/api/bill/${idBill}`
  },
  buyProductInCart: '/cart',

  // auth
  login: '/users',
  loginByToken: '/users/token',

  // ProductByCategory
  getProductByCategory: '/product',

  // comment
  getCommentByProductId: '/comment'
}
