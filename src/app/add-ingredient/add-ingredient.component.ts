import {Component, OnInit} from '@angular/core';
import {AddIngredientRequest, IngredientService} from "../../../target";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {FormsModule, NgForm} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-ingredient',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule
  ],
  templateUrl: './add-ingredient.component.html',
  styleUrl: './add-ingredient.component.scss'
})
export class AddIngredientComponent implements OnInit {
  ingredientForm!: FormGroup;

  constructor(private ingredientService: IngredientService) { }

  ngOnInit(): void {
    this.ingredientForm = new FormGroup({
      'name': new FormControl(null),
      'priceForSmall': new FormControl(null),
      'priceForMedium': new FormControl(null),
      'priceForBig': new FormControl(null)
    });
  }

  onSubmit() {
    const newIngredient: AddIngredientRequest = this.ingredientForm.value;
    this.ingredientService.ingredientPost(newIngredient).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
