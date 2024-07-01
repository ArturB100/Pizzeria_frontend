import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { RegisterReqBody } from '../types/user';
import { CommonModule } from '@angular/common';
import { CustomInputComponent } from '../custom-input/custom-input.component';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [
    CommonModule,
    CustomInputComponent,
    FormsModule
  ],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent{

  public formBody: RegisterReqBody = {email: '', firstName: '', lastName: '', password: '', passwordConfirm: '', phone: ''}
  public formErrors = {email: '', firstName: '', lastName: '', password: '', passwordConfirm: '', phone: ''}

  constructor (
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router

  ) {

  }

  onEmailChange (email: string) {
    this.formBody.email = email;
  }
  onFirstNameChange (firstName: string) {
    this.formBody.firstName = firstName;
  }
  onLastNameChange (lastName: string) {
    this.formBody.lastName = lastName;
  }
  onPhoneChange (phone: string) {
    this.formBody.phone = phone;
  }
  onPasswordChange (password: string) {
    this.formBody.password = password;
  }
  onPasswordConfirmChange (passwordConfirm: string) {
    this.formBody.passwordConfirm = passwordConfirm;
  }

  onSubmit () {
    this.userService.register(this.formBody)
    .then((data) => {      
      if (data.success) {
        this.toastr.success("Utworzono nowe konto")
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 1000);
      } else {
        const errors = data.errors
        for (const error of errors) {
          switch(error.fieldKey) {
            case 'Email': 
                this.formErrors.email = error.errorMsg;
              break;
            case 'Password': 
              this.formErrors.password = error.errorMsg;
              break;
            case 'PasswordConfirm':
              this.formErrors.passwordConfirm = error.errorMsg;
              break;
            case 'Phone':
              this.formErrors.phone = error.errorMsg;
              break;
          }
        }
      }
    })


      // .then(data => {
      //   console.log(data);        
      // })
  }
  




}
