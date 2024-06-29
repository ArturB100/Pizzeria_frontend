import { Injectable } from '@angular/core';
import { AxiosService } from './axios.service';
import { Pizza } from '../types/menu';


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

  async fetchPizzas (page: number) {
    return this.axiosService.getReq<Array<Pizza>>(`${routes.getPizzas}?page=${page}`)
  }

  async fetchPizzaById (id: number) {
    return this.axiosService.getReq<Pizza>(routes.getPizza + '/' + id)
  }

}
