import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Address, NewAddressDto, UpdateUserDataDto, UserData } from '../types/user';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomInputComponent } from '../custom-input/custom-input.component';
import { ToastrService } from 'ngx-toastr';

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

  constructor (
    private userService : UserService,
    private toastr: ToastrService
  ) {

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
        }
      })
  }

  



}
