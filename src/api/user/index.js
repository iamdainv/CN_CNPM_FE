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
  getListProductInCart: '/cart',
  addProductToCart: '/cart',
  changeQuantityProductInCart: '/cart',
  removeProductInCart: 'cart',
  buyProductInCart: '/cart',

  // auth
  login: '/users',
  loginByToken: '/users/token',

  // ProductByCategory
  getProductByCategory: '/product',

  // comment
  getCommentByProductId: '/comment'
}
