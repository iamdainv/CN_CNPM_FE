export const loginType = Object.freeze({
  NUMBER_PHONE: 0,
  FACEBOOK: 1,
  GOOGLE: 2,
  GITHUB: 3
})

export const PurchaseType = Object.freeze({
  ALL: 0,
  ORDER: 1,
  WAIT_CONFIRM: 2,
  WAIT_TAKE: 3,
  DELIVERING: 4,
  DELIVERED: 5,
  CANCELED: 6
})

export const ACTION_TYPE = Object.freeze({
  WAIT_CONFIRM: 3,
  DELIVERING: 4,
  DELIVERED: 5
})

export const SortType = {
  NEWEST: 'createdAt',
  POPULAR: 'star',
  BEST_SALE: 'selled',
  PRICE: 'price'
}

export const OrderType = {
  DESC: 'desc',
  ASC: 'asc'
}
