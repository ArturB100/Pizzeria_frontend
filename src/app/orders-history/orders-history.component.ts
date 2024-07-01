import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { AllOrdersOfUser } from '../types/order';

@Component({
  selector: 'app-orders-history',
  standalone: true,
  imports: [
    CommonModule,
    
  ],
  templateUrl: './orders-history.component.html',
  styleUrl: './orders-history.component.scss'
})
export class OrdersHistoryComponent implements OnInit{

  protected allOrders: AllOrdersOfUser | undefined;

  constructor(
    protected orderService: OrderService
  ){}

  ngOnInit(): void {   
    this.orderService.getOrdersOfUser()
      .then(data => {
        if (data) {
          this.allOrders = data;          
        }
      })
  }



}
