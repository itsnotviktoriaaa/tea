export type CreateOrderType = {
  name: string | null,
  last_name: string | null,
  phone: string | null,
  country: string | null,
  zip: string | null,
  product: string | null,
  address: string | null,
  comment: string | null
}

export type ResponseOrderType = {
  success: boolean,
  message?: string
}
