import { Order, User } from "./reducers";

export interface AppState {
    user: User;
    order: Order;
}