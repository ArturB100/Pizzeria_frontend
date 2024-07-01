import { Component, Input, OnInit } from '@angular/core';
import { Pizza, PizzaSizeEnum } from '../types/menu';
import { PizzaService } from '../services/pizza.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Store } from '@ngrx/store';
import { Order } from '../store/reducers';
import { addPizza } from '../store/action';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PizzaImgComponent } from '../pizza-img/pizza-img.component';

@Component({
  selector: 'app-pizza-details',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    PizzaImgComponent
  ],
  templateUrl: './pizza-details.component.html',
  styleUrl: './pizza-details.component.scss'
})
export class PizzaDetailsComponent implements OnInit{
  public pizza: Pizza | null = null;
  protected quantity: number = 0;
  protected pizzaSize: PizzaSizeEnum = PizzaSizeEnum.MEDIUM;

  constructor(
    private pizzaService: PizzaService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private store: Store<{order: Order}>
  ){}

  
  ngOnInit(): void {
    let pizzaId;
    this.route.paramMap.subscribe(params => {
      pizzaId = params.get('id');
    });
    if (pizzaId === undefined) {
      this.toastr.error("Coś poszło nie tak");
      return
    };

    this.fetchPizzaDetails(pizzaId);
  }

  fetchPizzaDetails(id: number) {
    this.pizzaService.fetchPizzaById(id)
      .then (data => this.pizza = data);
  }

  addPizzaToOrder () {
    if (this.pizza === null || this.quantity === 0) return;    
    this.store.dispatch(addPizza({pizza: this.pizza, quantity: this.quantity, pizzaSize: this.pizzaSize}));
    this.toastr.success("Dodano do zamówienia !!");
  }

}
