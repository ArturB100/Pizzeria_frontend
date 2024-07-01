import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PizzaService } from '../services/pizza.service';
import { Store } from '@ngrx/store';
import { Order, PizzaOrder } from '../store/reducers';
import { Observable } from 'rxjs';
import { selectPizzas } from '../store/selectors';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { OrderService } from '../services/order.service';
import { OrderDetails, OrderReq } from '../types/order';
import { ToastrService } from 'ngx-toastr';
import { UserData } from '../types/user';
import { deleteAllPizzas } from '../store/action';

@Component({
  selector: 'app-make-order',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './make-order.component.html',
  styleUrl: './make-order.component.scss'
})
export class MakeOrderComponent implements OnInit {
  
  protected pizzas$: Observable<Array<PizzaOrder>>
  protected orderReq: OrderReq = {addressId: 0, details: []};
  protected userData: UserData | undefined;

  constructor (
    protected pizzaService: PizzaService,
    private store: Store<{order: Order}>,
    private userService: UserService,
    private router: Router,
    private orderService: OrderService,
    private toastr: ToastrService
  ) {
    this.pizzas$ = this.store.select(selectPizzas)
    this.pizzas$.subscribe(pizzas => {
      const orderDetailsArr: OrderDetails[] = []
      for (const pizza of pizzas) {
        const orderDetails: OrderDetails = {
          pizzaId: pizza.pizza.id,
          quantity: pizza.quantity,
          size: pizza.pizzaSize
        } ;       
        orderDetailsArr.push(orderDetails);
      }
      this.orderReq.details = orderDetailsArr;
    })
    
  }

  ngOnInit(): void {
    this.userService.getUserData()
      .then (data => {
        this.userData = data;
        if (!data.address) {
          this.router.navigate(['/userData']);
        }
        this.orderReq.addressId = data.address.id
      })
  }

  onSubmit () {
    this.orderService.sendAddOrderReq(this.orderReq)
      .then (data => {
        if (data.success) {
          this.toastr.success("Zamówienie zostało złożone");
          this.store.dispatch(deleteAllPizzas())
          this.router.navigate(['/ordersHistory'])
        } else {
          this.toastr.error("Coś poszło nie tak")
        }
      })
  }



  

}
