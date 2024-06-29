import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../store/reducers';
import { Store } from '@ngrx/store';
import { selectIsLoggedIn, selectUserName } from '../store/selectors';
import { CommonModule } from '@angular/common';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  username$: Observable<string>;
  isLoggedIn$: Observable<boolean>



  constructor (
    private store: Store<{user: User}>,
    private userService: UserService,
    private router: Router
  ) {
    this.username$ = this.store.select(selectUserName);
    this.isLoggedIn$ = this.store.select(selectIsLoggedIn);
  }

  logOut () {
    this.userService.logOut();
    this.router.navigate(['/'])
  }




}
