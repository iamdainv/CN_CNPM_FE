export const api = {
  // Product
  getListProduct: '/product/list',
  getProductById: '/product',
  getProductsByCategory: '/product/list',
  getListProductByAdmin: '/product/list/user',
  createProduct: '/product',
  updateProduct: '/product',
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
