import {Component, OnInit} from '@angular/core';
import {OrderService, PizzaOrder} from "../../../target";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-all-orders',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
  ],
  templateUrl: './all-orders.component.html',
  styleUrl: './all-orders.component.scss'
})
export class AllOrdersComponent implements OnInit {
  orders: PizzaOrder[] = [];

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.orderService.orderGet().subscribe(
      (orders) => {
        this.orders = orders;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  updateOrderStatus(order: PizzaOrder): void {
    this.orderService.orderOrderIdPut(order.id, order.status).subscribe(
      () => {
        console.log('Order status updated successfully');
      },
      (error) => {
        console.error('Error updating order status', error);
      }
    );
  }
}
