import { Component, OnInit } from '@angular/core';
import { PizzaService } from '../services/pizza.service';
import { Pizza } from '../types/menu';
import { CommonModule } from '@angular/common';
import { PizzaListItemComponent } from '../pizza-list-item/pizza-list-item.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    CommonModule,
    PizzaListItemComponent,
    RouterModule
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit{
  
  protected page: number = 0;
  protected pizzas: Array<Pizza> = []

  constructor(
    private menuSerive: PizzaService,
    private router: Router,
    private route: ActivatedRoute    
  ){}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.page = params['page'] | 0;
      this.fetchPizzas();
    })
    //this.fetchPizzas();
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

  increasePage () {
    //this.page += 1;
    //this.router.navigate(['/menu?page=' + this.page + 1])
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: this.page + 1 },
      queryParamsHandling: 'merge' // preserve other existing query params
    });
  }

  decreasePage () {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: this.page - 1 },
      queryParamsHandling: 'merge' // preserve other existing query params
    });
  }

  resetPage () {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: 0 },
      queryParamsHandling: 'merge' // preserve other existing query params
    });
  }

}
