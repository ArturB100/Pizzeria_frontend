import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState } from "./AppState";
import { Order, User } from "./reducers";

export const selectUser = createFeatureSelector<User>('user');

export const selectUserName = createSelector(
  selectUser,
  (user: User) => user.name
);


export const selectIsLoggedIn = createSelector(
  selectUser,
  (user: User) => user.loggedIn
)


export const selectOrder = createFeatureSelector<Order>('order');
export const selectPizzas = createSelector(
  selectOrder,
  (order: Order) => order.pizzas
)