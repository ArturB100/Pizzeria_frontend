import { Routes } from '@angular/router';
import { HomeComponentComponent } from './home-component/home-component.component';
import { LoginComponent } from './login/login.component';
import { UserDataComponent } from './user-data/user-data.component';


export const routes: Routes = [
    {path: '', component: HomeComponentComponent},
    {path: "login", component: LoginComponent},
    {path: "userData", component: UserDataComponent},
];
