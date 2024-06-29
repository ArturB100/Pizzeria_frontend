import { Component, OnInit } from '@angular/core';
import { PizzaService } from '../services/pizza.service';
import { Pizza } from '../types/menu';
import { CommonModule } from '@angular/common';
import { PizzaListItemComponent } from '../pizza-list-item/pizza-list-item.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    CommonModule,
    PizzaListItemComponent
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit{
  
  private page: number = 0;
  protected pizzas: Array<Pizza> = []

  constructor(
    private menuSerive: PizzaService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.fetchPizzas();
  }


  fetchPizzas () {
    this.menuSerive.fetchPizzas(this.page)
      .then(pizzas => {
        this.pizzas = pizzas;
      })
  }

  navigateToPizzaDetails (id: number) {
    this.router.navigate([`/pizzaDetails/${id}`]);
  }

}
