import { createAction, props } from '@ngrx/store';
import { Pizza, PizzaSizeEnum } from '../types/menu';


export const logIn = createAction('[login component] logIn', props<{name: string, userRole: number}>());
export const logOut = createAction('[login component] logOut');



export const addPizza = createAction('[menu component] addItem', props<{pizza: Pizza, quantity: number, pizzaSize: PizzaSizeEnum}>());
export const deletePizza = createAction('[menu component] deleteItem', props<{id: number, pizzaSize: PizzaSizeEnum}>());
export const deleteAllPizzas = createAction('[menu component] deleteAllItems');
export const subQuantity = createAction('[order component] subOne', props<{id: number, pizzaSize: PizzaSizeEnum}>());
export const addQuantity = createAction('[order component] addOne', props<{id: number, pizzaSize: PizzaSizeEnum}>());