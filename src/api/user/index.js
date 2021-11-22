export const api = {
  // Product
  getListProduct: '/product/list',
  getProductById: '/product',
  getProductsByCategory: '/product/search_list',
  getListProductByAdmin: '/product/list/user',
  createProduct: '/product/create',
  updateProduct: function (id) { return `/product/update/${id}` },
  getDetailProductAdmin: function (id) { return `/product/${id}` },
  changeStatus: function (id) { return `/product/${id}/active` },
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
  buyProductInCart: '/api/bill/buy',

  // auth
  login: '/users',
  loginByToken: '/users/token',

  // ProductByCategory
  getProductByCategory: '/product',

  // comment
  getCommentByProductId: '/comment/product',
  createNewComment: '/comment/create',

  // purchase
  addToCart: '/api/bill/addToCart',
  getBillByUser: '/api/bill/all/user',
  getBillDetailAdmin: '/api/bill/all/admin',

  // address
  getUserAddress: '/users/address',
  createUserAddress: '/users/address/create',
  removeUserAddress: (idAddress) => `/users/address/${idAddress}/remove`,
  updateUserAddressDefault: (idAddress) => `/users/address/${idAddress}/default`
}
