import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Order, PizzaOrder } from '../store/reducers';
import { selectPizzas } from '../store/selectors';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { PizzaListItemComponent } from '../pizza-list-item/pizza-list-item.component';
import { addQuantity, deleteAllPizzas, deletePizza, subQuantity } from '../store/action';
import { PizzaImgComponent } from '../pizza-img/pizza-img.component';
import { PizzaService } from '../services/pizza.service';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [
    CommonModule,
    PizzaListItemComponent,
    PizzaImgComponent,
    RouterModule
  ],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})
export class OrderComponent implements OnInit{

  protected pizzas$: Observable<Array<PizzaOrder>>
  protected doesUserHasAddress: boolean = false;
  private pizzaItemsCount: number = 0;


  constructor(
    private store: Store<{order: Order}>,
    protected pizzaService: PizzaService,
    private userService: UserService
  ){
    this.pizzas$ = this.store.select(selectPizzas)
    this.pizzas$.subscribe(pizzas => {
      this.pizzaItemsCount = pizzas.length;
    })
  }

  ngOnInit(): void {
    this.userService.getUserData()
      .then (data => {
        if (data.address) {
          this.doesUserHasAddress = true;
        }
      })
  }

  
  clearAllItemsFromOrder () {
    this.store.dispatch(deleteAllPizzas())
  }

  subQuantity (pizza: PizzaOrder) {
    this.store.dispatch(subQuantity({id: pizza.pizza.id, pizzaSize: pizza.pizzaSize}))
  }

  addQuantity (pizza: PizzaOrder) {
    this.store.dispatch(addQuantity({id: pizza.pizza.id,  pizzaSize: pizza.pizzaSize}))
  }

  deletePizza (pizza: PizzaOrder) {
    this.store.dispatch(deletePizza({id:  pizza.pizza.id,  pizzaSize: pizza.pizzaSize}))
  }

  checkIfCanBeOrdered () : boolean {
    return this.doesUserHasAddress && this.pizzaItemsCount > 0;
  }



}
