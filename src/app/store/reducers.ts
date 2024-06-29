import { createReducer, on } from '@ngrx/store';
import { logIn, logOut } from './action';

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