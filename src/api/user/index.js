export const api = {
  // Product
  getListProduct: '/product/list',
  getProductById: '/product',
  getProductsByCategory: '/product/list',
  createProduct: '/product',
  updateProduct: '/product',
  deleteProduct: '/product',

  // Category
  getListCategory: '/category/list',

  // Cart
  getListProductInCart: '/cart',
  addProductToCart: '/cart',
  changeQuantityProductInCart: '/cart',
  removeProductInCart: 'cart',
  buyProductInCart: '/cart',

  // auth
  login: '/register',

  // ProductByCategory
  getProductByCategory: '/product',

  // comment
  getCommentByProductId: '/comment'
}
