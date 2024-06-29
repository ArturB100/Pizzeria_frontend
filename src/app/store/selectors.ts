import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState } from "./AppState";
import { User } from "./reducers";

export const selectUser = createFeatureSelector<AppState, User>('user');

export const selectUserName = createSelector(
  selectUser,
  (user: User) => user.name
);


export const selectIsLoggedIn = createSelector(
  selectUser,
  (user: User) => user.loggedIn
)