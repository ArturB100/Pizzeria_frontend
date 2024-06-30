export interface Pizza {
    id: number
    name: string
    createdByUser: boolean
    ingredients: Ingredient[]
    totalPriceForSmall: number
    totalPriceForMedium: number
    totalPriceForBig: number
  }
  
  export interface Ingredient {
    id: number
    name: string
    priceForSmall: number
    priceForMedium: number
    priceForBig: number
  }


  export enum PizzaSizeEnum{
    SMALL, MEDIUM, BIG
  }
  