import { createAction, props } from '@ngrx/store';


export const logIn = createAction('[login component] logIn', props<{name: string}>());
export const logOut = createAction('[login component] logOut');