const request = {
  demo: require('./demo.json'),
  address: require('./address.json'),
  billDetail: require('./billDetail.json'),
  category: require('./category.json'),
  imageComment: require('./imageComment.json'),
  imageProduct: require('./imageProduct.json'),
  product: require('./product.json'),
  roles: require('./roles.json'),
  statusBill: require('./statusBill.json'),
  userComment: require('./userComment.json'),
  users: require('./users.json'),
  '/bill/info': require('./purchaseUser.json'),
  '/product': require('./productDetail.json'),
  '/comment': require('./comments.json')
}

export default request
