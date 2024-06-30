import { createReducer, on } from '@ngrx/store';
import { addPizza, deleteAllPizzas, deletePizza, logIn, logOut } from './action';
import { Pizza, PizzaSizeEnum } from '../types/menu';


// User
export interface User  {
    name: string,
    loggedIn: boolean
}

const initialState : User = {
    name: '',
    loggedIn: false
}

export const _userReducer = createReducer(
    initialState,
    on(logIn, (state, {name}) => ({...state, name: name, loggedIn: true})),
    on(logOut, (state) => ({name: '', loggedIn: false}))
)

export function userReducer(state: any, action: any) {
    return _userReducer(state, action);
}


// order


export interface Order  {
    pizzas: PizzaOrder[]
}

export interface PizzaOrder {
    pizza: Pizza
    quantity: number
    pizzaSize: PizzaSizeEnum
}


const initialOrder : Order = {
    pizzas: []
}

export const _orderReducer = createReducer(
    initialOrder,
    on(addPizza, (state, {pizza, quantity, pizzaSize}) => {
        const oldPizzas = [...state.pizzas];
        const pizzaToAdd = {pizza: pizza, quantity: quantity, pizzaSize: pizzaSize};
        oldPizzas.push(pizzaToAdd);
        return {...state, pizzas: oldPizzas};
    }),
    on(deletePizza, (state, {id}) => ({...state, pizzas: state.pizzas.filter(p => p.pizza.id !== id)})),
    on(deleteAllPizzas, (state) => ({pizzas: []}))

)

export function orderReducer(state: any, action: any) {
    return _orderReducer(state, action);
}