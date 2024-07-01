import {Ingredient} from "./order";

export interface AddPizzaRequest {
  name: string;
  ingredients: Ingredient[];
}
