import { Component, OnInit, Renderer2 } from '@angular/core';
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
export class NavbarComponent implements OnInit{
  username$: Observable<string>;
  isLoggedIn$: Observable<boolean>

  private isBackgroundVisible = JSON.parse(localStorage.getItem('background') || 'true');

  constructor (
    private store: Store<{user: User}>,
    private userService: UserService,
    private router: Router,
    private renderer: Renderer2
  ) {
    this.username$ = this.store.select(selectUserName);
    this.isLoggedIn$ = this.store.select(selectIsLoggedIn);
  }
  ngOnInit(): void {
    this.setBackground();
  }

  logOut () {
    this.userService.logOut();
    this.router.navigate(['/'])
  }

  toggleBackgroundImageVisibility () {
    this.isBackgroundVisible = !this.isBackgroundVisible;
    localStorage.setItem('background', JSON.stringify(this.isBackgroundVisible));
    this.setBackground();

  }

  setBackground () {
    if (!this.isBackgroundVisible) {
      this.renderer.setStyle(document.body, 'background-image', 'none');
    } else {
      this.renderer.setStyle(document.body, 'background-image', "url('/background2.jpg')");
    }
  }




}
