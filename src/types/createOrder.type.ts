export type CreateOrderType = {
  name: string,
  last_name: string,
  phone: string,
  country: string,
  zip: string,
  product: string,
  address: string,
  comment: string
}

export type ResponseOrderType = {
  success: boolean,
  message?: string
}
