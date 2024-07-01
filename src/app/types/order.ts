export interface OrderReq {
    addressId: number
    details: OrderDetails[]
  }
  
  export interface OrderDetails {
    pizzaId: number
    quantity: number
    size: number
  }
  



export type AllOrdersOfUser = Order[]

export interface Order {
  id: number
  user: User
  address: Address2
  totalPrice: number
  status: number
  orderDetails: OrderDetail[]
}

export interface User {
  id: number
  firstName: string
  lastName: string
  email: string
  phone: string
  password: string
  role: number
  address: Address
}

export interface Address {
  id: number
  firstLine: string
  city: string
  secondLine: string
  zipcode: string
}

export interface Address2 {
  id: number
  firstLine: string
  city: string
  secondLine: string
  zipcode: string
}

export interface OrderDetail {
  id: number
  pizza: Pizza
  quantity: number
  size: number
}

export interface Pizza {
  id: number
  name: string
  createdByUser: boolean
  ingredients: Ingredient[]
}

export interface Ingredient {
  id: number
  name: string
  priceForSmall: number
  priceForMedium: number
  priceForBig: number
}
