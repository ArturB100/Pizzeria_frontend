import {Component, OnInit} from '@angular/core';
import {FormsModule, NgForm} from '@angular/forms';
import {AddPizzaRequest, PizzaService, IngredientService, Ingredient} from "../../../target";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-pizza',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './add-pizza.component.html',
  styleUrl: './add-pizza.component.scss'
})
export class AddPizzaComponent implements OnInit {
  ingredients: Ingredient[] = [];

  constructor(private pizzaService: PizzaService, private ingredientService: IngredientService) { }

  ngOnInit(): void {
    this.ingredientService.ingredientGet().subscribe(
      (ingredients) => {
        this.ingredients = ingredients;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newPizza: AddPizzaRequest = {
      name: value.name,
      ingredients: value.ingredients
    };

    this.pizzaService.pizzaPost(newPizza).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
