import { Injectable } from '@angular/core';
import { AxiosService } from './axios.service';
import { Pizza, PizzaSizeEnum } from '../types/menu';
import { PizzaOrder } from '../store/reducers';


const routes = {
  getPizzas: 'pizza',
  getPizza: 'pizza'
}

@Injectable({
  providedIn: 'root'
})
export class PizzaService {

  constructor(
    private axiosService: AxiosService
  ) { }

  async fetchPizzas(page: number) {
    return this.axiosService.getReq<Array<Pizza>>(`${routes.getPizzas}?page=${page}`)
  }

  async fetchPizzaById(id: number) {
    return this.axiosService.getReq<Pizza>(routes.getPizza + '/' + id)
  }

  getPrice(pizza: PizzaOrder) : number{
    switch (pizza.pizzaSize) {
      case PizzaSizeEnum.BIG:
        return pizza.pizza.totalPriceForBig;
        break;
      case PizzaSizeEnum.MEDIUM:
        return pizza.pizza.totalPriceForMedium;
        break;
      case PizzaSizeEnum.SMALL:
        return pizza.pizza.totalPriceForSmall;
        break;
      default:
        return pizza.pizza.totalPriceForMedium;
      break;
    }
  }

  getTotalPrice (pizza: PizzaOrder) : number{
    return this.getPrice(pizza) * pizza.quantity;
  }

  getTotalPriceOfWholeOrder (pizzas: PizzaOrder[]) : number{
    let totalPrice = 0;
    for (const pizza of pizzas) {
      totalPrice += this.getTotalPrice(pizza);
    }
    return totalPrice
  }

  getPizzaSize (pizza: PizzaOrder): string {
    if (pizza.pizzaSize == 0) return 'mała'
    if (pizza.pizzaSize == 1) return 'średnia'
    else return 'duza'
  }

}
