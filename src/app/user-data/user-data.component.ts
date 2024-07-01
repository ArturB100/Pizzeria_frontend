import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Address, NewAddressDto, UpdateUserDataDto, UserData } from '../types/user';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomInputComponent } from '../custom-input/custom-input.component';
import { ToastrService } from 'ngx-toastr';
import { User } from '../store/reducers';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectIsLoggedIn } from '../store/selectors';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-data',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CustomInputComponent
  ],
  templateUrl: './user-data.component.html',
  styleUrl: './user-data.component.scss'
})
export class UserDataComponent implements OnInit{

  public userData : UserData | null = null;
  isLoggedIn$: Observable<boolean>

  constructor (
    private userService : UserService,
    private toastr: ToastrService,
    private store: Store<{user: User}>,
    private router: Router
  ) {
    this.isLoggedIn$ = this.store.select(selectIsLoggedIn);
    this.isLoggedIn$.subscribe(isLoggedIn => {
      if (!isLoggedIn) {
        toastr.info("Musisz się zalogować");
        this.router.navigate(['/login'])
      }
    })
  } 


  async getUserData () {
    this.userData = await this.userService.getUserData();
  }

  ngOnInit(): void {
    this.getUserData();
  }

  onUserDataFormSubmit () {
    if (!this.userData) {      
      this.toastr.error("Coś poszło nie tak");
      return;
    }
    const dto: UpdateUserDataDto = {
      firstName: this.userData!.firstName,
      lastName: this.userData!.lastName,
      phone: this.userData!.phone
    }
    this.userService.updateUserData(dto)
      .then(data => {
        if (data.success) {
          this.toastr.success("Zauktualizowano");
        }
      })
  }

  onAddressFormSubmit () {
    if (!this.userData) {      
      this.toastr.error("Coś poszło nie tak");
      return;
    }
    const address: NewAddressDto = this.userData?.address || {city: '', firstLine:'', secondLine: '', zipcode: ''};
    this.userService.updateUserAddress(address)
      .then (data => {
        if (data) {
          this.toastr.success("Zauktualizowano");
        } else this.toastr.error("Coś poszło nie tak");
      })
  }

  



}
