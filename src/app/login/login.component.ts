import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { User } from '../store/reducers';
import { logIn } from '../store/action';
import { selectUserName } from '../store/selectors';
import { CommonModule } from '@angular/common'; 
import { UserLoginPayload } from '../types/user';
import { FormsModule } from '@angular/forms'; 
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{

  username$ : Observable<string>;
  formData : UserLoginPayload = {email: '', password: ''}

  constructor (
    private store: Store<{user: User}>,
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.username$ = this.store.select(selectUserName);    
  }

  ngOnInit(): void {
   
  }

  onSubmit () {    
    this.userService.sendLogInRequest(
      {email: this.formData.email, password: this.formData.password}
    ).then(success => {
      if (success) {
        this.router.navigate(['/'])
      } else {
        this.toastr.error("Błędne dane logowania")
      }
    })
  } 


}
