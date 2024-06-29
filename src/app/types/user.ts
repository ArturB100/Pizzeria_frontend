export interface UserLoginPayload {
    email: string,
    password: string
}
  


export interface UserData {
    firstName: string
    lastName: string
    phone: string
    email: string
    address: Address
  }
  
  export interface Address {
    id: number
    firstLine: string
    city: string
    secondLine: string
    zipcode: string
  }
  

  export interface RegisterReqBody {
    firstName: string
    lastName: string
    phone: string
    email: string
    password: string
    passwordConfirm: string
  }
  