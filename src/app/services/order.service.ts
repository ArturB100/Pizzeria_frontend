import { Injectable } from '@angular/core';
import { AllOrdersOfUser, OrderReq } from '../types/order';
import { AxiosService } from './axios.service';
import { OperationResults } from '../types/common';


const routes = {
  addOrder: '/order',
  getOrders: '/order/user'
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private axiousService: AxiosService
  ) { }


  async sendAddOrderReq (orderReq: OrderReq) {
    return this.axiousService.postReq<OperationResults>(routes.addOrder, orderReq);
  }

  async getOrdersOfUser () {
    return this.axiousService.getReq<AllOrdersOfUser>(routes.getOrders);
  }

  getStatus (enumValue: number) :string {
    switch (enumValue) {
      case 0:
        return 'w przygotowaniu';
        break;
      case 1: 
        return 'w dowozie';
        break;
      case 2:
        return 'dostarczone';
        break;
      default:
        return ''
        break;
    }
  }


}
