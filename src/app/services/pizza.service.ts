import { Injectable } from '@angular/core';
import { AxiosService } from './axios.service';
import { Pizza, PizzaSizeEnum } from '../types/menu';
import { PizzaOrder } from '../store/reducers';
import {Observable} from "rxjs";
import {AddPizzaRequest} from "../types/requests";
import {HttpClient, HttpHeaders} from "@angular/common/http";


const routes = {
  getPizzas: 'pizza',
  getPizza: 'pizza',
  addPizza: 'pizza'
}

@Injectable({
  providedIn: 'root'
})
export class PizzaService {

  constructor(
    private http: HttpClient,
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

  addPizza(request: AddPizzaRequest): Promise<any> {
    return this.axiosService.postReq<Pizza>(routes.addPizza, request)
  }

  assignImageToPizza(pizzaId: number, image: File | null): Promise<any> {
    const formData = new FormData();

    if (image) {
      formData.append('image', image);
    }

    return this.http.post<any>(`http://localhost:25585/pizza/assign-image-to-pizza/` + pizzaId, formData).toPromise();
  }
}
