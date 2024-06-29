import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { UserData } from '../types/user';

@Component({
  selector: 'app-user-data',
  standalone: true,
  imports: [],
  templateUrl: './user-data.component.html',
  styleUrl: './user-data.component.scss'
})
export class UserDataComponent implements OnInit{

  public userData : UserData | null = null;

  constructor (private userService : UserService) {

  }


  async getUserData () {
    this.userData = await this.userService.getUserData();
  }

  ngOnInit(): void {
    this.getUserData();
  }



}
