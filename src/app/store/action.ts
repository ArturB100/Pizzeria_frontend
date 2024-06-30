import { createAction, props } from '@ngrx/store';
import { Pizza, PizzaSizeEnum } from '../types/menu';


export const logIn = createAction('[login component] logIn', props<{name: string}>());
export const logOut = createAction('[login component] logOut');



export const addPizza = createAction('[menu component] addItem', props<{pizza: Pizza, quantity: number, pizzaSize: PizzaSizeEnum}>());
export const deletePizza = createAction('[menu component] deleteItem', props<{id: number}>());
export const deleteAllPizzas = createAction('[menu component] deleteAllItems');