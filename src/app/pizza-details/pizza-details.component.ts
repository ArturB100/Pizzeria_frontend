import { Component, Input, OnInit } from '@angular/core';
import { Pizza } from '../types/menu';
import { PizzaService } from '../services/pizza.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-pizza-details',
  standalone: true,
  imports: [],
  templateUrl: './pizza-details.component.html',
  styleUrl: './pizza-details.component.scss'
})
export class PizzaDetailsComponent implements OnInit{
  public pizza: Pizza | null = null;

  constructor(
    private pizzaService: PizzaService,
    private route: ActivatedRoute,
    private toastr: ToastrService
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

}
