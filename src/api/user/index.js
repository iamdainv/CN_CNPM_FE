export const api = {
  // Product
  getListProduct: '/product/list',
  getProductById: '/product',
  getProductsByCategory: '/product/list',
  createProduct: '/product',
  updateProduct: '/product',
  deleteProduct: '/product',

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
