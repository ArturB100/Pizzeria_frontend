import {Component, OnInit} from '@angular/core';
import {FormsModule, NgForm} from '@angular/forms';
import { IngredientService, Ingredient} from "../../../target";
import { CommonModule } from '@angular/common';
import {PizzaService} from "../services/pizza.service";
import {AddPizzaRequest} from "../types/requests";

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
  image!: File;


  constructor(private pizzaService: PizzaService, private ingredientService: IngredientService) { }

  onImageSelected(event: any): void {
    this.image = event.target.files[0];
  }
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

    this.pizzaService.addPizza(newPizza).then(
      (response) => {
        console.log(response);
        const pizzaId = response;

        this.pizzaService.assignImageToPizza(pizzaId, this.image).then(
          (response) => {
            console.log(response);
          },
          (error) => {
            console.error(error);
          }
        );
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
