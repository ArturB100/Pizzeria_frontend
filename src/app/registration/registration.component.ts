import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent implements OnInit{

  

  constructor (
    private userService: UserService
  ) {

  }
  ngOnInit(): void {
    this.userService.getUserName().subscribe(name => {
      
    })
  }




}
