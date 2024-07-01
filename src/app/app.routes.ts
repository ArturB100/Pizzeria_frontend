import { Routes } from '@angular/router';
import { HomeComponentComponent } from './home-component/home-component.component';
import { LoginComponent } from './login/login.component';
import { UserDataComponent } from './user-data/user-data.component';
import { RegistrationComponent } from './registration/registration.component';
import { MenuComponent } from './menu/menu.component';
import { PizzaDetailsComponent } from './pizza-details/pizza-details.component';
import { OrderComponent } from './order/order.component';
import { AddPizzaComponent } from './add-pizza/add-pizza.component';

export const routes: Routes = [
    {path: '', component: HomeComponentComponent},
    {path: "login", component: LoginComponent},
    {path: "userData", component: UserDataComponent},
    {path: "registration", component: RegistrationComponent},
    {path: "menu", component: MenuComponent},
    {path: "pizzaDetails/:id", component: PizzaDetailsComponent},
    {path: "order", component: OrderComponent},
    {path: "add-pizza", component: AddPizzaComponent}
];
