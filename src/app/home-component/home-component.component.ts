import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { User } from '../store/reducers';
import { selectUserName } from '../store/selectors';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home-component',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home-component.component.html',
  styleUrl: './home-component.component.scss'
})
export class HomeComponentComponent {

  username$: Observable<string>;

  constructor (
    private store: Store<{user: User}>
  ) {
    this.username$ = this.store.select(selectUserName);
  }
  
}
