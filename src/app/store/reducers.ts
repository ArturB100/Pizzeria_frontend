import { createReducer, on } from '@ngrx/store';
import { addPizza, addQuantity, deleteAllPizzas, deletePizza, logIn, logOut, subQuantity } from './action';
import { Pizza, PizzaSizeEnum } from '../types/menu';


// User
export interface User  {
    name: string,
    loggedIn: boolean,
    userRole: number
}

const initialState : User = {
    name: '',
    loggedIn: false,
    userRole: 0
}

export const _userReducer = createReducer(
    initialState,
    on(logIn, (state, {name, userRole}) => ({...state, name: name, loggedIn: true, userRole: userRole})),
    on(logOut, (state) => ({name: '', loggedIn: false, userRole: 0}))
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
        let isPizzaAlreadyInOrder = false;
        state.pizzas.forEach(p => {
            if (p.pizza.id == pizza.id)
                isPizzaAlreadyInOrder = true;
        })
        if (isPizzaAlreadyInOrder) {
            const newPizzas = state.pizzas.map(p => p.pizza.id == pizza.id ? {pizza: p.pizza, pizzaSize: p.pizzaSize, quantity: p.quantity + quantity} : p)
            return {...state, pizzas: newPizzas};
        }

        const oldPizzas = [...state.pizzas];
        const pizzaToAdd = {pizza: pizza, quantity: quantity, pizzaSize: pizzaSize};
        oldPizzas.push(pizzaToAdd);
        return {...state, pizzas: oldPizzas};
    }),
    on(deletePizza, (state, {id}) => ({...state, pizzas: state.pizzas.filter(p => p.pizza.id !== id)})),
    on(deleteAllPizzas, (state) => ({pizzas: []})),
    on(subQuantity, (state, {id}) => {
        const newPizzas = state.pizzas.map(p => p);        
        for (let i=0 ; i<newPizzas.length; i++) {
            if (newPizzas[i].pizza.id == id) {
                newPizzas[i] = {pizza: newPizzas[i].pizza, pizzaSize: newPizzas[i].pizzaSize, quantity: newPizzas[i].quantity - 1}
                if (newPizzas[i].quantity <= 0) {
                    newPizzas.splice(i, 1);
                    i -= 1;
                }
            }
        }
        return {...state, pizzas: newPizzas};
    }),
    on(addQuantity, (state, {id}) => {
        const newPizzas = state.pizzas.map(p => p);        
        for (let i=0 ; i<newPizzas.length; i++) {
            if (newPizzas[i].pizza.id == id) {
                newPizzas[i] = {pizza: newPizzas[i].pizza, pizzaSize: newPizzas[i].pizzaSize, quantity: newPizzas[i].quantity + 1}
            }
        }
        return {...state, pizzas: newPizzas};
    })
    

)

export function orderReducer(state: any, action: any) {
    return _orderReducer(state, action);
}