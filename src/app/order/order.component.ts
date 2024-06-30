import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Order, PizzaOrder } from '../store/reducers';
import { selectPizzas } from '../store/selectors';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { PizzaListItemComponent } from '../pizza-list-item/pizza-list-item.component';
import { deleteAllPizzas } from '../store/action';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [
    CommonModule,
    PizzaListItemComponent
  ],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})
export class OrderComponent {

  protected pizzas$: Observable<Array<PizzaOrder>>

  constructor(
    private store: Store<{order: Order}>
  ){
    this.pizzas$ = this.store.select(selectPizzas)
  }

  
  clearAllItemsFromOrder () {
    this.store.dispatch(deleteAllPizzas())
  }



}
